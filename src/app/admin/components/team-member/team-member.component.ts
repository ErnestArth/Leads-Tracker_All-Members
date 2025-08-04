
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
// import {Chart, registerables} from 'chart.js';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddTeamMemberPopupComponent } from '../add-team-member-popup/add-team-member-popup.component';
import { AddTeamLeadPopupComponent } from '../add-team-lead-popup/add-team-lead-popup.component';
import { MatDialog } from '@angular/material/dialog';
import {getAllTeamMembers, UserService} from '../../../services/user.service'
@Component({
  selector: 'app-team-member',
  standalone: false,
  templateUrl: './team-member.component.html',
  styleUrl: './team-member.component.css'
})
export class TeamMemberComponent  {

  allTeamMembers: getAllTeamMembers[] = []
  
  constructor(private dialog: MatDialog , private userService:UserService) {}

 


  ngOnInit(): void {
    this.userService.getAllTeamMembers().subscribe({
      next: (data) => {
        console.log(data)
        this.allTeamMembers = data
      },
      error: (err)=>{
        console.log(err)
      }
    })
  }

  addTeamMember() {
    this.openAddTeamMemberDialog(0, "Create Team Member");
  }

  openAddTeamMemberDialog(id:any , title:any){
   const popup= this.dialog.open(AddTeamMemberPopupComponent,{
      width: "500px",
      data:{
        title:title,
        id:id
      }
    });
  }

  addTeamLead() {
    this.openAddTeamLeadDialog(0, "Create Team Lead");
  }

  openAddTeamLeadDialog(id:any , title:any){
    const addLeadPopup= this.dialog.open(AddTeamLeadPopupComponent,{
       width: "500px",
       data:{
         title:title,
         id:id
       }
     });
   }
}
