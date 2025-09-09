import { importProvidersFrom, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatNativeDateModule } from '@angular/material/core';
import { DialogTeamLeadComponent } from './crete-team-lead/dialog-team-lead/dialog-team-lead.component';
import { DialogTeamMemberComponent } from './crete-team-lead/dialog-team-member/dialog-team-member.component';
import { TeamMemberComponent } from './components/team-member/team-member.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateTeamLeadComponent } from './crete-team-lead/create-team-lead.component';
import { PortalModule } from '@angular/cdk/portal';
import { Overlay } from '@angular/cdk/overlay';
import { adminComponent } from './admin.component';
import { TeamsComponent } from './components/teams/teams.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TeamsOverviewComponent } from './components/teams-overview/teams-overview.component';

import { DeactivateTeamModalComponent } from './components/deactivate-team-modal/deactivate-team-modal.component';
import { AssignMembersModalComponent } from './components/assign-members-modal/assign-members-modal.component';
import { EditTeamModalComponent } from './components/edit-team-modal/edit-team-modal.component';
import { AddTeamModalComponent } from './components/add-team-modal/add-team-modal.component';
import { CreateTeamMemberComponent } from './components/create-team-member/create-team-member.component';
import { UserService } from '../services/user.service';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { TokenInterceptor } from '../interceptor/token.interceptor';
import { authGuard } from '../interceptor/auth.guard';
// import { TokenInterceptor } from '../services/token.interceptor';
import { NotificationComponent } from './components/notification/notification.component';

import { ProfileComponent } from './components/profile/profile.component';
import { SetTargetsComponent } from './components/set-targets/set-targets.component';
import { ViewTargetsComponent } from './components/view-targets/view-targets.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { TeamMemberDetailsComponent } from './components/team-member-details/team-member-details.component';
import { AddTeamMemberPopupComponent } from './components/add-team-member-popup/add-team-member-popup.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormComponentComponent } from './components/form-component/form-component.component';
import { TeamLeadComponent } from './components/team-lead/team-lead.component';
import { TeamLeadDetailsComponent } from './components/team-lead-details/team-lead-details.component';
import { TeamLeadFormComponent } from './components/team-lead-form/team-lead-form.component';
import { AddTeamLeadPopupComponent } from './components/add-team-lead-popup/add-team-lead-popup.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TablePaginationComponent } from './components/table-pagination/table-pagination.component';
import { TeamBreakdownComponent } from './components/team-breakdown/team-breakdown.component';
import { EditTeamDialogComponent } from './components/edit-team-dialog/edit-team-dialog.component';
import { AddTeamDialogComponent } from './components/add-team-dialog/add-team-dialog.component';
import { DeactivateTeamDialogComponent } from './components/deactivate-team-dialog/deactivate-team-dialog.component';
import { LoginComponent } from '../auth/components/login/login.component';
import { NoTargetComponent } from './components/no-target/no-target.component';
import { ViewClientComponent } from './components/view-client/view-client.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component';
import { AddEditMemberComponent } from './components/add-edit-member/add-edit-member.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PresetTargetComponent } from './components/preset-target/preset-target.component';






const routes: Routes = [
  {

    path: '',
    component: adminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard],
      },
      {
        path: 'team-member',
        component: TeamMemberComponent,
        canActivate: [authGuard],
      },
      { path: 'teams', component: TeamsComponent, canActivate: [authGuard] },
      {
        path: 'teams/:teamId',
        component: TeamsOverviewComponent,
        canActivate: [authGuard],
      },
      { path: 'edit-team', component: EditTeamModalComponent, canActivate: [authGuard] },
      { path: 'add-team', component: AddTeamModalComponent, canActivate:[authGuard] },
      { path: 'assign-members', component: AssignMembersModalComponent, canActivate:[authGuard] },
      { path: 'notification', component: NotificationComponent, canActivate:[authGuard] },
      { path: 'team-member/:memberId', component: TeamMemberDetailsComponent, canActivate: [authGuard] },
      { path: 'team-leads', component: TeamLeadComponent, canActivate: [authGuard]  },
      { path: 'team-leads/:teamLeadId', component: TeamLeadDetailsComponent, canActivate: [authGuard]  },

      // { path: 'otpAuthComponent', component:OtpAuthComponent} ,
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard],
      },
      // { path: 'dash2', component: Dash2Component, canActivate: [authGuard] },
      { path: 'teams', component: TeamsComponent, canActivate: [authGuard] },
      {
        path: 'teams/:teamId',
        component: TeamsOverviewComponent,
        canActivate: [authGuard],
      },
      { path: 'edit-team', component: EditTeamModalComponent, canActivate:[authGuard] },
      { path: 'add-team', component: AddTeamModalComponent,canActivate: [authGuard] },
      { path: 'assign-members', component: AssignMembersModalComponent, canActivate:[authGuard] },
      { path: 'profile', component: ProfileComponent, canActivate:[authGuard] },
      {
        path: 'create-team-lead',
        component: CreateTeamLeadComponent,
        canActivate: [authGuard],
      },
      {
        path: 'create-team-member',
        component: CreateTeamMemberComponent,
        canActivate: [authGuard],
      },
      {path: 'preset-target', component: PresetTargetComponent, canActivate: [authGuard] },
      { path: 'deactivate-team', component: DeactivateTeamModalComponent, canActivate: [authGuard]  },
      {
        path: 'set-target',
        component: SetTargetsComponent,
        canActivate: [authGuard],
      },
      { path: 'view-target', component: ViewTargetsComponent, canActivate:[authGuard] },
      { path: 'team-breakdown', component: TeamBreakdownComponent,canActivate:[authGuard] },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'no-target', component: NoTargetComponent, canActivate: [authGuard] },
  {
    path: 'view-client',
    component: ViewClientComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  declarations: [
    DialogTeamLeadComponent,
    DialogTeamMemberComponent,
    CreateTeamMemberComponent,
    TeamMemberComponent,
    CreateTeamLeadComponent,
    // Dash2Component,
    CreateTeamLeadComponent,
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


    TablePaginationComponent,
    AddTeamLeadPopupComponent,
    NotificationComponent,
    ProfileComponent,
    ViewTargetsComponent,
    TeamBreakdownComponent,
    EditTeamDialogComponent,
    AddTeamDialogComponent,
    NoTargetComponent,
    ViewClientComponent,
    AddEditUserComponent,
    AddEditMemberComponent,
    AddEditUserComponent,
    AddEditMemberComponent,
    SetTargetsComponent,
    PresetTargetComponent,

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
    FormsModule,
    ReactiveFormsModule,
    [MatButtonModule, MatMenuModule],
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FlatpickrModule.forRoot(),
    MatDialogModule,
    MatIconModule,
  ],
  providers: [
    importProvidersFrom(HttpClientModule),
    provideHttpClient(withInterceptors([TokenInterceptor],

    )),
  ],
})
export class AdminModule {}
