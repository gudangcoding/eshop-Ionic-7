import { CartService } from 'src/app/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApi } from 'src/provider/RestApi';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Helper } from 'src/provider/Helper';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  profilePhoto =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png';
  user: any;
  profil: any = [];
  response: any;
  constructor(
    private router: Router,
    private api: RestApi,
    private cartService: CartService,
    public util: Helper
  ) {
    this.user = cartService.getCart('member');
    console.log(this.user.token);
  }

  ngOnInit() {
    this.getUser();
  }
ionViewDidLoad(){
  this.getUser();
}
  async getUser() {
    // const options = {
    //   url: 'https://toko-amsis.my.id/api/member/profil/'+ this.user.id_member,
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authentication': 'Bearer ${this.user.token}'
    //    },
    // };
    // const response: HttpResponse = await CapacitorHttp.post(options);
    this.api
      .getWithToken('member/profil/' + this.user.id_member, this.user.token)
      .subscribe((res: any) => {
        this.profil = res.data;
      });
  }

  async edit() {
    // const options = {
    //   url: 'https://toko-amsis.my.id/api/member/update',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authentication': 'Bearer ${this.user.token}'
    //   },
    //   params: {
    //     id: this.profil.id_member,
    //     nama: this.profil.nama,
    //     alamat: this.profil.alamat,
    //     telepon: this.profil.telepon,
    //     email: this.profil.email,
    //     password_lama: this.profil.password_lama,
    //     password_baru: this.profil.password_baru,
    //   },
    // };
    // const response: HttpResponse = await CapacitorHttp.post(options);
    // if (response.data.success == true) {
    //   this.util.toastNotif('profil berhasil di update');
    // }else{
    //   this.util.toastNotif('profil gagal di update');
    // }
    let params = {
      id: this.profil.id_member,
      nama: this.profil.nama,
      alamat: this.profil.alamat,
      telepon: this.profil.telepon,
      email: this.profil.email,
      password_lama: this.profil.password_lama,
      password_baru: this.profil.password_baru,
    };
    this.api
      .postWithToken(params, 'member/update', this.user.token)
      .subscribe((res: any) => {
        console.log(res);
        if (res.success == true) {
          this.util.toastNotif('Profil Berhasi di update');
          this.getUser();
        }
      });
  }

  logout() {
    localStorage.removeItem('member');
    this.router.navigateByUrl('login');
  }

  public async takePicture(id: any) {
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
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authentication': 'Bearer ${this.user.token}'
    //    },
    //   params: {
    //     image: imageData,
    //     id: id,
    //   },
    // };
    // const response: HttpResponse = await CapacitorHttp.post(options);

    // if (response.data.success == true) {
    //   this.util.toastNotif('Update Gambar Berhasil');
    // }else{
    //   this.util.toastNotif('Update Gambar Gagal');
    // }
    let body = {
      image: imageData,
      id: id,
    };
    this.api
      .postWithToken(body, 'member/uploadfoto', this.user.token)
      .subscribe((res: any) => {
        console.log(res);
        if (res.success == true) {
          this.util.toastNotif('Foto Berhasi di update');
          this.getUser();
        }
      });
  }
}
