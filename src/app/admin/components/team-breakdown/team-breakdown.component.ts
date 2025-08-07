import { Component } from '@angular/core';

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
export class TeamBreakdownComponent {
  isOpenViewTarget = false;
  dueDate = '2025-09-30';

  teamLead: MemberProgress = {
    name: 'Adwoa Mansah',
    submitted: 50,
    total: 80,
  };

  members: MemberProgress[] = [
    { name: 'Yaa Asantewaa', submitted: 50, total: 80 },
    { name: 'Yaa Asantewaa', submitted: 50, total: 80 },
    { name: 'Yaa Asantewaa', submitted: 50, total: 80 },
    { name: 'Yaa Asantewaa', submitted: 50, total: 80 },
  ];

  getPercentage(submitted: number, total: number): string {
    return ((submitted / total) * 100).toFixed(1) + '%';
  }
  onBackArrow(type: string): void {
    this.isOpenViewTarget = this.isOpenViewTarget;
  }
}
