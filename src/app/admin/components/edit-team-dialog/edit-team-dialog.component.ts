import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-team-dialog',
  standalone: false,
  templateUrl: './edit-team-dialog.component.html',
  styleUrl: './edit-team-dialog.component.css'
})
export class EditTeamDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
private dialogRef: MatDialogRef<EditTeamDialogComponent>) { 
  // console.log(data.id)
}

ngOnInit(): void {
  console.log(this.data.id)
}



closeModal(){
  this.dialogRef.close();
}
}
