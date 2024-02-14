import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Helper } from 'src/provider/Helper';

@Component({
  selector: 'app-whislist',
  templateUrl: './whislist.page.html',
  styleUrls: ['./whislist.page.scss'],
})
export class WhislistPage implements OnInit {

  whistlist: any[] = [];
  hasil: any[] = [];
  searchTerm:any="";

  constructor(private cartService: CartService, private router: Router,private util:Helper) {
    this.whistlist = cartService.getCart('whistlist');
    console.log('Total atas : ', this.whistlist);
  }

  ngOnInit() {
    this.whistlist = this.cartService.getCart('whistlist');
  }

  searchByName(searchTerm: any) {
    this.hasil = this.whistlist.filter((product: any) => product.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
    console.log(this.hasil);
  }

  detail(id:any) {

    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: id,
      },
    };
    this.router.navigate(['/detail-produk'], navigationExtras);

  }
}
