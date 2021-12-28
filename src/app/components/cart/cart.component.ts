import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { shopping } from 'src/app/interfaces/shopping.interface';
import { AuthService } from 'src/app/services/auth.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  loadingSpinner = true;
  cart:shopping[] = [];
  userId:string
  constructor(
    private cartService: CartService,
    ) { }

  ngOnInit(): void {
    this.cartService.getCart().subscribe(cart=>{
      this.cart = cart.map(shopping=>{
        return{
          id: shopping.payload.doc.id,
          ...<object>shopping.payload.doc.data()
        }
      })
      this.loadingSpinner = false;
    })
  }

  onDelete(index){
    this.cartService.delete(this.cart[index].id);
  }

  onSave(index){
    this.cartService.save(this.cart[index].id,this.cart[index].amount);
  }


}


