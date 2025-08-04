import { Component } from '@angular/core';
import {Chart, Colors, registerables, scales} from 'chart.js';
import {Location} from '@angular/common';

@Component({
  selector: 'app-team-lead-details',
  standalone: false,
  templateUrl: './team-lead-details.component.html',
  styleUrl: './team-lead-details.component.css'
})
export class TeamLeadDetailsComponent {

  isEditTeamMemberActive = false;
  isTitleNavActive=true;
  showEditForm= false
  constructor(private location: Location) {}

  ngAfterViewInit() {
    this.initChart();
    
    
  
  }


  initChart(){
    console.log('init chart')
    Chart.register(...registerables);
    const doughnutData = {
      labels: ['Completed', 'Interested', 'Awaiting Docs', 'Pending', 'Not Interested'],
      datasets: [{
        label: 'Onboarding Status',
        data: [800, 260, 105, 85, 310],
        backgroundColor: [
          '#1B998B',
          '#F6B100',
          '#F46036',
          '#2C2368',
          '#FF3B30',
        ],
        borderWidth: 4
      }]
    };

    const barData = {
      labels: ['Bright', 'Benedicta', 'Koofi', 'Yawtey', 'Team E'],
      datasets: [{
        label: 'Members Recommendations',
        data: [480, 510, 800, 285, 700],
        backgroundColor: '#2C2368',
        borderWidth: 1,
        barThickness: 28,
        borderRadius: 5,
        yAxisId: 'leftAxis'
      }],

    }
    const doughnutCanvas = document.getElementById('doughnutChart') as HTMLCanvasElement;
    const barCanvas = document.getElementById('barChart') as HTMLCanvasElement;

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
                boxWidth:12,
                padding:10,
                color: '#333',
                font: {
                  size: 12
                }
              }
            }
          }
        }
      });
    }

    if (barCanvas) {
      new Chart(barCanvas.getContext('2d')!, {
        type: 'bar',
        data: barData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom'
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }




  editTeamMember(){
    this.isEditTeamMemberActive = !this.isEditTeamMemberActive
  }
  goBack(){
    this.location.back()
  }

  toggleTitleNav() {
    this.isTitleNavActive = !this.isTitleNavActive;
  }

  toggleEditForm() {
    this.showEditForm = !this.showEditForm;
  }

}
