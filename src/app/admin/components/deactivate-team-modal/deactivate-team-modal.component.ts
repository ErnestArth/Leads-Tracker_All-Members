import { Component, EventEmitter, Output, output } from '@angular/core';

@Component({
  selector: 'app-deactivate-team-modal',
  standalone: false,
  templateUrl: './deactivate-team-modal.component.html',
  styleUrl: './deactivate-team-modal.component.css',
})
export class DeactivateTeamModalComponent {
  isTeamDeactivated = false;

  @Output() onCancel = new EventEmitter<void>();

  cancel() {
    this.onCancel.emit();
  }
  onTeamDeactivation() {
    this.isTeamDeactivated = !this.isTeamDeactivated;
  }
}
