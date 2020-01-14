import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomPreloadStrategy } from './shared/settings/custom-preloading-strategy';

import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { RegisterPageComponent } from './auth/register-page/register-page.component';

const routes: Routes = [
  {
    path: 'auth', component: AuthLayoutComponent, children:[
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component:LoginPageComponent},
      {path: 'register', component:RegisterPageComponent}
    ]
  },
  {path:'', loadChildren: './system/system.module#SystemModule'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: CustomPreloadStrategy})],
  exports: [RouterModule],
  providers: [CustomPreloadStrategy]
})
export class AppRoutingModule { }
