import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService,AddTeamResponse, getAllTeamLeads } from '../../../services/user.service';
@Component({
  selector: 'app-add-team-dialog',
  standalone: false,
  templateUrl: './add-team-dialog.component.html',
  styleUrl: './add-team-dialog.component.css'
})
export class AddTeamDialogComponent {
  addTeamForm!: FormGroup;
  allTeamLeads: getAllTeamLeads[] = [];
  areChangesSaved = false;
  isThereError = false;
  errorMessage = 'oops Something went wrong';
  @Output() teamAdded = new EventEmitter<any>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private dialogRef: MatDialogRef<AddTeamDialogComponent>,
   private fb: FormBuilder,
   private service: UserService) {
    
  }
  
ngOnInit() {
  this.addTeamForm = this.fb.group({
    name: ['', Validators.required],
    teamLeadUserId: ['', Validators.required],
  })

  this.service.getAllTeamLeads().subscribe({
    next: (data) => {
      this.allTeamLeads = data;
      console.log(data);
    },
    error: (err) => {
      console.log(err);
    },
  })
}
onSubmit() {
  console.log(this.addTeamForm.value);
  this.service.addTeam(this.addTeamForm.value).subscribe({
    next: (data) => {
      console.log(data);
      this.areChangesSaved = true;
      this.teamAdded.emit(data);
      // this.dialogRef.close(data);
    },
    error: (err) => {
      console.log(err.message);
      this.isThereError = true;
    },
  })
}
toggleAreChangesSaved(){
  this.areChangesSaved = !this.areChangesSaved;
}

  closeModal(){
    this.dialogRef.close();
  }
}
