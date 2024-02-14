import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  isikeranjang: any = [];
  products = [];
  product:any;
  quantity:any;
  cartItems: any[] = [];
  totalItems: number = 0;
  klik:any;

  cart: any[];
  constructor(
    private cartService: CartService, 
    private router: Router,
    ) {
    this.cart = this.cartService.getCart();
  }

  ngOnInit() {
  }

  // checkAll(check: boolean): void {
  //   let cart = this.cartService.getCart();
  //   cart.forEach(product => (product.checked = check));
  //   localStorage.setItem('cart', JSON.stringify(cart));
  // }

  checkAll() {
    this.isikeranjang.forEach((item:any) => (item.checked = !item.checked));
  }


  deleteAllItems() {
    
    if (this.cartService.getCart()) {
      const jumlahdiceklis = this.cartService.getCart().filter(item => item.checked).length;
      // Hapus berdasarkan produk yang di ceklis
      for (let i = jumlahdiceklis - 1; i >= 0; i--) {
        this.cartService.getCart().splice(i, 1);
      }
      // Update Storage
      localStorage.setItem('cartItems', JSON.stringify(this.cartService.getCart()));
    }
  }


  
}



// isikeranjang: any = [];
//   products = [];
//   product:any;
//   quantity:any;
//   cartItems: any[] = [];
//   totalItems: number = 0;
//   klik:any;

//   cart: any[];
//   constructor(
//     private cartService: CartService, 
//     private router: Router,
//     ) {
//     this.cart = this.cartService.getCart();
//     console.log(this.cart);
    
//   }

//   ngOnInit() {
//   }

//   // checkAll(check: boolean): void {
//   //   let cart = this.cartService.getCart();
//   //   cart.forEach(product => (product.checked = check));
//   //   localStorage.setItem('cart', JSON.stringify(cart));
//   // }

//   checkAll() {
//     this.isikeranjang.forEach((item:any) => (item.checked = !item.checked));
//   }


//   deleteAllItems() {
    
//     if (this.cartService.getCart()) {
//       const jumlahdiceklis = this.cartService.getCart().filter(item => item.checked).length;
//       // Hapus berdasarkan produk yang di ceklis
//       for (let i = jumlahdiceklis - 1; i >= 0; i--) {
//         this.cartService.getCart().splice(i, 1);
//       }
//       // Update Storage
//       localStorage.setItem('cartItems', JSON.stringify(this.cartService.getCart()));
//     }
//   }