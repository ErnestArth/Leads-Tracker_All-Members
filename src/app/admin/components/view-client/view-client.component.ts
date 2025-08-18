import { Component } from '@angular/core';

@Component({
  selector: 'app-view-client',
  standalone: false,
  templateUrl: './view-client.component.html',
  styleUrl: './view-client.component.css'
})
export class ViewClientComponent {
  isOpenNotification: boolean = false;

  onBackArrow(type: string): void {
    this.isOpenNotification = !this.isOpenNotification; // toggle open/close
  }
}
