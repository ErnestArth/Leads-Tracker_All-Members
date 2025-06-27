import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent, 
    children: [
      { path: '', redirectTo: 'DashboardComponent', pathMatch: 'full' },
      // { path: 'otpAuthComponent', component:OtpAuthComponent} ,
     
    ],
  },
];

@NgModule({
  declarations: [
  
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class AdminModule { }
