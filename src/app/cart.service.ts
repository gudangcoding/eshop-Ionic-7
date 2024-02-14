import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartKey = 'cart';

  getCart(): any[] {
    const cartData = localStorage.getItem(this.cartKey);
    return cartData ? JSON.parse(cartData) : [];
  }

  addToCart(product: any): void {
    const cart = this.getCart();
    const existingProduct = cart.find(p => p.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      product.quantity = 1;
      cart.push(product);
    }

    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  removeFromCart(productId: number): void {
    let cart = this.getCart();
    cart = cart.filter(product => product.id !== productId);
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  clearCart(): void {
    localStorage.removeItem(this.cartKey);
  }

  increaseQuantity(product: any): void {
    product.quantity += 1;
    const cart = this.getCart();
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  decreaseQuantity(product: any): void {
    product.quantity = Math.max((product.quantity || 1) - 1, 0);
    const cart = this.getCart();
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }
}

