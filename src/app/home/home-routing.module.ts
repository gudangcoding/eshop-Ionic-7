import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
        path: 'beranda',
        loadChildren: () => import('./beranda/beranda.module').then( m => m.BerandaPageModule)
      },
      {
        path: 'whislist',
        loadChildren: () => import('./whislist/whislist.module').then( m => m.WhislistPageModule)
      },
      // {
      //   path: 'cart',
      //   loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule)
      // },
      {
        path: 'history',
        loadChildren: () => import('./history/history.module').then( m => m.HistoryPageModule)
      },
      {
        path: 'profil',
        loadChildren: () => import('./profil/profil.module').then( m => m.ProfilPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home/beranda',
    pathMatch: 'full',
  },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
