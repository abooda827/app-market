import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:User
  constructor(
  ) { 
    
   
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userData'))    
    
  }

}
