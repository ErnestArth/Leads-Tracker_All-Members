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
import { TeamMemberComponent } from './components/team-member/team-member.component';
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
import { TeamMemberDetailsComponent } from './components/team-member-details/team-member-details.component';
import { AddTeamMemberPopupComponent } from './components/add-team-member-popup/add-team-member-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormComponentComponent } from './components/form-component/form-component.component';
import { TeamLeadComponent } from './components/team-lead/team-lead.component';
import { TeamLeadDetailsComponent } from './components/team-lead-details/team-lead-details.component';
import { TeamLeadFormComponent } from './components/team-lead-form/team-lead-form.component';
import { AddTeamLeadPopupComponent } from './components/add-team-lead-popup/add-team-lead-popup.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
const routes: Routes = [
  {
    path: '',
    component: adminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
      { path: 'team-member', component: TeamMemberComponent,canActivate: [authGuard] },
      { path: 'teams', component:TeamsComponent,canActivate: [authGuard]},
      { path: 'teams/:teamId', component:TeamsOverviewComponent, canActivate: [authGuard]},
      {path: 'edit-team', component:EditTeamModalComponent},
      {path: 'add-team', component:AddTeamModalComponent},
      {path: 'assign-members', component:AssignMembersModalComponent},
      {path: 'notification', component:NotificationComponent},
      {path: 'team-member/:memberId', component:TeamMemberDetailsComponent},
      {path: 'team-leads', component:TeamLeadComponent},
      {path: 'team-leads/:teamLeadId', component:TeamLeadDetailsComponent},

      // { path: 'otpAuthComponent', component:OtpAuthComponent} ,

    ],
  },
];

@NgModule({
  declarations: [
    DialogTeamLeadComponent,
    DialogTeamMemberComponent,
    CreateTeamMemberComponent,
    TeamMemberComponent,
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
    NotificationComponent,
    TeamMemberDetailsComponent,
    AddTeamMemberPopupComponent,
    FormComponentComponent,
    TeamLeadComponent,
    TeamLeadDetailsComponent,
    TeamLeadFormComponent,
    AddTeamLeadPopupComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatDialogModule,
    CommonModule,
    PortalModule,
    FormsModule, ReactiveFormsModule,
    [MatButtonModule, MatMenuModule],
    MatTableModule,MatSortModule,MatPaginatorModule
  ],
  providers: [
    importProvidersFrom(HttpClientModule),
    provideHttpClient(withInterceptors([TokenInterceptor])),
  ]
})
export class AdminModule { }
