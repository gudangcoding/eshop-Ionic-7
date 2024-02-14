import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailProdukPageRoutingModule } from './detail-produk-routing.module';

import { DetailProdukPage } from './detail-produk.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailProdukPageRoutingModule
  ],
  declarations: [DetailProdukPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DetailProdukPageModule {}
