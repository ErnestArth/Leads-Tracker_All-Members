import { Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  standalone: false
})
export class NotificationComponent {
  notifications = [
    {
      type: 'New Client Forwarded',
      clientName: 'Kwame Boateng',
      forwardedBy: 'Yaa Asantewaa',
      timestamp: '2 hours ago',
      group: 'NEW'
    },
    {
      type: 'Overdue Follow-Up',
      clientName: 'Ama Serwa',
      daysPending: 4,
      timestamp: '2 Days ago',
      group: 'NEW'
    },
    {
      type: 'New Client Forwarded',
      clientName: 'John Mensah',
      forwardedBy: 'Peter Jones',
      timestamp: '2 hours ago',
      group: 'NEW'
    },
    {
      type: 'Overdue Follow-Up',
      clientName: 'Ama Serwa',
      daysPending: 4,
      timestamp: '3 Days ago',
      group: 'EARLIER'
    }
  ];

  get groupedNotifications() {
  
    return {
      NEW: this.notifications.filter(n => n.group === 'NEW'),
      EARLIER: this.notifications.filter(n => n.group === 'EARLIER')
    };
  }
}
