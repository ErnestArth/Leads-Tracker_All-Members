import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatNativeDateModule} from '@angular/material/core';
import { DialogTeamLeadComponent } from './dialog/dialog-team-lead/dialog-team-lead.component';
import { DialogTeamMemberComponent } from './dialog/dialog-team-member/dialog-team-member.component';
import { Dash2Component } from './dash2/dash2.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'DashboardComponent', pathMatch: 'full' },
      { path: 'dash2', component: Dash2Component },
      // { path: 'otpAuthComponent', component:OtpAuthComponent} ,

    ],
  },
];

@NgModule({
  declarations: [
    DialogTeamLeadComponent,
    DialogTeamMemberComponent,
    Dash2Component
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
  ]
})
export class AdminModule { }
