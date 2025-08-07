import { Component } from '@angular/core';
import { Chart, Colors, registerables, scales } from 'chart.js';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService, getUserDetails } from '../../../services/user.service';

@Component({
  selector: 'app-team-member-details',
  standalone: false,
  templateUrl: './team-member-details.component.html',
  styleUrl: './team-member-details.component.css',
})
export class TeamMemberDetailsComponent {
  isEditTeamMemberActive = false;
  userData: getUserDetails = {
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    phoneNumber: '',
    staffId: '',
  };
  constructor(
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('memberId');
    console.log(this.activatedRoute.snapshot.paramMap.get('memberId'));
    if (id) {
      this.userService.getUser(id).subscribe({
        next: (data) => {
          console.log(data);
          this.userData = data;
          console.log(this.userData);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      console.log('nothing');
    }
  }

  ngAfterViewInit() {
    Chart.register(...registerables);
    const doughnutData = {
      labels: [
        'Completed',
        'Interested',
        'Awaiting Docs',
        'Pending',
        'Not Interested',
      ],
      datasets: [
        {
          label: 'Onboarding Status',
          data: [800, 260, 105, 85, 310],
          backgroundColor: [
            '#1B998B',
            '#F6B100',
            '#F46036',
            '#2C2368',
            '#FF3B30',
          ],
          borderWidth: 4,
        },
      ],
    };
    const doughnutCanvas = document.getElementById(
      'doughnutChart'
    ) as HTMLCanvasElement;

    if (doughnutCanvas) {
      new Chart(doughnutCanvas.getContext('2d')!, {
        type: 'doughnut',
        data: doughnutData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 12,
                padding: 10,
                color: '#333',
                font: {
                  size: 12,
                },
              },
            },
          },
        },
      });
    }
  }
  editTeamMember() {
    this.isEditTeamMemberActive = !this.isEditTeamMemberActive;
  }
  goBack() {
    this.location.back();
  }
}
