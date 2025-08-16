import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table-pagination',
  standalone: false,
  templateUrl: './table-pagination.component.html',
  styleUrl: './table-pagination.component.css'
})
export class TablePaginationComponent {


  @Input() currentPage = 1;
  @Input()totalPages=2;
  @Input()totalItems =12
  @Input() limit =5;
  @Input()  limitOptions = [5, 10, 20, 50];
  @Input() hasNext = false;
  @Input() hasPrevious = false;

  @Output() pageChange = new EventEmitter<number>();
  @Output() limitChange = new EventEmitter<number>();

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChange.emit(page);
      console.log(page)
      


    }
  }
  goToPreviousPage(){
    if(this.hasPrevious){
      const prevPage = this.currentPage -1
      this.goToPage(prevPage)

    }
  }

  goToNextPage(){
    if(this.hasNext){
      const nextPage = this.currentPage +1
      this.goToPage(nextPage)

    }
  }

  onLimitChange(event: Event): void {
    const newLimit = +(event.target as HTMLSelectElement).value;
    this.currentPage = 1;
    this.limitChange.emit(newLimit);
  }
}
