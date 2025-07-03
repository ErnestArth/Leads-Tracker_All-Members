import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Chart, registerables} from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})


export class DashboardComponent implements OnInit{
  @ViewChild('myChart') myChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('myChart2') myChart2!: ElementRef<HTMLCanvasElement>;
  @ViewChild('myChart3') myChart3!: ElementRef<HTMLCanvasElement>;
  @ViewChild('myChart4') myChart4!: ElementRef<HTMLCanvasElement>;

  chart!: Chart;


  seletedValue: string = '';

  constructor() { }

  ngOnInit() : void {

  }

  ngAfterVeiewInit(): void {
    this.chart = new Chart(this.myChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Onboarding', 'Interested', 'Awaiting Documentation', 'Pending', 'Not Interested'],
        datasets: [
          {
            label: 'Leads',
            data: [12, 19, 3, 5, 2], // Example data, replace with your actual data
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
          }
        ]
      }
    })
  }



}
