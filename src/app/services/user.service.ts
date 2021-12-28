import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private fs:AngularFirestore,
    private authService:AuthService
    ) { }

  addNewUser(id, name, address){
    return this.fs.doc('users/' + id).set({
      name: name,
      address: address,
      admin : '0'
    });
  }

  getUserData(){
    return this.fs.doc('users/' + this.authService.userId).valueChanges();
  }

  /* getUser(){
    return this.fs.doc('users/' + this.authService.userId).snapshotChanges();
  } */


}
