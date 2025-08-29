import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.css'],
  standalone: false,
})
export class ViewClientComponent {
  @Input() isVisible = false;
  @Input() clientData: any;

  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
  alertTeamLead() {
  alert(`Alerting team lead for client ${this.clientData?.name}`);
}

}
