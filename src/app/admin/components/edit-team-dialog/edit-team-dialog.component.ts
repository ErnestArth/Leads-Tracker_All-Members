import { Component, EventEmitter, Inject, Output } from '@angular/core';
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
  areChangesSaved = false

  page=0
  limit=20

  @Output() teamEdited = new EventEmitter<any>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditTeamDialogComponent>,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    console.log(data.id)
  }

  ngOnInit(): void {
    this.editTeamForm = this.fb.group({
      name: ['', Validators.required],
      // teamLeadUserId: ['', Validators.required],
    })


   this.getATeam()

    console.log(this.data.id);
    // this.getAllTeamLeads();
  }
  getATeam(){
    this.userService.getATeam(this.data.id).subscribe({
      next: (data) => {
      this.editTeamForm.patchValue(data.team)
        console.log(data);
      }
    })
  }
  // getAllTeamLeads() {
  //   this.userService.getAllTeamLeads(this.page,this.limit).subscribe({
  //     next: (data) => {
  //       this.allTeamLeads = data;
  //       console.log(data);
  //     },
  //   })
  // }

  onSubmit(){
    this.userService.updateTeam(this.editTeamForm.value,this.data.id).subscribe({
      next: (data)=>{
        console.log(data);
        this.teamEdited.emit(data)
        this.areChangesSaved = true
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  closeModal() {
    this.dialogRef.close();
  }
}
