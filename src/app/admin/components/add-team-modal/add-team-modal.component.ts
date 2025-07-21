import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-team-modal',
  standalone: false,
  templateUrl: './add-team-modal.component.html',
  styleUrl: './add-team-modal.component.css'
})
export class AddTeamModalComponent {
  @Output() onCancel = new EventEmitter<void>();
  areChangesSaved = false;

  cancel() {
    this.onCancel.emit(); 
  }
  onSaveChanges() {
    this.areChangesSaved = !this.areChangesSaved;
  }

}
