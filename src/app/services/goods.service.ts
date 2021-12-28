import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class GoodsService {

  constructor(
    private fs:AngularFirestore,
    private fStorage:AngularFireStorage,
    ) { }

  getAllGoods(){
    return this.fs.collection('goods').snapshotChanges();
  }

  addNewGood(name:string, price:number, image:File){
    return new Promise((resolve, reject)=>{
      let ref = this.fStorage.ref('goods/' + image.name);
      ref.put(image).then(()=>{
        ref.getDownloadURL().subscribe(imageUrl=>{
          this.fs.collection('goods').add({
            name,
            price,
            imageUrl
          }).then(()=> resolve('Product added'))
        })
      })
    })
  }
}
