import { Component, Output, EventEmitter } from '@angular/core';

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
  standalone : false
})
export class SetTargetsComponent {
    @Output() onCancel = new EventEmitter<void>();
  isTargetAssign = false;

  teamName = 'Alpha Squad';
  targetValue: number | null = null;
  dueDate: string = '';
  showTargetModal = false;
  teams: Team[] = [
    {
      name: 'Alpha Squad',
      lead: 'Paul Wilbur',
      members: 22,
      currentTarget: 100,
      dueDate: '2025-08-31'
    },
    {
      name: 'Bravo Team',
      lead: 'Nancy Kyei',
      members: 23,
      currentTarget: 120,
      dueDate: '2025-08-31'
    },
    {
      name: 'Charlie Unit',
      lead: 'John Doe',
      members: 18
    }
  ];
  cancel(){
    this.onCancel.emit();
  }
  openTargetModal() {
    this.showTargetModal = true;
  }

  closeTargetModal() {
    this.showTargetModal = false;
    this.targetValue = null;
    this.dueDate = '';
  }

  saveTarget() {
    if (this.targetValue && this.dueDate) {
      console.log(`Saved:`, {
        team: this.teamName,
        target: this.targetValue,
        dueDate: this.dueDate
      });
      this.closeTargetModal();
    }
  }
   onTargetAssign() {
    this.isTargetAssign = !this.isTargetAssign;

  }
}




