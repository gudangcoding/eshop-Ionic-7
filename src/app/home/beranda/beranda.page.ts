import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CartService } from 'src/app/cart.service';
import { Helper } from 'src/provider/Helper';
import { RestApi } from 'src/provider/RestApi';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { ApiService } from 'src/app/services/ApiService';

@Component({
  selector: 'app-beranda',
  templateUrl: './beranda.page.html',
  styleUrls: ['./beranda.page.scss'],
})
export class BerandaPage implements OnInit {
  searchTerm: string = '';
  filteredProducts: any[] = [];

  products: any[] = [];
  displayedProducts: any[] = [];
  itemsPerPage: number = 12;
  currentPage: number = 1;
  response: any = [];
  keranjang: any;
  member:any;
  constructor(
    private api: RestApi,
    private http: HttpClient,
    private router: Router,
    private util: Helper,
    private cartservice: CartService,
    private api2: ApiService,
  ) {
    // this.loadData(null);
    // this.loadMoreData();
    this.keranjang = localStorage.getItem('qty');
    this.member = localStorage.getItem('member');
  }

  ngOnInit() {
    this.loadData(null);
    // this.getProduct(1);
    this.keranjang;
    this.member;
  }


  async getProduct(page: number) {
    // return this.api.get(`produk?page=${page}`);
    const options = {
      url: 'https://toko-amsis.my.id/api/produk?page='+page,
      headers: { 'Content-Type': 'application/json' }
    };
    return await CapacitorHttp.get(options);
  }
  
  loadData(event: any) {
    this.util.showLoading();
    console.log('Hasil Event : ', event);
    this.getProduct(this.currentPage).then((res: any) => {
      this.util.dismissLoading();
      this.products = this.products.concat(res.data.data);
      console.log('event ', event);

      if (event) {
        event.target.complete();
      }
      this.currentPage++;

      if (res.page === res.total) {
        if (event) {
          event.target.disabled = true;
        }
      }
    });
  }

  async loadMoreData(event?: any) {
    this.util.showLoading();
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    try {
      this.api.get('produk').subscribe((res: any) => {
        this.util.dismissLoading();
        this.response = res.data;
        this.products = this.response.slice(startIndex, endIndex);
        this.displayedProducts = [...this.displayedProducts, ...this.products];
      });


      if (event) {
        event.target.complete();
      }

      this.currentPage++;
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  }

  toSerach(cari: any) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        cari: cari,
      },
    };
    this.router.navigate(['/cari'], navigationExtras);

  }

  detail(id: any) {

    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: id,
      },
    };
    this.router.navigate(['/detail-produk'], navigationExtras);

  }
}
