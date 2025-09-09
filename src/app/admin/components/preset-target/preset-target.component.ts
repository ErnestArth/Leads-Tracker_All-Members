import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Team {
  name: string;
  lead: string;
}

@Component({
  selector: 'app-preset-target',
  standalone: false,
  templateUrl: './preset-target.component.html',
  styleUrls: ['./preset-target.component.css'] // Corrected
})
export class PresetTargetComponent {
  constructor(private router: Router) {}

  teams: Team[] = [
    { name: 'Alpha Squad', lead: 'Paul Wilbur' },
    { name: 'Bravo Team', lead: 'Nancy Kyei' },
    { name: 'Charlie Unit', lead: 'John Doe' }
  ];
  searchTerm = '';
  selectedTeam: Team | null = null;

  // Form fields
  targetValue: number | null = null;
  startDate: string = '';
  dueDate: string = '';

  /**
   * Handle team selection
   */
  selectTeam(team: Team): void {
    this.selectedTeam = team;

    // Reset form fields on selection
    this.targetValue = null;
    this.startDate = '';
    this.dueDate = '';
  }

  /**
   * Navigate back
   */
  onBackArrow(type: string): void {
    if (type === 'dashboard') {
      this.router.navigate(['/admin/dashboard']);
    }
  }

  /**
   * Save changes (placeholder)
   */
  saveChanges(): void {
    if (this.selectedTeam) {
      console.log('Saving preset targets for:', this.selectedTeam);
    }
  }

  /**
   * Assign target with validation
   */
  assignTarget(): void {
    if (this.selectedTeam && this.targetValue && this.startDate && this.dueDate) {
      console.log(`Assigned target to ${this.selectedTeam.name}`);
      console.log({
        target: this.targetValue,
        startDate: this.startDate,
        dueDate: this.dueDate
      });
      alert('Target assigned successfully!');
    } else {
      alert('Please fill in all fields before assigning.');
    }
  }
  applyFilter() {}
  exportData() {}
  openTargetModal() {

  }
}
