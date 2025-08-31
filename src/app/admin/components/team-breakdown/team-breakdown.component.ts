import { Component, OnInit } from '@angular/core';

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
export class TeamBreakdownComponent implements OnInit {
  teamName = 'Alpha Squad';
  dueDate = '2025-09-30';

  teamLead: MemberProgress = {
    name: 'Adwoa Mansah',
    submitted: 50,
    total: 80,
  };

  members: MemberProgress[] = [];
  searchTerm = '';
  currentPage = 1;
  itemsPerPage = 10;

  ngOnInit(): void {
    // Dummy data for members
    this.members = Array.from({ length: 50 }).map((_, i) => ({
      name: `Team Lead Name ${i + 1}`,
      submitted: 50,
      total: 80,
    }));
  }

  getProgress(submitted: number, total: number): number {
    return Math.round((submitted / total) * 1000) / 10;
  }

  // Filtered list based on search term
  get filteredMembers() {
    return this.members.filter((m) =>
      m.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Paginated list
  get paginatedMembers() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredMembers.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredMembers.length / this.itemsPerPage);
  }

  get totalPagesArray(): number[] {
    return Array(this.totalPages)
      .fill(0)
      .map((_, i) => i + 1);
  }

  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getMin(a: number, b: number): number {
    return Math.min(a, b);
  }

  onBackArrow(): void {
    window.history.back();
  }

  exportData(): void {
    const headers = ['Name', 'Current Target', 'Total Clients Onboarded', '% Progress', 'Target Due Date'];
    const rows = this.filteredMembers.map((m) => [
      m.name,
      m.total,
      m.submitted,
      this.getProgress(m.submitted, m.total) + '%',
      this.dueDate,
    ]);
    const csvContent = [headers, ...rows].map((row) => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${this.teamName}-progress.csv`);
    link.click();
  }
}
