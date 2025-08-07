import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
@Component({
  selector: 'app-assign-members-modal',
  standalone: false,
  templateUrl: './assign-members-modal.component.html',
  styleUrl: './assign-members-modal.component.css',
})
export class AssignMembersModalComponent {
  areChangesSaved = false;
  createNewMember = false;
  assignMembersForm = new FormGroup({});
  teamLeads = new FormControl('');
  teamLeadsList: string[] = [
    'Kwadwo Ansah Amoh',
    'Ama Amoh',
    'Derrick Amoah',
    'Ato Kwamena',
    'Bernice Aggor',
    'Martha Barwah',
    'Peter Amoah',
    'Tomato',
    'Kakra',
    'Pona',
  ];
  selected = [];
  @Output() onCancel = new EventEmitter<void>();

  cancel() {
    this.onCancel.emit();
  }
  onSaveChanges() {
    this.areChangesSaved = !this.areChangesSaved;
    this.teamLeads.reset('');
  }

  onCreateNewMember() {
    this.createNewMember = !this.createNewMember;
    this.areChangesSaved = false;
  }
}
