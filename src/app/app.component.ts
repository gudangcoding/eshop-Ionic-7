import { Component } from '@angular/core';
import { Helper } from 'src/provider/Helper';
import { Sesi } from 'src/provider/Sesi';
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private util: Helper, private session: Sesi) {
    this.cekLogin();
  }

  cekLogin() {
    let session = this.session.get('member');
    if (session == null) {
      this.util.Navigasi('/login');
    } else {
      this.util.NavigasiUrl('/home/beranda');
    }
  }
}
