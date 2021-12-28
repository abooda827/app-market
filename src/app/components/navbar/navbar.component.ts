import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user:User;
  isOpen:boolean = false;
  isUser:boolean = false;
  isAdmin:boolean = false;
  constructor(
    private authService:AuthService,
    private router:Router,
    private userService:UserService,
    ) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user=>{
      if(user){
        this.isUser = true;
        /* localStorage.setItem('user' , JSON.stringify(user)) */
        this.authService.userId = user.uid;

        this.userService.getUserData().subscribe(userData=>{

          localStorage.setItem('userData' , JSON.stringify(userData));
          this.user = JSON.parse(localStorage.getItem('userData'));
          if(this.user.admin === '1'){
            this.isAdmin = true;
          }
          else{
            this.isAdmin = false;
          }
        })
      }
      else{
        this.isUser = false;
        this.authService.userId = '0';
        
      }
    })
  }

  toggleNavbar(){
    this.isOpen = !this.isOpen;
  }

  logout(){
    this.authService.logout().then( ()=> {
      this.router.navigate(['login'])
    })
  }
}
