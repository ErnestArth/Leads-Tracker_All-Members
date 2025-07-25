import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { CreateTeamLeadComponent  } from '../../crete-team-lead/create-team-lead.component';
import { ComponentPortal } from '@angular/cdk/portal';
import { ModalService } from '../../../services/modalService';
import{ UserService,getAllTeamLeads} from '../../../services/user.service'
@Component({
  selector: 'app-teams',
  standalone: false,
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css'
})
export class TeamsComponent {
      activeModal: any
      showOptionsDialog: boolean = false

      allTeamLeads: getAllTeamLeads[] = []

    constructor( private modal: ModalService, private userService:UserService) { }
    openModal(type: 'addTeam'|'editTeam'|'deactivateTeam'| 'unassignedMembers') {
      if(type === 'addTeam'){
        this.activeModal = 'addTeam'
      }
      else if(type === 'editTeam'){
        this.activeModal = 'editTeam'
      }
      else if(type === 'unassignedMembers'){
        this.activeModal = 'unassignedMembers'
      }
      else if(type === 'deactivateTeam'){
        this.activeModal = 'deactivateTeam'
      }
     this.modal.openModal(this.activeModal);
    }


    // show Options Dialog

    selectedTeam: string | null = null;

    toggleOptionsDialog(team: string) {
      this.selectedTeam = this.selectedTeam === team ? null : team;
    }


    // toggleOptionsDialog() {
    //   this.showOptionsDialog = !this.showOptionsDialog;
    // }
    deactivateOptionsDialog(){
      this.showOptionsDialog = false
    }
 
    ngOnInit(): void {
     this.userService.getAllTeamLeads().subscribe({
       next: (data) => {
         this.allTeamLeads = data;  
       }
     }) 
    }
    
    
  }




