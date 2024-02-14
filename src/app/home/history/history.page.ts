import { Component, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import { CartService } from 'src/app/cart.service';
import { RestApi } from 'src/provider/RestApi';
import { Sesi } from 'src/provider/Sesi';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Helper } from 'src/provider/Helper';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  selectedSegment: string = 'proses';
  products: any = [];
  product: any = [];
  orderStatusList: any[] = [];
  user: any;
  gambar: any;
  constructor(
    private cartService: CartService,
    private api: RestApi,
    private sesi: Sesi,
    private util: Helper,
    private renderer: Renderer2
  ) {
    this.user = sesi.get('member');
    this.getOrder();
    this.orderStatusList = [
      {
        title: 'Pesanan Diterima',
        description: 'Pesanan Anda telah diterima.',
        date: '12 Januari 2024',
      },
      {
        title: 'Sedang Diproses',
        description: 'Pesanan Anda sedang diproses.',
        date: '14 Januari 2024',
      },
      {
        title: 'Dikirim',
        description: 'Pesanan Anda telah dikirim.',
        date: '16 Januari 2024',
      },
    ];
  }

  ngOnInit() {
    this.getOrder();
  }
  ionViewDidEnter() {
    this.getOrder();
  }
  ionViewDidLoad() {
    this.getOrder();
  }
  ngAfterViewInit() {}

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  async getOrder() {
    // const options = {
    //   url: 'https://toko-amsis.my.id/api/order/list',
    //   headers: { 'X-Fake-Header': 'Fake-Value' },
    //   params: { id: this.user.id_member },
    // };

    // const response: HttpResponse = await CapacitorHttp.get(options);
    // this.products = response.data.data;
    let body = {
      id: this.user.id_member
    }
    this.api.postWithToken(body, 'order/list', this.user.token).subscribe((res: any) => {
      console.log(res);
      this.products = res.data;
    });
  }

  async takePicture(id: any) {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
    });

    this.uploadPicture(image.dataUrl, id);
  }

  async uploadPicture(imageData: any, id: any) {
    // const options = {
    //   url: 'https://toko-amsis.my.id/api/order/uploadbukti',
    //   headers: { 'Content-Type': 'application/json' },
    //   params: {
    //     image: imageData,
    //     id: id,
    //   },
    // };
    // const response: HttpResponse = await CapacitorHttp.post(options);

    const postData = { image: imageData, id: id };
    this.api
      .postWithToken(postData, 'order/uploadbukti', this.user.token)
      .subscribe((res: any) => {
        this.getOrder();
      });
  }
}
