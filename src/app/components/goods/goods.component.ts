import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm, Form } from '@angular/forms';
import { Good } from 'src/app/interfaces/good.interface';
import { GoodsService } from 'src/app/services/goods.service';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.css']
})
export class GoodsComponent implements OnInit {

  @ViewChild('image', {static:false}) image:ElementRef;

  constructor(private goodsService: GoodsService) { }

  ngOnInit(): void {
  }

  addNewGood(form: NgForm){
    let 
      name = (<Good>form.value).name,
      price = (<Good>form.value).price,
      image = (<HTMLInputElement>this.image.nativeElement).files[0];
    
    this.goodsService.addNewGood(name, price, image).then(msg=> console.log(msg));
  }

}
