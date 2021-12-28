import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Good } from '../interfaces/good.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private fs: AngularFirestore,
    private authService: AuthService
    ) { }

  addToCart(product:Good){
    return this.fs.collection(`users/${this.authService.userId}/cart`).add(product);
  }

  getCart(){
    return this.fs.collection(`users/${this.authService.userId}/cart`).snapshotChanges();
  }

  delete(id){
    return this.fs.doc(`users/${this.authService.userId}/cart/${id}`).delete();
  }

  save(id , amount){
    return this.fs.doc(`users/${this.authService.userId}/cart/${id}`).update({
      amount: amount
    })
  }
}
