import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, EventEmitter } from '@angular/core';
import { CreateTeamLeadComponent } from '../../crete-team-lead/create-team-lead.component';
import { AssignMembersModalComponent } from '../assign-members-modal/assign-members-modal.component';
import { EditTeamModalComponent } from '../edit-team-modal/edit-team-modal.component';
import { DeactivateTeamModalComponent } from '../deactivate-team-modal/deactivate-team-modal.component';
import { ModalService } from '../../../services/modalService';
import {EditTeamDialogComponent} from '../edit-team-dialog/edit-team-dialog.component'
import {
  specificTeamMembers,
  UserService,
} from '../../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-teams-overview',
  standalone: false,
  templateUrl: './teams-overview.component.html',
  styleUrl: './teams-overview.component.css',
})
export class TeamsOverviewComponent {
  OverlayRef: any;
  activeModal: any;

  teamMembers: specificTeamMembers[] = [];

  constructor(
    private modal: ModalService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {}
  openModal(type: 'assignMembers' | 'editTeam' | 'deactivateTeam') {
    if (type === 'assignMembers') {
      this.activeModal = 'assignMembers';
    } else if (type === 'editTeam') {
      this.activeModal = 'editTeam';
    } else if (type === 'deactivateTeam') {
      this.activeModal = 'deactivateTeam';
    }
    this.modal.openModal(this.activeModal);
  }

  openEditTeamDialog() {
    this.dialog.open(EditTeamDialogComponent,{
      width: '1200px',
      data:{
        title: 'Edit Team',

      }
    });
  }
  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('teamId');
    // console.log(this.activatedRoute.snapshot.paramMap);

    if (id) {
      this.userService.getTeamMembers(id).subscribe({
        next: (data) => {
          this.teamMembers = data;
          // console.log(this.res)
        },
      });
    }
  }
}
