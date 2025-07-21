
import { EventEmitter, Injectable, Injector, Type } from '@angular/core';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { AssignMembersModalComponent } from './components/assign-members-modal/assign-members-modal.component';
import { EditTeamModalComponent } from './components/edit-team-modal/edit-team-modal.component';
import { DeactivateTeamModalComponent } from './components/deactivate-team-modal/deactivate-team-modal.component';
import { AddTeamModalComponent } from './components/add-team-modal/add-team-modal.component';
import { UnassignedMembersModalComponent } from './components/unassigned-members-modal/unassigned-members-modal.component';
@Injectable({ providedIn: 'root' })

export class ModalService {
    

    OverlayRef: any;
    activeComponent : any;

  constructor(private overlay: Overlay ) {}
  openModal(type: 'assignMembers'|'editTeam'|'deactivateTeam'|'addTeam'|'unassignedMembers') {
   
    if(type === 'assignMembers'){
      this.activeComponent = AssignMembersModalComponent;
    }
    else if(type === 'editTeam'){
      this.activeComponent = EditTeamModalComponent
    }
    else if(type === 'deactivateTeam'){
      this.activeComponent = DeactivateTeamModalComponent
    }
    else if (type === 'addTeam'){
      this.activeComponent = AddTeamModalComponent
    }
    else if ( type === 'unassignedMembers'){
      this.activeComponent = UnassignedMembersModalComponent
    }
    
    console.log('openModal');
    const config = new OverlayConfig({
      hasBackdrop: true,
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
        width: "40%",
      backdropClass: 'cdk-overlay-dark-backdrop',
    });
    const overlayRef = this.overlay.create(config);
    const portal = new ComponentPortal(this.activeComponent);
    const componentRef = overlayRef.attach(portal);

   
    overlayRef.backdropClick().subscribe(() => {
      overlayRef.detach();
      
    });

    (componentRef.instance as { onCancel: EventEmitter<void> }).onCancel.subscribe(() => {
      overlayRef.dispose(); 
    });
   

    // componentRef.instance.onCancel.subscribe(() => {
    //   overlayRef.dispose(); 
    // });
  }

}