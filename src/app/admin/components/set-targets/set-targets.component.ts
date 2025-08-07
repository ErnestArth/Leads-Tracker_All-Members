import {
  Component,
  Output,
  EventEmitter,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

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

  // Dialog template references
  @ViewChild('targetDialog') targetDialog!: TemplateRef<any>;
  @ViewChild('confirmDialog') confirmDialog!: TemplateRef<any>;
  @ViewChild('successDialog') successDialog!: TemplateRef<any>;

  targetDialogRef: any;

  constructor(private dialog: MatDialog, private router: Router) {}

  cancel() {
    this.onCancel.emit();
  }

  openTargetModal() {
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

    // Close the initial target dialog
    this.closeTargetModal();

    // Open confirm dialog
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
    // Simulate assignment logic
    console.log(`Assigned target to ${this.teamName}:`, {
      target: this.targetValue,
      dueDate: this.dueDate,
    });

    // Open success dialog
    this.dialog
      .open(this.successDialog, {
        width: '600px',
        disableClose: true,
      })
      .afterClosed()
      .subscribe(() => {
        this.router.navigate(['/dashboard']);
      });

    // Reset inputs
    this.targetValue = null;
    this.dueDate = '';
  }

  onTargetAssign() {
    this.isTargetAssign = !this.isTargetAssign;
  }

  onBackArrow(type: string): void {
    this.isOpenOverview = this.isOpenOverview;
  }
}
