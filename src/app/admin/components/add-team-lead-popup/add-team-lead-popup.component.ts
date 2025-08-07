import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../services/user.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-team-lead-popup',
  standalone: false,
  templateUrl: './add-team-lead-popup.component.html',
  styleUrl: './add-team-lead-popup.component.css',
})
export class AddTeamLeadPopupComponent {
  inputData: any;
  showPopupTitle = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddTeamLeadPopupComponent>,
    fb: FormBuilder,
    private service: UserService
  ) {}

  ngOnInit() {
    this.inputData = this.data;
    console.log(this.inputData);
  }

  remove() {
    this.showPopupTitle = false;
    console.log('something');
    console.log(this.showPopupTitle);
  }

  closeModal() {
    this.dialogRef.close();
  }
}
