import { Component } from '@angular/core';
import { UserService, getAllTeamLeads } from '../../../services/user.service';
import { AddTeamMemberPopupComponent } from '../add-team-member-popup/add-team-member-popup.component';
import { AddTeamLeadPopupComponent } from '../add-team-lead-popup/add-team-lead-popup.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-team-lead',
  standalone: false,
  templateUrl: './team-lead.component.html',
  styleUrl: './team-lead.component.css',
})
export class TeamLeadComponent {
  progressColor: string = '';
  progressTextColor:string='';
  progressOutlineColor:string='';

  allTeamLeads: any
  searchTeamLead=""
  teamFilter=""
  allTeams:any
  
  

  currentPage = 0;
  totalPages = 3;
  totalItems = 12;
  limit = 5;
  hasNext = false;
  hasPrevious = false;

  constructor(private userService: UserService, private dialog: MatDialog) {}

  // progressColorCode(){
  //   this.allTeamLeads.forEach((teamLead) => {
  //     if (teamLead.progressPercentage >= 80) {

  //       teamLead.progressColor = 'progress-green';
  //       teamLead.progressTextColor='text-green';
  //       teamLead.progressOutlineColor='green-outline';

      

  //     } else if (teamLead.progressPercentage >=50 ) {

  //       teamLead.progressColor = 'progress-yellow';
  //       teamLead.progressTextColor='text-yellow';
  //       teamLead.progressOutlineColor='yellow-outline';

  //     }else {
  //       teamLead.progressColor ='progress-red';
  //       teamLead.progressTextColor='text-red';
  //       teamLead.progressOutlineColor='red-outline';
  //     }
      
  //   })
  
  // }
  ngOnInit(): void {
    // this.userService.getAllTeamLeads().subscribe({
    //   next: (data) => {
    //     this.allTeamLeads = data;
    //     console.log(this.allTeamLeads);
    //     this.progressColorCode();
    //   },
    // });
    this.fetchAllTeams();
    this.fetchAllTeamLeads(this.currentPage);
  }

  fetchAllTeamLeads(page:number){
    this.userService.getAllTeamLeads(page,this.limit,this.searchTeamLead,this.teamFilter).subscribe({
      next: (data) => {
        console.log(data.data);
        this.allTeamLeads = data.data;
         // ernest will have to paginate this endpooint so that i will
        // assign the total pages and total items etc!
        
        // this.progressColorCode();
      },
    });
  }

  fetchAllTeams(){
    this.userService.getAllTeams("",this.teamFilter).subscribe({
      next: (data) => {
        this.allTeams=data
        console.log(data)
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

  onLimitChange(newLimit: number): void {
    
    this.limit = newLimit; // convert to number
    this.currentPage = 0;
    this.fetchAllTeamLeads(this.currentPage);
  }

  onSearchTeamLead(event: Event) {

    if(this.searchTeamLead.length>=3){
      this.fetchAllTeamLeads(this.currentPage) 
    }else if(this.searchTeamLead.length == 0){
      this.fetchAllTeamLeads(this.currentPage)
    }


  }

  onTeamsChange(event:Event){
    this.teamFilter= (event.target as HTMLSelectElement).value;

    if (this.teamFilter === "All Teams") {
      this.teamFilter = "";
      this.fetchAllTeamLeads(this.currentPage);
    }else{
      this.fetchAllTeamLeads(this.currentPage);
    console.log(this.teamFilter); 
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
