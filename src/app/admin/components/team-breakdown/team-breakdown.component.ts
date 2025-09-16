import { Component, OnInit } from '@angular/core';
import { UserService, getATeamsData, getATeam } from '../../../services/user.service';
import { ActivatedRoute } from '@angular/router';

interface MemberProgress {
  name: string;
  submitted: number;
  total: number;
}

@Component({
  selector: 'app-team-breakdown',
  templateUrl: './team-breakdown.component.html',
  styleUrls: ['./team-breakdown.component.css'],
  standalone: false,
})
export class TeamBreakdownComponent implements OnInit {
  teamName = '';
  dueDate = '';
  teamLeadName = '';

  teamLead: MemberProgress = {
    name: '',
    submitted: 0,
    total: 0,
  };

  members: MemberProgress[] = [];
  searchTerm = '';
  currentPage = 1;
  itemsPerPage = 10;

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    const teamId = this.route.snapshot.paramMap.get('teamId');
    if (teamId) {
      this.loadTeamData(teamId);
    }
  }

  loadTeamData(teamId: string): void {
    this.userService.getATeam(teamId, 1, '', 100,).subscribe({
      next: (res: getATeam) => {
        const team = res.team;
        this.teamName = team.name;
        this.teamLeadName = team.teamLeadName;
        this.dueDate = ''; // You can populate this when it's available in API

        const membersData: getATeamsData[] = team.teamMembers?.data || [];

        this.members = membersData.map((m) => ({
          name: m.memberName,
          submitted: m.totalClientsSubmitted,
          total: m.target || 0,
        }));

        const totalSubmitted = this.members.reduce((sum, m) => sum + m.submitted, 0);
        const totalTarget = this.members.reduce((sum, m) => sum + m.total, 0);

        this.teamLead = {
          name: this.teamLeadName,
          submitted: totalSubmitted,
          total: totalTarget,
        };
      },
      error: (err) => {
        console.error('Failed to fetch team data:', err);
      },
    });
  }

  getProgress(submitted: number, total: number): number {
    return total === 0 ? 0 : Math.round((submitted / total) * 1000) / 10;
  }

  get filteredMembers(): MemberProgress[] {
    return this.members.filter((m) =>
      m.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get paginatedMembers(): MemberProgress[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredMembers.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredMembers.length / this.itemsPerPage);
  }

  get totalPagesArray(): number[] {
    return Array(this.totalPages)
      .fill(0)
      .map((_, i) => i + 1);
  }

  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getMin(a: number, b: number): number {
    return Math.min(a, b);
  }

  onBackArrow(): void {
    window.history.back();
  }

  exportData(): void {
    const headers = ['Name', 'Current Target', 'Total Clients Onboarded', '% Progress', 'Target Due Date'];
    const rows = this.filteredMembers.map((m) => [
      m.name,
      m.total,
      m.submitted,
      this.getProgress(m.submitted, m.total) + '%',
      this.dueDate,
    ]);
    const csvContent = [headers, ...rows].map((row) => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${this.teamName}-progress.csv`);
    link.click();
  }
}
