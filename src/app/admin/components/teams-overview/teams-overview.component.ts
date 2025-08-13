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
import { AddTeamMemberPopupComponent } from '../add-team-member-popup/add-team-member-popup.component';
import { DeactivateTeamDialogComponent } from '../deactivate-team-dialog/deactivate-team-dialog.component';
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
  teamData: any;
  teamLeadUserId:string="";
  

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
    const id =this.activatedRoute.snapshot.paramMap.get('teamId')
    const editTeamDialog = this.dialog.open(EditTeamDialogComponent,{
      width: '1200px',
      data:{
        title: 'Edit Team',
        id: id

      }
    });
    editTeamDialog.componentInstance.teamEdited.subscribe((data)=>{
      if(data){
        this.getATeam()
      }
    })
  }
  openDeactivateTeamDialog(teamId: string) {
    this.dialog.open(DeactivateTeamDialogComponent,{
      width: '1200px',
      data:{
        title: 'Deactivate Team',
        teamId: teamId

      }
    })
  }

  openEditTeamMemberDialog(teamMemberId: string,teamLeadUserId:string,teamId:string) {
   const editTeamMemberDialog = this.dialog.open(AddTeamMemberPopupComponent, { 
      width: '1200px',
      data:{
        title: 'Edit Team Member',
        teamMemberId: teamMemberId,
        teamLeadUserId: teamLeadUserId,
        teamId:teamId

      }
      
    })
  
  }
  ngOnInit(): void {

    this.getATeam()
    console.log(this.activatedRoute.snapshot);
   

    
    
  }

  getATeam(){
    const id =this.activatedRoute.snapshot.paramMap.get('teamId')
    this.userService.getATeam(id!).subscribe({
      next: (data) => {
        console.log(data);
        this.teamData = data.team
        this.teamLeadUserId = data.team.teamLeadUserId
        this.getTeamMembers(this.teamLeadUserId)
        console.log(this.teamLeadUserId);
      }
    })
  }
  getTeamMembers(teamLeadId: string) {
    let id = this.activatedRoute.snapshot.paramMap.get('teamId');
    // console.log(this.activatedRoute.snapshot.paramMap);
    console.log(teamLeadId)
    if (id) {
      this.userService.getTeamMembers(teamLeadId).subscribe({
        next: (data) => {
          this.teamMembers = data;
          
          
          // console.log(this.res)
        },
      });
    }
  }
}
