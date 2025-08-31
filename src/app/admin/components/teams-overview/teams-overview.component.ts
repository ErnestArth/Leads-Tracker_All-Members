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
import { FlatpickrModule } from 'angularx-flatpickr';
import { AddTeamLeadPopupComponent } from '../add-team-lead-popup/add-team-lead-popup.component';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
import { AddEditMemberComponent } from '../add-edit-member/add-edit-member.component';
@Component({
  selector: 'app-teams-overview',
  standalone: false,
  templateUrl: './teams-overview.component.html',
  styleUrl: './teams-overview.component.css',
})
export class TeamsOverviewComponent {
  OverlayRef: any;
  activeModal: any;

  teamMembers: any;
  teamData: any;
  teamLeadUserId:string="";
  teamId!: number;
  teamName!: string;

  currentPage = 0;
  totalPages = 3;
  totalItems = 12;
  limit = 5;
  hasNext = false;
  hasPrevious = false;
  
  searchTerm=""
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
        this.getATeam(this.currentPage)
      }
    })
  }
  openDeactivateTeamAndMembersDialog(teamId: string,memberId: string) {
    this.dialog.open(DeactivateTeamDialogComponent,{
      width: '1200px',
      data:{
        title: 'Deactivate Team',
        teamId: teamId,
        memberId: memberId
        


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
    editTeamMemberDialog.componentInstance.effectTeamMemberChanges.subscribe((data)=>{
      // this.getTeamMembers(teamLeadUserId)
      this.getATeam(this.currentPage)
    })
  
  }
  ngOnInit(): void {
    this.getATeam(this.currentPage)
    console.log(this.activatedRoute.snapshot);
   

    
    
  }

  onLimitChange(newLimit: number): void {
    
    this.limit = newLimit; // convert to number
    this.currentPage = 0;
    this.getATeam(this.currentPage)
  }

  getATeam(page:number){
    const id =this.activatedRoute.snapshot.paramMap.get('teamId')
    if(id){
      this.userService.getATeam(id,page,this.searchTerm,this.limit).subscribe({
        next: (data) => {
          console.log(data);
          this.teamData = data.team
          this.teamLeadUserId = data.team.teamLeadUserId
          this.teamMembers = data.team.teamMembers.data
          this.teamId=data.team.teamId
          this.teamName=data.team.name
          console.log(data.team.teamMembers);
          

          this.hasNext=data.team.teamMembers.hasNext
          this.hasPrevious=data.team.teamMembers.hasPrevious
          this.currentPage=page
          this.totalPages=data.team.teamMembers.totalPages
          this.totalItems=data.team.teamMembers.totalItems


          
        }
      })
      
    }
    
  }
  // getTeamMembers(teamLeadId: string) {
  //   let id = this.activatedRoute.snapshot.paramMap.get('teamId');
  //   // console.log(this.activatedRoute.snapshot.paramMap);
  //   console.log(teamLeadId)
  //   if (id) {
  //     this.userService.getTeamMembers(teamLeadId).subscribe({
  //       next: (data) => {
  //         this.teamMembers = data;
          
          
  //         // console.log(this.res)
  //       },
  //     });
  //   }
  // }

  addTeamMember(id:number) {
    this.openAddTeamMemberDialog(id, 'Create Team Member');
    console.log(id);
  }

  openAddTeamMemberDialog(id: any, title: any) {
    const popup = this.dialog.open(AddTeamMemberPopupComponent, {
      width: '500px',
      data: {
        title: title,
        id: id,
        teamName:this.teamData.name,
        
      },
    });
  }

  addTeamLead() {
    this.openAddTeamLeadDialog(0, 'Create Team Lead');
  }

  openAddTeamLeadDialog(id: any, title: any) {
    const addLeadPopup = this.dialog.open(AddTeamLeadPopupComponent, {
      width: '500px',
      data: {
        title: title,
        id: id,
        teamName:this.teamData.name
      },
    });
  }
  openAddMemberDialog(teamName:any,memberId:any) {
    const addUserPopup = this.dialog.open(AddEditMemberComponent, {
      width: '500px',
      data: {
          teamName:teamName,
          memberId:memberId
       
      },
      
    });
    addUserPopup.componentInstance.userCreated.subscribe((data)=>{
       this.getATeam(this.currentPage)
    })
  }
}
