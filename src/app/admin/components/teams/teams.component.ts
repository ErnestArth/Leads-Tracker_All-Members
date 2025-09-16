import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { Component, TemplateRef, ViewChild, viewChild } from '@angular/core';
import { CreateTeamLeadComponent } from '../../crete-team-lead/create-team-lead.component';
import { ComponentPortal } from '@angular/cdk/portal';
import { ModalService } from '../../../services/modalService';
import { UserService, getAllTeamLeads, getAllTeamTeamMembers, getAllTeams } from '../../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { EditTeamModalComponent } from '../edit-team-modal/edit-team-modal.component';
import { EditTeamDialogComponent } from '../edit-team-dialog/edit-team-dialog.component';
import { AddTeamDialogComponent } from '../add-team-dialog/add-team-dialog.component';
import { ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  teamMembers:getAllTeamTeamMembers[]=[]
  showAdditionalMembers= false;
  searchTeamName=""
  teamFilter=""

  errorMessage = 'oops Something went wrong';

  @ViewChild('addTeamDialog') addTeamDialog!: TemplateRef<any>;
  addTeamForm: any;
  areChangesSaved: boolean =false;
  teamAdded: any;
  isThereError: boolean=false
  showAddTeamDialog: any;

  constructor(private modal: ModalService,
    private userService: UserService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef) {}
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
        if(team.progressPercentage >= 100){
          team.progressPercentageColor='text-white';
        }else{
          team.progressPercentageColor='text-green';
        }

        team.progressColor = 'progress-green';
        team.progressTextColor='text-green';
        team.progressOutlineColor='green-outline';



      } else if (team.progressPercentage >=50 ) {

        team.progressColor = 'progress-yellow';
        team.progressTextColor='text-yellow';
        team.progressOutlineColor='yellow-outline';
        console.log(team.teamName)

      }else if(team.progressPercentage <= 50){
        team.progressColor ='progress-red';
        team.progressTextColor='text-red';
        team.progressOutlineColor='red-outline';
        // console.log(team.teamName)

      }

    })

  }

  getAllteams(){
    this.userService.getAllTeams(this.searchTeamName,this.teamFilter).subscribe({
      next: (data) => {
        this.allTeams = data;
        this.allTeams.forEach((team) => {
          this.teamMembers=team.teamMembers

        })
        this.cdr.detectChanges();
        this.progressColorCode()


      },
    });
  }

  ngOnInit(): void {

    this.addTeamForm = this.fb.group({
      name: ['', Validators.required],
      // teamLeadUserId: ['', Validators.required],
    })

    this.getAllteams();




  }

  onSearchTeams(){
    console.log(this.searchTeamName)
    if(this.searchTeamName.length>=3){
      this.getAllteams();
    }else if(this.searchTeamName.length==0){
      this.getAllteams();

    }

  }



   visibleMembers(members:any[]){
    return members ? members.slice(0, 3) : [];

  }

  remainingMembers(members:any[]){
    // if(member.length>3){
    //   this.showAdditionalMembers=true;
    //   console.log(this.showAdditionalMembers)
    // }

    // return member && member.length > 2 ? member.length - 2 : "";

    if (members && members.length > 3) {
      this.showAdditionalMembers = true;
      // console.log(this.showAdditionalMembers);
      return members.length - 3;

    }else{
      this.showAdditionalMembers=false
      return "";

    }

  }

  openEditTeam(teamId: any){
   const editTeamDialog= this.dialog.open(EditTeamDialogComponent,{
      width: '1200px',
      data:{
        title: 'Edit Team',
        id:teamId

      }
    })
    editTeamDialog.componentInstance.teamEdited.subscribe((data)=>{
      if(data){
        this.getAllteams();
      }
    })

  }

  // this  open a modal in a different component
  // no more using it
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

  //ends here
  //show Add Team is being used now

  showAddTeam(){
   this.showAddTeamDialog= this.dialog.open(this.addTeamDialog,{
      width: '600px',
      data: {
        title: 'Add Team'
      }
    });
  }

  onAddTeamSubmit() {
    console.log(this.addTeamForm.value);
    this.userService.addTeam(this.addTeamForm.value).subscribe({
      next: (data) => {
        console.log(data);
        this.areChangesSaved = true;
        this.getAllteams();
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
      this.showAddTeamDialog.close();
    }


}
