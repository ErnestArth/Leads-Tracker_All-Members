import { Component } from '@angular/core';

@Component({
  selector: 'app-no-target',
  standalone: false,
  templateUrl: './no-target.component.html',
  styleUrl: './no-target.component.css'
})
export class NoTargetComponent {

  isOpenTeamBreakdown: boolean = false;
    onBackArrow(type: string): void {
    this.isOpenTeamBreakdown = !this.isOpenTeamBreakdown; // toggle open/close
  }
}
