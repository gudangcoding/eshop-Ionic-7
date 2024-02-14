import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Helper } from 'src/provider/Helper';
import { RestApi } from 'src/provider/RestApi';
import { Sesi } from 'src/provider/Sesi';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(
    private router: Router,
    private util: Helper,
    private api: RestApi,
    private sesi: Sesi
  ) { }

  ngOnInit() {
  }

  async cekLogin() {
    
    // Validasi email dan password sebelum mengirim permintaan login
    if (!this.email || !this.password) {
      this.util.alertNotif('Email dan password harus diisi.');
      return;
    }

   
    this.util.showLoading();
    const options = {
      url: 'https://toko-amsis.my.id/api/member/login',
      headers: { 'Content-Type': 'application/json' },
      params: { 
        email: this.email,
        password:this.password
      }
    };
  
    const response: HttpResponse = await CapacitorHttp.post(options);
    if (response.data.success==true) {
      this.util.dismissLoading();
      this.sesi.set('member', response.data.data);
        this.router.navigate(['/home/beranda'], { replaceUrl: true });
    }else{
      this.util.dismissLoading();
      this.util.toastNotif('Login Gagal, Cek Email dan Password');
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
