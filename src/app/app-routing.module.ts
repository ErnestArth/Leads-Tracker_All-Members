import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetForgotPasswordComponent } from './auth/components/reset-forgot-password/reset-forgot-password.component';

const routes: Routes = [
  {path: '', redirectTo: 'authentication', pathMatch: 'full'},
  {
    path: 'authentication',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
