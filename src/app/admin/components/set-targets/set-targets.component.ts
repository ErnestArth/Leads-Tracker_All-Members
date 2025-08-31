import {
  Component,
  EventEmitter,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

interface Team {
  teamId: string;
  teamName: string;
  teamLead: string;
  members: number;
  currentTarget?: number;
  dueDate?: string;
}

interface AssignTeamTargetRequest {
  teamId: string;
  targetValue: number;
  startDate: string;
  dueDate: string;
}

@Component({
  selector: 'app-set-targets',
  templateUrl: './set-targets.component.html',
  styleUrls: ['./set-targets.component.css'],
  standalone: false,
})
export class SetTargetsComponent {
  @Output() onCancel = new EventEmitter<void>();

  // Dialog and UI States
  isOpenOverview = false;
  isTargetAssign = false;
  isLoading = false;

  clientCurrentPage = 1;
  clientTotalPages = 3;
  clientTotalItems = 12;
  clientLimit = 6;

  // Target Form Fields
  teamName = '';
  teamId = '';
  targetValue: number | null = null;
  dueDate = '';
  startDate = '';

  // Search & Pagination
  searchTerm = '';
  currentPage = 1;
  limit = 6;
  limitOptions = [6, 10, 20, 50];
  filteredTeams: Team[] = [];

  allTeams: Team[] = [
    {
      teamId: 'team-001',
      teamName: 'Alpha Squad',
      teamLead: 'Paul Wilbur',
      members: 22,
      currentTarget: 100,
      dueDate: '2025-08-31',
    },
    {
      teamId: 'team-002',
      teamName: 'Bravo Team',
      teamLead: 'Nancy Kyei',
      members: 23,
      currentTarget: 120,
      dueDate: '2025-08-31',
    },
    {
      teamId: 'team-003',
      teamName: 'Charlie Unit',
      teamLead: 'John Doe',
      members: 18,
      currentTarget: 120,
      dueDate: '2025-09-21',
    },
  ];

  @ViewChild('targetDialog') targetDialog!: TemplateRef<any>;
  @ViewChild('confirmDialog') confirmDialog!: TemplateRef<any>;
  @ViewChild('successDialog') successDialog!: TemplateRef<any>;

  targetDialogRef: any;

  constructor(private dialog: MatDialog, private router: Router, private http: HttpClient) {
    this.filteredTeams = [...this.allTeams];
  }

  // === Form Validation ===
  isFormValid(): boolean {
    return (
      this.targetValue !== null &&
      this.dueDate !== '' &&
      this.startDate !== '' &&
      this.targetValue > 0
    );
  }

  // === Search / Filter ===
  applyFilter() {
    const term = this.searchTerm.toLowerCase();
    this.filteredTeams = this.allTeams.filter((team) =>
      team.teamName.toLowerCase().includes(term)
    );
    this.currentPage = 1;
  }

  // === Pagination ===
  get paginatedData(): Team[] {
    const start = (this.currentPage - 1) * this.limit;
    const end = start + this.limit;
    return this.filteredTeams.slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredTeams.length / this.limit);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // === Export CSV ===
  exportData() {
    const headers = [
      'Team Name',
      'Team Lead Name',
      'No. of Members',
      'Current Target',
      'Target Due Date',
    ];

    const rows = this.paginatedData.map((row) => [
      row.teamName,
      row.teamLead,
      row.members,
      row.currentTarget ?? 'N/A',
      row.dueDate ?? 'N/A',
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map(String).map((val) => `"${val}"`).join(','))
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

  // === Target Modal ===
  openTargetModal(team: Team) {
    this.teamName = team.teamName;
    this.teamId = team.teamId;
    this.dialog.closeAll();
    this.targetDialogRef = this.dialog.open(this.targetDialog, {
      width: '600px',
      disableClose: true,
    });
  }

  closeTargetModal() {
    if (this.targetDialogRef) {
      this.targetDialogRef.close();
      this.targetDialogRef = null;
    }
    this.resetForm();
  }

  saveTarget() {
    if (!this.isFormValid()) {
      alert('Please fill in all fields correctly.');
      return;
    }

    this.closeTargetModal();

    this.dialog
      .open(this.confirmDialog, {
        width: '600px',
        disableClose: true,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === 'confirm') {
          this.assignTarget();
        }
      });
  }

  cancelDialog() {
    this.dialog.closeAll();
  }

  assignTarget() {
    const selectedTeam = this.allTeams.find((t) => t.teamId === this.teamId);
    if (!selectedTeam) return;

    this.isLoading = true;

    const request: AssignTeamTargetRequest = {
      teamId: selectedTeam.teamId,
      targetValue: this.targetValue!,
      startDate: new Date(this.startDate).toISOString(),
      dueDate: new Date(this.dueDate).toISOString(),
    };

    this.sendAssignTeamTarget(request).subscribe({
      next: () => {
        selectedTeam.currentTarget = this.targetValue!;
        selectedTeam.dueDate = this.dueDate;
        this.isLoading = false;

        this.dialog
          .open(this.successDialog, {
            width: '600px',
            disableClose: true,
          })
          .afterClosed()
          .subscribe(() => {
            this.router.navigate(['/dashboard']);
          });

        this.resetForm();
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Failed to assign target:', err);
        alert(err?.error?.message || 'Failed to assign target. Please try again.');
      },
    });
  }

  sendAssignTeamTarget(data: AssignTeamTargetRequest): Observable<any> {
    return this.http.post('/leads-tracker/api/v1/leads/assign/team-target', data);
  }

  resetForm() {
    this.targetValue = null;
    this.dueDate = '';
    this.startDate = '';
    this.teamName = '';
    this.teamId = '';
  }

  // === Navigation / Events ===
  cancel() {
    this.onCancel.emit();
  }

  onBackArrow(type: string): void {
    if (type === 'dashboard') {
      this.router.navigate(['/admin/dashboard']);
    }
  }

  // Placeholder for client pagination
  clientFetchAllClients(page: number, searchTerm?: string, statusFilter?: string, durationFilter?: string) {
    console.log('Fetching clients for page:', page, 'with searchTerm:', searchTerm);
    // You can make an HTTP request here to fetch the clients based on filters and page number.
    // This will typically be a call to a service, for example:
    // return this.http.get(`/api/clients`, { params: { page, searchTerm } });
  }

  onLimitChange(newLimit: number): void {
    this.limit = newLimit;
    this.currentPage = 1;
    this.clientFetchAllClients(this.currentPage, this.searchTerm);
  }

  onLimitChangess(newLimit: number): void {
    this.limit = newLimit;
    this.clientCurrentPage = 1;
    this.clientFetchAllClients(this.clientCurrentPage);
  }
}
