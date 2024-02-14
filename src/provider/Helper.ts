import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';

@Injectable()
export class Helper {
  isLoading = false;
id:any;
  ngOnInit() {}
  constructor(
    public router: Router,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private route:ActivatedRoute
  ) {}

  NavigasiParameter(page: any, id: any): void {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: id,
      },
    };
    this.router.navigate(['${page}'], navigationExtras);
  }

  getParams(){
    this.route.queryParams.subscribe((params: any) => {
      this.id=params.id
    });
  }

  Navigasi(page: any): void {
    this.router.navigate([page]);
  }

  NavigasiUrl(page: any): void {
    this.router.navigateByUrl(page);
  }

  kembali() {
    this.navCtrl.back();
  }

  async toastNotif(message: any) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 1000,

      cssClass: 'custom-toast',
      buttons: ['ok'],
    });
    await toast.present();
  }

  async alertNotif(message: any) {
    const toast = await this.alertCtrl.create({
      message: message,
      buttons: ['ok'],
    });
    await toast.present();
  }

  async showLoading() {
    this.isLoading = true;
    return await this.loadingCtrl
      .create({
        message: 'Tunggu ya, data sedang dimuat',
      })
      .then((a) => {
        a.present().then(() => {
          console.log('presented');
          if (!this.isLoading) {
            a.dismiss().then(() => console.log('abort presenting'));
          }
        });
      });
  }

  async dismissLoading() {
    this.isLoading = false;
    return await this.loadingCtrl
      .dismiss()
      .then(() => console.log('dismissed'));
  }

  async alertDismiss() {
    await this.alertCtrl.dismiss();
  }

  async toastDismiss() {
    await this.toastCtrl.dismiss();
  }
}
