import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, EventEmitter } from '@angular/core';
import { CreateTeamLeadComponent  } from '../../crete-team-lead/create-team-lead.component';
import { AssignMembersModalComponent } from '../assign-members-modal/assign-members-modal.component';
import { EditTeamModalComponent } from '../edit-team-modal/edit-team-modal.component';
import{DeactivateTeamModalComponent} from '../deactivate-team-modal/deactivate-team-modal.component'
import { ModalService } from '../../../services/modalService';
import {specificTeamMembers, UserService} from '../../../services/user.service'
@Component({
  selector: 'app-teams-overview',
  standalone: false,
  templateUrl: './teams-overview.component.html',
  styleUrl: './teams-overview.component.css',
})
export class TeamsOverviewComponent {


  OverlayRef: any;
  activeModal : any;
  
  res: specificTeamMembers[] = [];

  constructor(private modal: ModalService, private userService:UserService ) {}
  openModal(type: 'assignMembers'|'editTeam'|'deactivateTeam') {
   
    if(type === 'assignMembers'){
      this.activeModal = 'assignMembers'
    }
    else if(type === 'editTeam'){
      this.activeModal = 'editTeam'
    }
    else if(type === 'deactivateTeam'){
      this.activeModal = 'deactivateTeam'
    }
    this.modal.openModal(this.activeModal);
  }
   
  ngOnInit(): void {
    this.userService.getTeamMembers().subscribe({
      next: (data) => {
        this.res = data;  
      }
    });
  }
}
