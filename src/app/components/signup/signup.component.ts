import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  errorMessage:string = '';

  constructor(
    private authSevice:AuthService, 
    private userService:UserService,
    private router:Router,
  ) { }

  ngOnInit(): void {
  }

  signup(form){
    let data:User = form.value;
    this.authSevice.signup(data.email,data.password)
    .then(result=> {
      this.errorMessage = '';
      this.userService.addNewUser(result.user.uid, data.name, data.address).then(()=>{
        this.router.navigate(['/']);
      })
      .catch(err=>{
        console.log(err);
      })

    })
    .catch(error=> {
      this.errorMessage = error.message;
    });
  }

  

}
