import { Component, OnInit } from '@angular/core';
import { unResolvedNotification, UserService } from '../../../services/user.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  standalone: false,
})
export class NotificationComponent implements OnInit {

  unResolvedNotifications: unResolvedNotification[] = [];
  loading = false;
  isOpenOverview = false;
  isOpenViewClient = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUnResolvedNotifications();
  }

  fetchUnResolvedNotifications(): void {
    this.loading = true;
    this.userService.getUnResolvedNotification().subscribe({
      next: (data: unResolvedNotification[]) => {
        console.log('✅ Fetched notifications:', data);
        this.unResolvedNotifications = data;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('❌ Error fetching notifications:', error);
        this.loading = false;
      }
    });
  }

  onBackArrow(type: string): void {
    this.isOpenOverview = !this.isOpenOverview; // toggle open/close
  }
  // The method to calculate time ago from a date string
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
  onViewClient(type: string): void {
    this.isOpenViewClient = !this.isOpenViewClient; // toggle open/close
  }
}
