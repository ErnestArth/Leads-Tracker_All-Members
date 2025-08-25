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
  isOpenOverview = false;
  selectedFrequency = 'Quarterly';

  teams: TeamTarget[] = [];
  isLoading = false;
  errorMessage = '';

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
        next: (data:any) => {
          this.teams = data;
        },
        error: (err:any) => {
          this.errorMessage = err?.error?.message || 'Failed to load targets.';
        },
      });
  }

  getProgress(submitted: number, target: number): number {
    return (submitted / target) * 100;
  }

  onBackArrow(type: string): void {
    this.isOpenOverview = this.isOpenOverview;
  }
}
