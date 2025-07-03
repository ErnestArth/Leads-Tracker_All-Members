import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent} from './components/login/login.component';
import { ResetForgotPasswordComponent } from './components/reset-forgot-password/reset-forgot-password.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OtpAuthComponent } from './components/otp-auth/otp-auth.component';
import { from } from 'rxjs';
import { NgOtpInputModule } from 'ng-otp-input';
import { NgIf } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { provideHttpClient, HttpClientModule } from '@angular/common/http';
import { ResettingPasswordComponent } from './components/resetting-password/resetting-password.component';



const routes: Routes = [
  { path: 'reset-password', component: ResetForgotPasswordComponent },
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'otpAuthComponent', component:OtpAuthComponent} ,
      { path: 'login', component: LoginComponent },
      { path: 'login-reset-password', component: ResetForgotPasswordComponent },
      { path: 'otpAuthComponent', component:OtpAuthComponent} ,
      {path: 'ResettingPasswordComponent', component:ResettingPasswordComponent},
      // { path: 'otp-auth', component: OtpAuthComponent },
    ],
  },
];
@NgModule({
  declarations: [
    LoginComponent,
    ResetForgotPasswordComponent,
    AuthComponent,
    OtpAuthComponent,
    ResettingPasswordComponent



  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    RouterModule,
    NgOtpInputModule,


  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AuthModule {}
