import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import { DialogTeamLeadComponent } from './dialog/dialog-team-lead/dialog-team-lead.component';
import { DialogTeamMemberComponent } from './dialog/dialog-team-member/dialog-team-member.component';
import { Dash2Component } from './components/dash2/dash2.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from './dialog/dialog.component';
import { PortalModule } from '@angular/cdk/portal';
import { Overlay } from '@angular/cdk/overlay';
import {adminComponent} from './admin.component'


const routes: Routes = [
  {
    path: '',
    component: adminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'dash2', component: Dash2Component },
      // { path: 'otpAuthComponent', component:OtpAuthComponent} ,

    ],
  },
];

@NgModule({
  declarations: [
    DialogTeamLeadComponent,
    DialogTeamMemberComponent,
    Dash2Component,
    DialogComponent,
    adminComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    CommonModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class AdminModule { }
