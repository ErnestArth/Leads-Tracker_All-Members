import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
// import {Chart, registerables} from 'chart.js';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddTeamMemberPopupComponent } from '../add-team-member-popup/add-team-member-popup.component';
import { AddTeamLeadPopupComponent } from '../add-team-lead-popup/add-team-lead-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { getAllTeamMembers, UserService } from '../../../services/user.service';
@Component({
  selector: 'app-team-member',
  standalone: false,
  templateUrl: './team-member.component.html',
  styleUrl: './team-member.component.css',
})
export class TeamMemberComponent {
  progressColor: string = '';
  progressTextColor:string='';
  progressOutlineColor:string='';

  allTeamMembers: any;

  currentPage = 0;
  totalPages = 3;
  totalItems = 12;
  limit = 5;
  hasNext = false;
  hasPrevious = false;

  searchTerm=""
  allTeams:any=[]
  selectedTeam=""
  constructor(private dialog: MatDialog, private userService: UserService) {}

  // progressColorCode(){
  //   this.allTeamMembers.forEach((member) => {
  //     if (member.progressPercentage >= 80) {

  //       member.progressColor = 'progress-green';
  //       member.progressTextColor='text-green';
  //       member.progressOutlineColor='green-outline';

      

  //     } else if (member.progressPercentage >=50 ) {

  //       member.progressColor = 'progress-yellow';
  //       member.progressTextColor='text-yellow';
  //       member.progressOutlineColor='yellow-outline';
  //       console.log(member.teamName)

  //     }else if(member.progressPercentage < 50){
  //       member.progressColor ='progress-red';
  //       member.progressTextColor='text-red';
  //       member.progressOutlineColor='red-outline';
  //       // console.log(team.teamName)
        
  //     }
      
  //   })
  
  // }
  ngOnInit(): void {
    // this.userService.getAllTeamMembers().subscribe({
    //   next: (data) => {
    //     console.log(data);
    //     this.allTeamMembers = data;
    //     this.progressColorCode();
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });

    this.fetchAllTeamMembers(this.currentPage);
    this.fetchAllTeams();
  }

  fetchAllTeamMembers(page:number){
    this.userService.getAllTeamMembers(page,this.limit,this.searchTerm,this.selectedTeam).subscribe({
      next: (data) => {
        console.log(data);
        this.allTeamMembers = data.data;
        // ernest will have to paginate this endpooint so that i will
        // assign the total pages and total items etc!
        // this.progressColorCode();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  fetchAllTeams(){
    this.userService.getAllTeams(this.searchTerm,"").subscribe({
      next: (data) => {
        this.allTeams=data
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

  onLimitChange(newLimit: number): void {
    
    this.limit = newLimit; // convert to number
    this.currentPage = 1;
    this.fetchAllTeamMembers(this.currentPage);
  }

  onSearchTeamMember(){
    console.log(this.searchTerm)
    if(this.searchTerm.length >= 3){
      this.fetchAllTeamMembers(this.currentPage)
    }else if (this.searchTerm.length == 0) {
      this.fetchAllTeamMembers(this.currentPage)
    }
    
  }
  onTeamChange(event:Event){
    this.selectedTeam = (event.target as HTMLSelectElement).value;
    console.log(this.selectedTeam);
    if(this.selectedTeam === "All Teams"){
      this.selectedTeam = ""
      this.fetchAllTeamMembers(this.currentPage);
    }else{
      this.fetchAllTeamMembers(this.currentPage);
    }
    

  }
  addTeamMember() {
    this.openAddTeamMemberDialog(0, 'Create Team Member');
  }

  openAddTeamMemberDialog(id: any, title: any) {
    const popup = this.dialog.open(AddTeamMemberPopupComponent, {
      width: '500px',
      data: {
        title: title,
        id: id,
      },
    });
  }

  addTeamLead() {
    this.openAddTeamLeadDialog(0, 'Create Team Lead');
  }

  openAddTeamLeadDialog(id: any, title: any) {
    const addLeadPopup = this.dialog.open(AddTeamLeadPopupComponent, {
      width: '500px',
      data: {
        title: title,
        id: id,
      },
    });
  }
}
