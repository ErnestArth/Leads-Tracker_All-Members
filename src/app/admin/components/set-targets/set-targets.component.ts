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
  name: string;
  lead: string;
  members: number;
  currentTarget?: number;
  dueDate?: string;
}

@Component({
  selector: 'app-set-targets',
  templateUrl: './set-targets.component.html',
  styleUrls: ['./set-targets.component.css'],
  standalone: false,
})
export class SetTargetsComponent {
  @Output() onCancel = new EventEmitter<void>();

  isTargetAssign = false;
  isOpenOverview = false;
  teamName: string = 'Alpha Squad';
  targetValue: number | null = null;
  dueDate: string = '';

  isLoading = false; // <-- Optional: Show spinner or disable button

  teams: Team[] = [
    {
      name: 'Alpha Squad',
      lead: 'Paul Wilbur',
      members: 22,
      currentTarget: 100,
      dueDate: '2025-08-31',
    },
    {
      name: 'Bravo Team',
      lead: 'Nancy Kyei',
      members: 23,
      currentTarget: 120,
      dueDate: '2025-08-31',
    },
    {
      name: 'Charlie Unit',
      lead: 'John Doe',
      members: 18,
    },
  ];

  @ViewChild('targetDialog') targetDialog!: TemplateRef<any>;
  @ViewChild('confirmDialog') confirmDialog!: TemplateRef<any>;
  @ViewChild('successDialog') successDialog!: TemplateRef<any>;

  targetDialogRef: any;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private UserService: UserService
  ) {}

  cancel() {
    this.onCancel.emit();
  }

 openTargetModal(team: Team) {
  this.teamName = team.name;
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

    this.targetValue = null;
    this.dueDate = '';
  }

  saveTarget() {
    if (!this.targetValue || !this.dueDate) {
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

  assignTarget() {
    const selectedTeam = this.teams.find((t) => t.name === this.teamName);
    if (!selectedTeam) {
      console.error('Team not found');
      return;
    }

    const payload = {
      teamId: selectedTeam.name,
      targetValue: this.targetValue!,
      dueDate: this.dueDate,
    };

    this.isLoading = true;

    this.UserService.assignTeamTarget(payload.teamId, payload.targetValue, payload.dueDate).subscribe({
      next: () => {
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

        this.targetValue = null;
        this.dueDate = '';
      },
      error: (err:any) => {
        this.isLoading = false;
        console.error('Failed to assign target:', err);
        alert(err?.error?.message || 'Failed to assign target. Please try again.');
      },
    });
  }

  onTargetAssign() {
    this.isTargetAssign = !this.isTargetAssign;
  }

  onBackArrow(type: string): void {
    this.isOpenOverview = this.isOpenOverview;
  }
}
