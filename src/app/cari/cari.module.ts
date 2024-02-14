import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CariPageRoutingModule } from './cari-routing.module';

import { CariPage } from './cari.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CariPageRoutingModule
  ],
  declarations: [CariPage]
})
export class CariPageModule {}
