import {
  Component,
  Output,
  EventEmitter,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

interface Team {
  teamName: string;
  teamLead: string;
  members: number;
  currentTarget?: number;
  dueDate?: string;
}

@Component({
  selector: 'app-set-targets',
  templateUrl: './set-targets.component.html',
  standalone: false,
  styleUrls: ['./set-targets.component.css'],
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
  clientHasNext = false;
  clientHasPrevious = false;

  // Target Form Fields
  teamName = '';
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
      teamName: 'Alpha Squad',
      teamLead: 'Paul Wilbur',
      members: 22,
      currentTarget: 100,
      dueDate: '2025-08-31',
    },
    {
      teamName: 'Bravo Team',
      teamLead: 'Nancy Kyei',
      members: 23,
      currentTarget: 120,
      dueDate: '2025-08-31',
    },
    {
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

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private userService: UserService
  ) {
    this.filteredTeams = [...this.allTeams];
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

  // === CSV Export ===
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
    if (!this.targetValue || !this.dueDate || !this.startDate) return;

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
    const selectedTeam = this.allTeams.find((t) => t.teamName === this.teamName);
    if (!selectedTeam) return;

    this.isLoading = true;

    this.userService
      .assignTeamTarget(selectedTeam.teamName, this.targetValue!, this.dueDate)
      .subscribe({
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

  resetForm() {
    this.targetValue = null;
    this.dueDate = '';
    this.startDate = '';
    this.teamName = '';
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

  // === Placeholder Method (for future integration) ===
  clientFetchAllClients(page: number, searchTerm?: string, statusFilter?: string, durationFilter?: string) {
    console.log('Fetching clients for page:', page, 'with searchTerm:', searchTerm);
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
