import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WhislistPageRoutingModule } from './whislist-routing.module';

import { WhislistPage } from './whislist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WhislistPageRoutingModule
  ],
  declarations: [WhislistPage]
})
export class WhislistPageModule {}
