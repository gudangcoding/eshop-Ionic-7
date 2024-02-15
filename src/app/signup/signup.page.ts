import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Helper } from 'src/provider/Helper';
import { RestApi } from 'src/provider/RestApi';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  name:any;
  email:any;
  password:any;
  c_password:any;
  showPassword: boolean = false;

  constructor(
    private router: Router,
    private api : RestApi,
    private util : Helper
  ) { }

  ngOnInit() {
  }

  async daftar(){
   
    this.util.showLoading();
    const options = {
      url: 'https://toko-amsis.my.id/api/member/register',
      headers: { 'Content-Type': 'application/json' },
      params: { 
        nama:this.name,
        email : this.email,
        password:this.password,
        c_password:this.c_password,
      }
    };
  
    const response: HttpResponse = await CapacitorHttp.post(options);
    if (response.data.success==true) {
      this.util.dismissLoading();
      this.util.toastNotif('Daftar sukses');
        this.router.navigate(['/login'], { replaceUrl: true });
    }else{
      this.util.alertNotif('Daftar Gagal, server error');
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  
}
