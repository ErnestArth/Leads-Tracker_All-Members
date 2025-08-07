import { Component } from '@angular/core';
import { UserService, getAllTeamLeads } from '../../../services/user.service';

@Component({
  selector: 'app-team-lead',
  standalone: false,
  templateUrl: './team-lead.component.html',
  styleUrl: './team-lead.component.css',
})
export class TeamLeadComponent {
  allTeamLeads: getAllTeamLeads[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllTeamLeads().subscribe({
      next: (data) => {
        this.allTeamLeads = data;
        console.log(this.allTeamLeads);
      },
    });
  }
}
