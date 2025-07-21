import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-unassigned-members-modal',
  standalone: false,
  templateUrl: './unassigned-members-modal.component.html',
  styleUrl: './unassigned-members-modal.component.css'
})
export class UnassignedMembersModalComponent {
  areChangesSaved: boolean = false

  @Output() onCancel = new  EventEmitter<void>()

  cancel(){
    this.onCancel.emit()
  }
  onSaveChanges(){
    this.areChangesSaved = !this.areChangesSaved
  }
}
