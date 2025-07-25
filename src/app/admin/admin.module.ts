import { importProvidersFrom, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import { DialogTeamLeadComponent } from './crete-team-lead/dialog-team-lead/dialog-team-lead.component';
import { DialogTeamMemberComponent } from './crete-team-lead/dialog-team-member/dialog-team-member.component';
import { Dash2Component } from './components/dash2/dash2.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateTeamLeadComponent  } from './crete-team-lead/create-team-lead.component';
import { PortalModule } from '@angular/cdk/portal';
import { Overlay } from '@angular/cdk/overlay';
import {adminComponent} from './admin.component'
import { TeamsComponent } from './components/teams/teams.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TeamsOverviewComponent } from './components/teams-overview/teams-overview.component';
import {MatSelectModule} from '@angular/material/select';
import { DeactivateTeamModalComponent } from './components/deactivate-team-modal/deactivate-team-modal.component';
import { AssignMembersModalComponent } from './components/assign-members-modal/assign-members-modal.component';
import { EditTeamModalComponent } from './components/edit-team-modal/edit-team-modal.component';
import { AddTeamModalComponent } from './components/add-team-modal/add-team-modal.component';
import { CreateTeamMemberComponent } from './components/create-team-member/create-team-member.component';
import { UserService } from '../services/user.service';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { TokenInterceptor } from '../interceptor/token.interceptor';
import { authGuard } from '../interceptor/auth.guard';
// import { TokenInterceptor } from '../services/token.interceptor';
import { NotificationComponent } from './components/notification/notification.component';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';


const routes: Routes = [
  {
    path: '',
    component: adminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
      { path: 'dash2', component: Dash2Component,canActivate: [authGuard] },
      { path: 'teams', component:TeamsComponent,canActivate: [authGuard]},
      { path: 'teams/:teamId', component:TeamsOverviewComponent, canActivate: [authGuard]},
      {path: 'edit-team', component:EditTeamModalComponent},
      {path: 'add-team', component:AddTeamModalComponent},
      {path: 'assign-members', component:AssignMembersModalComponent},
      {path: 'notification', component:NotificationComponent},

      // { path: 'otpAuthComponent', component:OtpAuthComponent} ,

    ],
  },
];

@NgModule({
  declarations: [
    DialogTeamLeadComponent,
    DialogTeamMemberComponent,
    CreateTeamMemberComponent,
    Dash2Component,
    CreateTeamLeadComponent ,
    adminComponent,
    TeamsComponent,
    SidebarComponent,
    DashboardComponent,
    EditTeamModalComponent,
    AssignMembersModalComponent,
    TeamsOverviewComponent,
    DeactivateTeamModalComponent,
    AddTeamModalComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    CommonModule,
    PortalModule,
    FormsModule, ReactiveFormsModule,
    [MatButtonModule, MatMenuModule]
  ],
  providers: [
    importProvidersFrom(HttpClientModule),
    provideHttpClient(withInterceptors([TokenInterceptor])),
  ]
})
export class AdminModule { }
