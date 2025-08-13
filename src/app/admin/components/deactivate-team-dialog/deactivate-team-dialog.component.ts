import { Component, Inject } from '@angular/core';
import{ MatDialogRef,MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from "../../../services/user.service";
import {Router} from '@angular/router';
@Component({
  selector: 'app-deactivate-team-dialog',
  standalone: false,
  templateUrl: './deactivate-team-dialog.component.html',
  styleUrl: './deactivate-team-dialog.component.css'
})
export class DeactivateTeamDialogComponent {
  isTeamDeactivated = false;
  isThereError = false;
  errorMessage ="oops something went wrong";
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DeactivateTeamDialogComponent>,
    private userService: UserService,
    private router: Router
){
  
}

ngOnInit() {
  
}
  
  onTeamDeactivation() {
    this.userService.deactivateTeam(this.data.teamId).subscribe({
      next: (data) => {
        console.log(data);
        this.isTeamDeactivated = !this.isTeamDeactivated;
      },error: (err) => {
        console.log(err.message);
        this.isThereError = true;
      }
    });
    
  }

  closeModal(){
    this.dialogRef.close();
  }
  routeToTeams(){
    this.dialogRef.close();
    this.router.navigate(['/admin/teams']);
  }
}
