import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { CreateTeamLeadComponent } from '../../crete-team-lead/create-team-lead.component';
import { ComponentPortal } from '@angular/cdk/portal';
import { ModalService } from '../../../services/modalService';
import { UserService, getAllTeamLeads, getAllTeams } from '../../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { EditTeamModalComponent } from '../edit-team-modal/edit-team-modal.component';
import { EditTeamDialogComponent } from '../edit-team-dialog/edit-team-dialog.component';
import { AddTeamDialogComponent } from '../add-team-dialog/add-team-dialog.component';
@Component({
  selector: 'app-teams',
  standalone: false,
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css',
})
export class TeamsComponent {
  activeModal: any;
  showOptionsDialog: boolean = false;
  progressColor: string = '';
  progressTextColor:string='';
  progressOutlineColor:string='';

  allTeams: getAllTeams[] = [];

  constructor(private modal: ModalService, 
    private userService: UserService,
    private dialog: MatDialog) {}
  openModal(
    type: 'addTeam' | 'editTeam' | 'deactivateTeam' | 'unassignedMembers'
  ) {
    if (type === 'addTeam') {
      this.activeModal = 'addTeam';
    } else if (type === 'editTeam') {
      this.activeModal = 'editTeam';
    } else if (type === 'unassignedMembers') {
      this.activeModal = 'unassignedMembers';
    } else if (type === 'deactivateTeam') {
      this.activeModal = 'deactivateTeam';
    }
    this.modal.openModal(this.activeModal);
  }

  // show Options Dialog

  // selectedTeam: string | null = null;

  // toggleOptionsDialog(team: string) {
  //   this.selectedTeam = this.selectedTeam === team ? null : team;
  // }

  // toggleOptionsDialog() {
  //   this.showOptionsDialog = !this.showOptionsDialog;
  // }
  // deactivateOptionsDialog() {
  //   this.showOptionsDialog = false;
  // }

  progressColorCode(){
    this.allTeams.forEach((team) => {
      if (team.progressPercentage >= 80) {

        team.progressColor = 'progress-green';
        team.progressTextColor='text-green';
        team.progressOutlineColor='green-outline';

      

      } else if (team.progressPercentage >=50 ) {

        team.progressColor = 'progress-yellow';
        team.progressTextColor='text-yellow';
        team.progressOutlineColor='yellow-outline';
        console.log(team.teamName)

      }else if(team.progressPercentage < 50){
        team.progressColor ='progress-red';
        team.progressTextColor='text-red';
        team.progressOutlineColor='red-outline';
        // console.log(team.teamName)
        
      }
      
    })
  
  }

  getAllteams(){
    this.userService.getAllTeams().subscribe({
      next: (data) => {
        this.allTeams = data;
        this.progressColorCode()
       
        
      },
    });
  }

  ngOnInit(): void {
    this.getAllteams();
  }

  openEditTeam(teamId: any){
    this.dialog.open(EditTeamDialogComponent,{
      width: '1200px',
      data:{
        title: 'Edit Team',
        id:teamId
        
      }
    })
    
  }
  openAddTeam(){
   const addTeamDialog= this.dialog.open(AddTeamDialogComponent,{
      width: '1200px',
      data:{
        title: 'Edit Team',
        
      }
    })
    addTeamDialog.componentInstance.teamAdded.subscribe((data) => {
        if(data){
            this.getAllteams()
        }
    })
  }
  
}
