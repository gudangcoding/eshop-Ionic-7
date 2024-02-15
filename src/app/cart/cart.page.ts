import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { Helper } from 'src/provider/Helper';
import { RestApi } from 'src/provider/RestApi';
// import { Browser } from '@capacitor/browser';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { ApiService } from '../services/ApiService';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  products: any[] = [];
  product: any = [];
  selectAll = false;
  ceklis = false;
  total: any = 0;
  qty: any = 0;
  checkedCount = 1;
  akandibayar: any[] = [];
  user: any;
  metode_bayar: any;
  constructor(
    private cartService: CartService,
    private router: Router,
    private util: Helper,
    private api: RestApi,
    private api2: ApiService
  ) {
    this.products = cartService.getCart('cart');
    this.total = cartService.getCart('total');
    this.total = cartService.getCart('qty');
    this.user = cartService.getCart('member');
    console.log('Total atas : ', this.user);
  }

  ionViewDidEnter() {
    this.products = this.cartService.getCart('cart');
    this.total = this.cartService.getCart('total');
    this.total = this.cartService.getCart('qty');
    this.user = this.cartService.getCart('member');
  }
  ngOnInit() {
    this.products = this.cartService.getCart('cart');
    this.total = this.cartService.getCart('total');
    this.qty = this.cartService.getCart('qty');
  }

  updateTotal() {
    localStorage.getItem('cart');
    localStorage.getItem('total');
  }

  incrementProduct(product: any) {
    this.cartService.tambahi('cart', product);
    this.calculate();
  }

  decrementProduct(product: any) {
    this.cartService.kurangi('cart', product);
    this.calculate();
  }

  loadTotal() {
    this.products = this.cartService.getCart('cart');
    this.total = this.cartService.getCart('total');
    this.qty = this.cartService.getCart('qty');
  }

  calculate() {
    if (this.products) {
      this.checkedCount = this.products.filter((item) => item.checked).length;
      // Hapus berdasarkan produk yang di ceklis
      for (let i = 0; i <= this.checkedCount + 1; i++) {
        this.loadTotal();
        // this.products.splice(i, 1);
        this.total = this.products.reduce((sum: any, product: any) => {
          return sum + (product.checked ? product.price * product.quantity : 0);
        }, 0);
        this.qty = this.products.reduce((sum: any, product: any) => {
          return sum + (product.checked ? product.quantity : 0);
        }, 0);
        localStorage.setItem('total', JSON.stringify(this.total));
        localStorage.setItem('qty', JSON.stringify(this.qty));
      }
    }
  }

  checkAll() {
    this.products.forEach((item: any) => (item.checked = this.selectAll));
    this.cartService
      .getCart('cart')
      .forEach((product) => (product.checked = this.selectAll));

    this.total = this.products.reduce((sum: any, product: any) => {
      return sum + (product.checked ? product.price * product.quantity : 0);
    }, 0);

    this.qty = this.products.reduce((sum: any, product: any) => {
      return sum + (product.checked ? product.quantity : 0);
    }, 0);
    console.log('total bawah : ', this.total);

    localStorage.setItem('total', this.total);
    localStorage.setItem('qty', this.qty);
  }

  centangsatuan(productId: number): void {
    const cartData = JSON.parse(localStorage.getItem('cart') ?? '{}');
    const ketemu = cartData.findIndex((item: any) => item.id === productId);

    console.log(ketemu);
    if (ketemu) {
      for (let index = 0; index < cartData[productId].checked; index++) {
        this.total += cartData[index].price * cartData[index].quantity;
        this.qty += cartData[index].quantity;
      }
      console.log('Hasil Tes ', cartData[productId].name);
      localStorage.setItem('cart', JSON.stringify(cartData));
      localStorage.setItem('total', JSON.stringify(this.total));
      localStorage.setItem('qty', JSON.stringify(this.qty));
    }
    // console.log(this.total);
    // const checkbox = document.getElementById('yourCheckboxId');
  }

  delAll() {
    if (this.products) {
      const jumlahdiceklis = this.products.filter(
        (item) => item.checked
      ).length;
      console.log(jumlahdiceklis);
      // Hapus berdasarkan produk yang di ceklis
      for (let i = jumlahdiceklis - 1; i >= 0; i--) {
        this.products.splice(i, 1);
        this.total = this.products.reduce(
          (sum, product) => sum + product.price * product.quantity,
          0
        );
        this.qty = this.products.reduce(
          (sum, product) => sum + product.quantity,
          0
        );
      }
      // Update Storage
      localStorage.setItem('cart', JSON.stringify(this.products));
      localStorage.setItem('total', JSON.stringify(this.total));
    }
  }

  diceklis() {
    if (this.products) {
      this.checkedCount = this.products.filter((item) => item.checked).length;

      // Hapus berdasarkan produk yang di ceklis
      for (let i = 0; i <= this.checkedCount + 1; i++) {
        // this.products.splice(i, 1);
        this.total = this.products.reduce((sum: any, product: any) => {
          return sum + (product.checked ? product.price * product.quantity : 0);
        }, 0);
        this.qty = this.products.reduce((sum: any, product: any) => {
          return sum + (product.checked ? product.quantity : 0);
        }, 0);
        localStorage.setItem('total', JSON.stringify(this.total));
        localStorage.setItem('qty', JSON.stringify(this.qty));
      }
      console.log(
        'JUmlah Diceklis ' +
          this.checkedCount +
          ' Jumlah ' +
          this.qty +
          ' Totalnya ' +
          this.total
      );

      localStorage.setItem('cart', JSON.stringify(this.products));
    }
  }

  hapussatuan() {
    if (this.products) {
      const produkDiceklis = this.products.filter((item) => item.checked);
      // Menghitung total harga dan jumlah kuantitas dari produk yang dicentang
      this.total = produkDiceklis.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
      );
      this.qty = produkDiceklis.reduce(
        (sum, product) => sum + product.quantity,
        0
      );

      // Hapus produk yang dicentang dari this.products
      this.products = this.products.filter((item) => !item.checked);

      console.log('Ini Total : ', this.total);
    }
  }

  deleteItemById(itemId: number) {
    if (this.products) {
      // console.log(itemId);

      const storedItems = JSON.parse(localStorage.getItem('cart') ?? '{}');
      // Find the index of the item with the specified ID
      const index = storedItems.findIndex((item: any) => item.id === itemId);
      console.log(index);
      // Remove the item if found
      if (index !== -1) {
        storedItems.splice(index, 1);
        // update Local Storage
        localStorage.setItem('cart', JSON.stringify(storedItems));
      }
    }
  }

  async bayar(): Promise<any> {
    
    // const cartData = localStorage.getItem('cart');
    // if (!cartData) {
    //   console.error('Cart data not found in local storage');
    //   return;
    // }
    // this.products= JSON.parse(cartData);
    if (this.products) {
      this.akandibayar = this.products.filter(
        (product) => product.checked === true
      );

      // const dataToSend = {
      //   items: this.akandibayar,
      //   jumlah_harga: this.total,
      //   jumlah_barang: this.qty,
      //   user_id: this.user.id_member,
      // };

      // const response: HttpResponse = await CapacitorHttp.post(options);
      // const response = await this.api2.postWithToken('order/store', JSON.stringify(dataToSend), this.user.token); // Mengubah dataToSend menjadi string JSON
      // if (response.data.success == true) {
      //   this.delAll();
      //   this.util.dismissLoading();
      //   this.util.toastNotif('Berhasil Diorder, SIlahkan lakukan pembayaran');
      //   this.router.navigate(['/home/history'], { replaceUrl: true });
      // } else {
      //   this.util.toastNotif('Transaksi Gagal, server error');
      // }
      console.log('jumlah dipilih : ',this.akandibayar.length);
      if (this.akandibayar.length > 0) {
        
        
        this.util.showLoading();
        let body = {
          id_member: this.user.id_member,
          items: this.akandibayar,
          jumlah_harga: this.total,
          qty: this.qty,
          metode_bayar: this.metode_bayar,
        };
        this.api
          .postWithToken(body, 'order/store', this.user.token)
          .subscribe((res: any) => {
            this.util.dismissLoading();
            console.log(res);
            if (res.success == true) {
              this.delAll();
              // this.util.alertNotif('Berhasil Diorder, SIlahkan lakukan pembayaran');
              this.router.navigateByUrl('home/history');
              this.util.toastNotif('Order SUkses Dibuat');
              // Browser.open({ url: res.url});
            }
          });
        }else{
          this.util.toastNotif('Belum ada produk yang dipilih');
        }
      }
    
  }
}
