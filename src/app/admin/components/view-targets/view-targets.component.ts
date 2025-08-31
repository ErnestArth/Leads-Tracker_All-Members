import { Component, OnInit } from '@angular/core';
import { TeamTarget, UserService } from '../../../services/user.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-view-targets',
  templateUrl: './view-targets.component.html',
  styleUrls: ['./view-targets.component.css'],
  standalone: false,
})
export class ViewTargetsComponent implements OnInit {
  selectedFrequency = 'Quarterly';
  searchTerm = '';
  currentPage = 1;
  itemsPerPage = 10;
  clientCurrentPage = 1;
  clientTotalPages = 3;
  clientTotalItems = 12;
  clientLimit = 6;
  clientHasNext = false;
  clientHasPrevious = false;
  teams: TeamTarget[] = [];
  isLoading = false;
  errorMessage = '';
  limit = 6;
  limitOptions = [6, 10, 20, 50];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchTeamTarget();
  }

  fetchTeamTarget(): void {
    this.isLoading = true;
    this.userService
      .getTeamTargets()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (data: TeamTarget[]) => {
          this.teams = data;
        },
        error: (err: any) => {
          this.errorMessage = err?.error?.message || 'Failed to load targets.';
        },
      });
  }

  get filteredData(): TeamTarget[] {
    return this.teams.filter((team) =>
      team.teamName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get paginatedData(): TeamTarget[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredData.slice(start, end);
  }

  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  get totalPages(): number {
    return Math.ceil(this.filteredData.length / this.itemsPerPage);
  }

  getProgress(submitted: number, target: number): number {
    return Math.min((submitted / target) * 100, 100);
  }

  getMin(a: number, b: number): number {
    return Math.min(a, b);
  }

  onBackArrow(): void {
    window.history.back();
  }

  exportData(): void {
    const headers = [
      'Team Name',
      'Team Lead Name',
      'Current Target',
      'Total Clients Onboarded',
      'Target Start Date',
      'Target Due Date',
    ];

    const rows = this.filteredData.map((team) => [
      team.teamName,
      team.teamLeadFullName || 'N/A',
      team.targetValue,
      team.totalClientsOnboarded,
      team.startDate,
      team.dueDate,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'team-targets.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  clientFetchAllClients(
    page: number,
    searchTerm?: string,
    statusFilter?: string,
    durationFilter?: string
  ): void {
    console.log(
      'Fetching clients for page:',
      page,
      'with searchTerm:',
      searchTerm
    );
  }

  onLimitChange(newLimit: number): void {
    this.limit = newLimit;
    this.currentPage = 1;
    this.clientFetchAllClients(this.currentPage, this.searchTerm);
  }

  onLimitChangess(newLimit: number): void {
    this.limit = newLimit;
    this.clientCurrentPage = 1;
    this.clientFetchAllClients(this.currentPage);
  }
}
