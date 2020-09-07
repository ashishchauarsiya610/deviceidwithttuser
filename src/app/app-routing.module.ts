import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LockdataComponent } from './pages/lockdata/lockdata.component';

const routes: Routes = [
  
  
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./pages/login/login.component').then( m => m.LoginComponent)
  // },
  // {
  //   path: 'lockdata',
  //   loadChildren: () => import('./pages/lockdata/lockdata.component').then( m => m.LockdataComponent)
  // },
  
  {
   path: 'login',
   component: LoginComponent,
  },
  {
    path: 'lockdata',
    component: LockdataComponent,
   },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
