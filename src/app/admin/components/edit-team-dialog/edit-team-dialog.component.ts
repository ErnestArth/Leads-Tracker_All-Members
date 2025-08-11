import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService,getAllTeamLeads } from '../../../services/user.service';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
@Component({
  selector: 'app-edit-team-dialog',
  standalone: false,
  templateUrl: './edit-team-dialog.component.html',
  styleUrl: './edit-team-dialog.component.css',
})
export class EditTeamDialogComponent {
  allTeamLeads: any = [];
  editTeamForm!: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditTeamDialogComponent>,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    // console.log(data.id)
  }

  ngOnInit(): void {
    this.editTeamForm = this.fb.group({
      name: ['', Validators.required],
      teamLeadUserId: ['', Validators.required],
    })



    console.log(this.data.id);
    this.getAllTeamLeads();
  }

  getAllTeamLeads() {
    this.userService.getAllTeamLeads().subscribe({
      next: (data) => {
        this.allTeamLeads = data;
        console.log(data);
      },
    })
  }

  closeModal() {
    this.dialogRef.close();
  }
}
