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




const routes: Routes = [
  { path: 'reset-password', component: ResetForgotPasswordComponent },
  {
    path: '',
    component: AuthComponent, 
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'otpAuthComponent', component:OtpAuthComponent} ,
      { path: 'login', component: LoginComponent },
      { path: 'reset-password', component: ResetForgotPasswordComponent },
      { path: 'otpAuthComponent', component:OtpAuthComponent} 
      // { path: 'otp-auth', component: OtpAuthComponent },
    ],
  },
];
@NgModule({
  declarations: [
    LoginComponent,
    ResetForgotPasswordComponent,
    AuthComponent,
    OtpAuthComponent
    
    
   
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    RouterModule,
    NgOtpInputModule,
    
  
  ],
})
export class AuthModule {}
