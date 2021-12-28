import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage:string = '';

  constructor(
    private authSevice:AuthService,
    private router:Router,
  ) { }

  ngOnInit(): void {
  }

  login(form){
    let data:User = form.value;
    this.authSevice.login(data.email, data.password)
    .then(result=> {
      this.errorMessage = '';
      this.router.navigate(['/']);

    })
    .catch(error=> {
      this.errorMessage = error.message;
    });
  }

}
