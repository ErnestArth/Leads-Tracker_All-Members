import { DialogTeamMemberComponent } from './admin/crete-team-lead/dialog-team-member/dialog-team-member.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtpAuthComponent } from './auth/components/otp-auth/otp-auth.component';
import { LoginComponent } from './auth/components/login/login.component';
import { ResetForgotPasswordComponent } from './auth/components/reset-forgot-password/reset-forgot-password.component';
import { AuthComponent } from './auth/auth.component';
import { ResettingPasswordComponent } from './auth/components/resetting-password/resetting-password.component';
import { TeamMemberComponent } from './admin/components/team-member/team-member.component';
import { CreateTeamLeadComponent } from './admin/crete-team-lead/create-team-lead.component';
import { DialogTeamLeadComponent } from './admin/crete-team-lead/dialog-team-lead/dialog-team-lead.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { NotificationComponent } from './admin/components/notification/notification.component';

const routes: Routes = [
  { path: '', redirectTo: 'authentication', pathMatch: 'full' },
  {
    path: 'authentication',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  { path: 'otp-auth', component: OtpAuthComponent },
  { path: 'reset-password', component: ResetForgotPasswordComponent },
  // { path: 'login', component:LoginComponent},
  { path: 'ResettingPasswordComponent', component: ResettingPasswordComponent },
  { path: 'dialog', component: CreateTeamLeadComponent },
  { path: 'dialog-team-lead', component: DialogTeamLeadComponent },
  { path: 'dialog-team-member', component: DialogTeamMemberComponent },
  { path: 'team-member', component: TeamMemberComponent },
  { path: 'admin', component: DashboardComponent },
  { path: 'notification', component: NotificationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
