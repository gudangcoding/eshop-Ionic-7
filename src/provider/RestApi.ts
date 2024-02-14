import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RestApi {
  // server: string = 'https://laravel10kasir.app/api/';
  // server: string = 'http://192.168.1.12/laravel10kasir/api/';
  server: string = 'https://toko-amsis.my.id/api/';
  gambar: string = 'https://toko-amsis.my.id/public/';

  constructor(public http: HttpClient) {}

  post(body: any, api: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    let url = this.server + api;
    return this.http
      .post(url, JSON.stringify(body), httpOptions)
      .pipe((res: any) => res);
  }

  postWithToken(body: any, api: string, token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
    let url = this.server + api;
    return this.http
      .post(url, JSON.stringify(body), httpOptions)
      .pipe((res: any) => res);
  }

  get(api: string) {
    let url = this.server + api;
    return this.http.get(url).pipe((res: any) => res);
  }

  getWithToken(api: string, token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
    let url = this.server + api;
    return this.http.get(url, httpOptions).pipe((res: any) => res);
  }
}
