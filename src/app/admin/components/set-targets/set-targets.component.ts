

import {
  Component,
  EventEmitter,
  Output,
  TemplateRef,
  ViewChild,
  OnInit,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { UserService } from '../../../services/user.service';

interface Team {
  teamId: string;
  teamName: string;
  teamLead: string;
  members: number;
  currentTarget?: number;
  dueDate?: string;
}
export interface TeamSummary {
  teamId: string;
  teamName: string;
  teamLeadName: string;
  numberOfTeamMembers: number;
  teamTarget: number;
  dueDate: string;
  startDate: string;
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
export class SetTargetsComponent implements OnInit {
  @Output() onCancel = new EventEmitter<void>();

  isOpenOverview = false;
  isTargetAssign = false;
  isLoading = false;

  searchTerm = '';
  currentPage = 1;
  limit = 6;
  limitOptions = [6, 10, 20, 50];

  teamName = '';
  teamId = '';
  targetValue: number | null = null;
  dueDate = '';
  startDate = '';

  allTeams: Team[] = [];
  filteredTeams: Team[] = [];

  @ViewChild('targetDialog') targetDialog!: TemplateRef<any>;
  @ViewChild('confirmDialog') confirmDialog!: TemplateRef<any>;
  @ViewChild('successDialog') successDialog!: TemplateRef<any>;

  targetDialogRef: any;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private http: HttpClient,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.fetchTeamsFromBackend();
  }

  fetchTeamsFromBackend() {
    this.userService.getAllTeamsWithDetails('', '').subscribe({
      next: (teams: any[]) => {
        this.allTeams = teams.map((team) => ({
          teamId: team.teamId ?? '', // fallback if missing
          teamName: team.teamName,
          teamLead: team.teamLeadName,
          members: team.numberOfTeamMembers,
          currentTarget: team.teamTarget,
          dueDate: team.dueDate,
        }));
        this.filteredTeams = [...this.allTeams];
      },
      error: (err) => {
        console.error('Failed to fetch teams:', err);
        alert('Failed to load teams from backend.');
      },
    });
  }

  applyFilter() {
    const term = this.searchTerm.toLowerCase();
    this.filteredTeams = this.allTeams.filter((team) =>
      team.teamName.toLowerCase().includes(term)
    );
    this.currentPage = 1;
  }

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

  exportData() {
    const headers = [
      'Team Name',
      'Team Lead Name',
      'No. of Members',
      'Current Target',
      'Target Due Date',
    ];

    const rows = this.filteredTeams.map((row) => [
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

  openTargetModal(team: Team) {
    this.teamName = team.teamName;
    this.teamId = team.teamId;
    this.targetValue = team.currentTarget ?? null;
    this.dueDate = team.dueDate ?? '';
    this.startDate = '';
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
    if (!this.targetValue || !this.dueDate || !this.startDate) {
      alert('Please fill in all fields: target value, start date, and due date.');
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

  cancel() {
    this.onCancel.emit();
  }

  onBackArrow(type: string): void {
    if (type === 'dashboard') {
      this.router.navigate(['/admin/dashboard']);
    }
  }

  onLimitChange(newLimit: number) {
    this.limit = newLimit;
    this.currentPage = 1;
  }
}
