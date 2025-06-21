import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtpAuthComponent } from './auth/components/otp-auth/otp-auth.component';
import { LoginComponent } from './auth/components/login/login.component';
import { ResetForgotPasswordComponent } from './auth/components/reset-forgot-password/reset-forgot-password.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {path: '', redirectTo: 'authentication', pathMatch: 'full'},
  {
    path: 'authentication',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  { path: 'otp-auth', component:OtpAuthComponent},
  // { path: 'reset-password', component:ResetForgotPasswordComponent},
  { path: 'login', component:LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
