import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CariPage } from './cari.page';

const routes: Routes = [
  {
    path: '',
    component: CariPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CariPageRoutingModule {}
