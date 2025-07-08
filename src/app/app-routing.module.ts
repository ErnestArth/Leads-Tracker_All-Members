import { DialogTeamMemberComponent } from './admin/dialog/dialog-team-member/dialog-team-member.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtpAuthComponent } from './auth/components/otp-auth/otp-auth.component';
import { LoginComponent } from './auth/components/login/login.component';
import { ResetForgotPasswordComponent } from './auth/components/reset-forgot-password/reset-forgot-password.component';
import { AuthComponent } from './auth/auth.component';
import { ResettingPasswordComponent } from './auth/components/resetting-password/resetting-password.component';
import { DialogComponent } from './admin/dialog/dialog.component';
import { DialogTeamLeadComponent } from './admin/dialog/dialog-team-lead/dialog-team-lead.component';

const routes: Routes = [
  {path: '', redirectTo: 'authentication', pathMatch: 'full'},
  {
    path: 'authentication',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
  },
  { path: 'otp-auth', component:OtpAuthComponent},
  { path: 'reset-password', component:ResetForgotPasswordComponent},
  { path: 'login', component:LoginComponent},
  {path: 'ResettingPasswordComponent', component:ResettingPasswordComponent},
  {path: 'dialog', component:DialogComponent},
  {path: 'dialog-team-lead', component:DialogTeamLeadComponent},
  {path: 'dialog-team-member', component:DialogTeamMemberComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
