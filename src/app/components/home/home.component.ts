import { Component, OnInit, OnDestroy } from '@angular/core';
import { Good } from 'src/app/interfaces/good.interface';
import { GoodsService } from 'src/app/services/goods.service';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  loadingSpinner = true;
  goods:Good[] = [];
  goodsSub:Subscription;
  add = '0';
  pageActual:number;

  constructor(
    private goodsService:GoodsService,
    private cartService:CartService,
    private authService:AuthService,
    private router:Router

    ) { }
  ngOnInit(): void {
    this.pageActual = +localStorage.getItem("pageActual") | 1;
    this.goodsSub = this.goodsService.getAllGoods().subscribe(data=> {
      this.goods = data.map(element=>{
        return {
          id: element.payload.doc.id,
          ...<object>element.payload.doc.data()
        }
      })
      this.loadingSpinner = false;
    });

  }

  ngOnDestroy(){
    this.goodsSub.unsubscribe();
    localStorage.clear()
  }

  addToCart(selectedId:string){
    if (this.authService.userId === '0'){
      this.router.navigate(['/login']);
    }
    else {
      this.add = selectedId;
    }
  }


  buy(amount: number){
    let indexProduct = this.goods.map(data =>{
      return data.id
    }).indexOf(this.add);
    let selectedProduct = this.goods[indexProduct];
    let product = {
      name: selectedProduct.name,
      amount: +amount,
      price: selectedProduct.price
    }

    this.cartService.addToCart(product).then(()=> {
      this.add = '0';
    })
  }

  onPageChange($event){
    this.pageActual = $event;
    localStorage.setItem('pageActual',$event)
    console.log($event)
  }

}
