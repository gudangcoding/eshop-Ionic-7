import { Component, OnInit } from '@angular/core';
declare var snap: any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  constructor() {}

  ngOnInit() {}
  
  //url testing
  //https://simulator.sandbox.midtrans.com/
  bayar(snapToken: any) {
    snap.pay(snapToken, {
      onSuccess: (result: any) => {
        console.log('Pembayaran berhasil:', result);
        // Lakukan sesuatu setelah pembayaran berhasil
      },
      onPending: (result: any) => {
        console.log('Pembayaran tertunda:', result);
        // Lakukan sesuatu setelah pembayaran tertunda
      },
      onError: (result: any) => {
        console.error('Pembayaran gagal:', result);
        // Lakukan sesuatu setelah pembayaran gagal
      },
    });
  }
}
