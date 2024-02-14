// import { CartService } from 'src/app/cart.service';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApi } from 'src/provider/RestApi';
import { CartService } from '../services/cart.service';
import { Helper } from 'src/provider/Helper';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';

@Component({
  selector: 'app-detail-produk',
  templateUrl: './detail-produk.page.html',
  styleUrls: ['./detail-produk.page.scss'],
})
export class DetailProdukPage implements OnInit {
  productId: any;
  products: any = [];
  selectedSize: any = '';
  selectedColor: any = '';
  activeVariation: any = '';

  @ViewChild('.colors') colors: any = ElementRef;
  @ViewChild('.sizes') sizes: any = ElementRef;

  product: any;
  constructor(
    private route: ActivatedRoute,
    private api: RestApi,
    private util: Helper,
    private router: Router,
    private cartService: CartService
  ) {
    this.route.queryParams.subscribe((params: any) => {
      this.productId = params.id;
      console.log(this.productId);
    });
  }

  ngOnInit() {
    this.getProduct();
  }

  async getProduct() {
    const options = {
      url: 'https://toko-amsis.my.id/api/produk/detail/' + this.productId,
      headers: { 'Content-Type': 'application/json' },
    };
    const response: HttpResponse = await CapacitorHttp.get(options);
    this.products = response.data;
    console.log('Ini Datanya : ',response.data);

    // this.api.get('produk/detail/' + this.productId).subscribe((res: any) => {
    //   console.log(res);
    //   this.products = res;
    // });
  }

  isWishlistAdded: boolean = false;

  addToWishlist(productid: number) {
    this.isWishlistAdded = !this.isWishlistAdded;
    console.log(this.isWishlistAdded);
    if (this.isWishlistAdded == true) {
      this.product = {
        id: this.products.id_produk,
        name: this.products.nama_produk,
        price: this.products.harga_jual,
        gambar: this.products.gambar,
      };
      this.cartService.addToCart('whistlist', this.product);
      this.util.toastNotif('Produk Berhasil ditambahkan Ke whislist');
    } else {
      this.removeProduct(productid);
    }
  }

  removeProduct(productId: number) {
    const products = JSON.parse(localStorage.getItem('whistlist') ?? '{}');
    const ketemu = products.filter((product: any) => product.id !== productId);
    console.log('ketemu : ', ketemu);
    localStorage.setItem('whistlist', ketemu);
    this.util.toastNotif('Produk Berhasil dihapus dari whislist');
  }

  addToCart() {
    this.product = {
      id: this.products.id_produk,
      name: this.products.nama_produk,
      price: this.products.harga_jual,
      gambar: this.products.gambar,
    };
    this.cartService.addToCart('cart', this.product);
    this.util.toastNotif('Produk Berhasil ditambahkan Ke keranjang');
  }

  buy() {
    this.product = {
      id: this.products.id,
      name: this.products.title,
      price: this.products.price,
      gambar: this.products.thumbnail,
      quantity: 1,
    };
    this.cartService.addToCart('cart', this.product);
    this.router.navigateByUrl('/home/cart');
  }

  segmentChanged(e: any) {
    this.activeVariation = e.detail.value;
  }

  changeSize(size: number) {
    this.selectedSize = size;
  }

  changeColor(color: number) {
    this.selectedColor = color;
  }
}
