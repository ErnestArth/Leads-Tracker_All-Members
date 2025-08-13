import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-edit-team-modal',
  standalone: false,
  templateUrl: './edit-team-modal.component.html',
  styleUrl: './edit-team-modal.component.css',
})
export class EditTeamModalComponent {

  
  @Output() onCancel = new EventEmitter<void>();
  areChangesSaved = false;

  cancel() {
    this.onCancel.emit();
  }
  onSaveChanges() {
    this.areChangesSaved = !this.areChangesSaved;
  }
}
