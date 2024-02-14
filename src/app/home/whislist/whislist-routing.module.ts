import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WhislistPage } from './whislist.page';

const routes: Routes = [
  {
    path: '',
    component: WhislistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WhislistPageRoutingModule {}
