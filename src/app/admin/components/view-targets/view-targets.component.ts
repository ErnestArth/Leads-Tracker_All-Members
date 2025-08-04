import { Component } from '@angular/core';

@Component({
  selector: 'app-view-targets',
  templateUrl: './view-targets.component.html',
  styleUrls: ['./view-targets.component.css'],
  standalone : false
})
export class ViewTargetsComponent {
  selectedFrequency = 'Quarterly';

  teams = Array(4).fill({
    name: 'Alpha Squad',
    lead: 'Paul Wilbur',
    target: 400,
    submitted: 330,
    setDate: '2025-08-30',
    dueDate: '2025-09-30'
  });

  getProgress(submitted: number, target: number): number {
    return (submitted / target) * 100;
  }
}
