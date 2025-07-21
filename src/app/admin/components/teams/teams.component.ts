import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { DialogComponent } from '../../dialog/dialog.component';
import { ComponentPortal } from '@angular/cdk/portal';
import { ModalService } from '../../modalService';
@Component({
  selector: 'app-teams',
  standalone: false,
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css'
})
export class TeamsComponent {
      activeModal: any
      showOptionsDialog: boolean = false

    constructor( private modal: ModalService) { }
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
      const overlayRef = this.modal.openModal(this.activeModal);
    }

    toggleOptionsDialog() {
      this.showOptionsDialog = !this.showOptionsDialog;
    }
    deactivateOptionsDialog(){
      this.showOptionsDialog = false
    }
    
    
  }




