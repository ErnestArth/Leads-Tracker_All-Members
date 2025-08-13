import { Component } from '@angular/core';
import {
  UserService,unResolvedNotification
} from '../../../services/user.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  standalone: false,
})
export class NotificationComponent {

  notification : unResolvedNotification[]=[];
  timeAgo: string = '';
  createdAt: string = '';
  message: string = '';
  type : string = '';



  constructor(private service: UserService) {}

  // function to calculate time ago

  timeAgoFn(dateString:string):string{

    const now = new Date();
    const past = new Date(dateString);
    const diffMillis = now.getTime() - past.getTime();

    const seconds =Math.floor(diffMillis / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0)
    return `${days} days ago`;
    if (hours > 0)
    return `${hours} hours ago`;
    if (minutes > 0)
    return `${minutes} minutes ago`;
    return `${seconds} seconds ago`;

  }

  ngOnInit() {
    this.service.getUnresolvedNotification().subscribe({
      next: (data) => {
        this.notification = data
        this.notification.forEach((n) => {
          this.timeAgoFn(n.createdAt)
           this.timeAgo = this.timeAgoFn(n.createdAt);
           console.log(this.timeAgo);

        })

      }
    })
  }
  isOpenOverview = false;


  onBackArrow(type: string): void {
    this.isOpenOverview = this.isOpenOverview;
  }
}
