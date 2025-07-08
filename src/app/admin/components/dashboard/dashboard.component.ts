import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {Chart, registerables} from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabel';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})


export class DashboardComponent implements AfterViewInit {

  constructor() {}

  isDropdownOpen = false;

  ngAfterViewInit(): void {
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
      labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
      datasets: [{
        label: 'Team Recommendations',
        data: [480, 510, 800, 285, 700],
        backgroundColor: '#F46036',  
        borderWidth: 1,
        yAxisId: 'leftAxis'
      }]
    };

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
  toggleDropdown(event: MouseEvent){
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  closeDropdown(){
    setTimeout(() => this.isDropdownOpen = false, 150);
  }
  addTeamLead(){
    console.log ('Adding Team Lead...');
    
  }
  addTeamMember(){
    console.log ('Adding Team Member...')
  }
}