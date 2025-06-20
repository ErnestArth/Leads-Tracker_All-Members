import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { ResetForgotPasswordComponent } from './components/reset-forgot-password/reset-forgot-password.component';
import { OtpAuthComponent } from './components/otp-auth/otp-auth.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'otp-auth', component: OtpAuthComponent },
      {path: 'reset-forgot-password', component: ResetForgotPasswordComponent},
    ],
  },
];
@NgModule({
  declarations: [
    LoginComponent,
    ResetForgotPasswordComponent,
    OtpAuthComponent,
    AuthComponent,


  ],
  imports: [CommonModule, RouterModule.forChild(routes),ReactiveFormsModule,RouterModule],
})
export class AuthModule {}
