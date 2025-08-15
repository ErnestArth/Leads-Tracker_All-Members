import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, Colors, registerables, scales } from 'chart.js';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  
  getAllClients,
  getSpecificTeamLead,
  getUserDetails,
  UserService,
} from '../../../services/user.service';
import {ChangeDetectionStrategy} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-team-lead-details',
  standalone: false,
  templateUrl: './team-lead-details.component.html',
  styleUrl: './team-lead-details.component.css',
})
export class TeamLeadDetailsComponent {
  isEditTeamMemberActive = false;
  isTitleNavActive = true;
  showTeamPerformance = true;
  showEditForm = false;




  readonly dateRange = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  progressColor: string = '';
  progressTextColor: string = '';
  progressOutlineColor: string = '';
  doughnutChartInstance!: Chart ;
  doughnutStatusData: any[] = [];
  teamLeadUserId:any;
  
  clientsObject: getAllClients = {
    data: [],
    currentPage: 0,
    totalPages: 0,
    totalItems: 0,
    pageSize: 0,
    hasNext: false,
    hasPrevious: false,
  }
  // client pagination 
  clientCurrentPage = 0;
  clientTotalPages = 3;
  clientTotalItems = 12;
  clientLimit = 6;
  clientHasNext = false;
  clientHasPrevious = false;

  page=0

  overdueClientsData =this.clientsObject
  clientsUnderUserData =this.clientsObject

  searchTerm="";
  statusFilter=""
  durationFilter="week"

  

  allStatuses=[
    "Awaiting Documentation",
    "Interested",
    "Not Interested",
    "Onboarded",
    "Pending"
  ]

    
  

  userData: getSpecificTeamLead | null = null;


  @ViewChild('doughnutChart') doughnutChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('barChart') barChart!: ElementRef<HTMLCanvasElement>;

  constructor(
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  progressColorCode() {
    if (
      this.userData &&
      this.userData.teamPerformance &&
      this.userData.teamPerformance.progressPercentage >= 80
    ) {
      this.progressColor = 'progress-green';
      this.progressTextColor = 'text-green';
      this.progressOutlineColor = 'green-outline';
    } else if (
      this.userData &&
      this.userData.teamPerformance &&
      this.userData.teamPerformance.progressPercentage >= 50
    ) {
      this.progressColor = 'progress-yellow';
      this.progressTextColor='text-yellow';
      this.progressOutlineColor='yellow-outline';
    }else{
      this.progressColor ='progress-red';
      this.progressTextColor='text-red';
      this.progressOutlineColor='red-outline';
    }
  }
  ngOnInit(): void {

    

    let id = this.activatedRoute.snapshot.paramMap.get('teamLeadId');
    console.log(this.activatedRoute.snapshot.paramMap);
    if (id) {
      this.userService.getSpecificTeamLead(id).subscribe({
        next: (data) => {
          console.log(data);
          this.userData = data;
          this.teamLeadUserId = data.userId
          

          console.log(this.userData);
          console.log(this.userData.teamPerformance.clientStatus)
          this.progressColorCode();

          this.doughnutStatusData =[
            this.userData.teamPerformance.clientStatus.AWAITING_DOCUMENTATION,
            this.userData.teamPerformance.clientStatus.INTERESTED,
            this.userData.teamPerformance.clientStatus.NOT_INTERESTED,
            this.userData.teamPerformance.clientStatus.ONBOARDED,
            this.userData.teamPerformance.clientStatus.PENDING
          ]
         console.log(this.doughnutStatusData)
          this.loadDoughnutChart(this.doughnutStatusData)
          
          // call overdue clients
          this.getOverdueClients(this.teamLeadUserId)
          // call clients under user
          this.getClientsUnderUser(this.teamLeadUserId, this.searchTerm,this.statusFilter,this.durationFilter,this.page, this.clientLimit)
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
   

    // this.loadDoughnutChart()
    
  }

  
  

  loadDoughnutChart(data?: any) {
   if(this.doughnutChartInstance){
    this.doughnutChartInstance.destroy();
   }
      const doughnutData = {
        labels: [
          'Awaiting Documentation',
          'Interested',
          'Not Interested',
          'Onboarded',
          'Pending',
        ],
        datasets: [
          {
            label: 'Status',
            data: data  ,
            backgroundColor: [
              
             
              '#F46036', //orange
              '#F6B100',  // yellow
              '#FF3B30', //red
              '#1B998B',   // green
              '#2C2368',   //purple
             
            ],
            borderWidth: 4,
          },
        ],
      };

   const doughnutChartInstance =   new Chart(this.doughnutChart.nativeElement, {
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
                font: { size: 12 },
              },
            },
          },
        },
      });
    
  }

  // initChart() {
  //   console.log('init chart');
  //   Chart.register(...registerables);
  //   const doughnutData = {
  //     labels: [
  //       'Completed',
  //       'Interested',
  //       'Awaiting Docs',
  //       'Pending',
  //       'Not Interested',
  //     ],
  //     datasets: [
  //       {
  //         label: 'Onboarding Status',
  //         data: [800, 260, 105, 85, 310],
  //         backgroundColor: [
  //           '#1B998B',
  //           '#F6B100',
  //           '#F46036',
  //           '#2C2368',
  //           '#FF3B30',
  //         ],
  //         borderWidth: 4,
  //       },
  //     ],
  //   };

  //   const barData = {
  //     labels: ['Bright', 'Benedicta', 'Koofi', 'Yawtey', 'Team E'],
  //     datasets: [
  //       {
  //         label: 'Members Recommendations',
  //         data: [480, 510, 800, 285, 700],
  //         backgroundColor: '#2C2368',
  //         borderWidth: 1,
  //         barThickness: 28,
  //         borderRadius: 5,
  //         yAxisId: 'leftAxis',
  //       },
  //     ],
  //   };
  //   const doughnutCanvas = document.getElementById(
  //     'doughnutChart'
  //   ) as HTMLCanvasElement;
  //   const barCanvas = document.getElementById('barChart') as HTMLCanvasElement;

  //   if (doughnutCanvas) {
  //     new Chart(doughnutCanvas.getContext('2d')!, {
  //       type: 'doughnut',
  //       data: doughnutData,
  //       options: {
  //         responsive: true,
  //         plugins: {
  //           legend: {
  //             position: 'bottom',
  //             labels: {
  //               boxWidth: 12,
  //               padding: 10,
  //               color: '#333',
  //               font: {
  //                 size: 12,
  //               },
  //             },
  //           },
  //         },
  //       },
  //     });
  //   }

  //   if (barCanvas) {
  //     new Chart(barCanvas.getContext('2d')!, {
  //       type: 'bar',
  //       data: barData,
  //       options: {
  //         responsive: true,
  //         maintainAspectRatio: false,
  //         plugins: {
  //           legend: {
  //             position: 'bottom',
  //           },
  //         },
  //         scales: {
  //           y: {
  //             beginAtZero: true,
  //           },
  //         },
  //       },
  //     });
  //   }
  // }

  editTeamMember() {
    this.isEditTeamMemberActive = !this.isEditTeamMemberActive;
  }
  goBack() {
   this.showEditForm = false
   this.isTitleNavActive= true
   this.showTeamPerformance = true
  }

  toggleTitleNav() {
    this.isTitleNavActive = !this.isTitleNavActive;
    this.showTeamPerformance = !this.showTeamPerformance;
    console.log(this.isTitleNavActive);
  }

  toggleEditForm() {
    this.showTeamPerformance =false
    this.isTitleNavActive = false;
    this.showEditForm =true
    console.log(this.showTeamPerformance);
    console.log(this.isTitleNavActive)
    
    
  }

  // being called in getSpecific team Lead request
  getOverdueClients(teamLeadId: string) {
  this.userService.getOverdueClientsUnderUser(teamLeadId).subscribe({
    next: (data) => {
      this.overdueClientsData = data;
      console.log(this.overdueClientsData)
    }
  }
  );
 }

 getClientsUnderUser(teamLeadId: string, searchTerm: string, status: string,duration: string,page: number , limit: number ) {
  this.userService.getClientsUnderUser(teamLeadId, searchTerm, status,duration,this.page, this.clientLimit).subscribe({
    next: (data) => {
      this.clientsUnderUserData = data;
      console.log(this.clientsUnderUserData)
    }
  }
  );
 }
 onSearchClients(teamLeadId: string) {
  console.log(this.searchTerm);
  console.log(teamLeadId);
  if (this.searchTerm.length >= 3) {
    this.getClientsUnderUser(teamLeadId, this.searchTerm,this.statusFilter,this.durationFilter,this.page, this.clientLimit)  
  }else if(this.searchTerm.length == 0){
    this.getClientsUnderUser(teamLeadId, this.searchTerm,this.statusFilter,this.durationFilter,this.page, this.clientLimit)
  }
  
}

onStatusChange(event: Event) {
  this.statusFilter = (event.target as HTMLSelectElement).value;
  console.log(this.statusFilter);
  if(this.statusFilter === "All Statuses"){
    this.getClientsUnderUser(this.teamLeadUserId, this.searchTerm," ",this.durationFilter,this.page, this.clientLimit)
  }else{
    this.getClientsUnderUser(this.teamLeadUserId, this.searchTerm,this.statusFilter,this.durationFilter,this.page, this.clientLimit)

  }
}

// table pagination
fetchClients(page:number){
this.userService.getClientsUnderUser(this.teamLeadUserId, this.searchTerm,this.statusFilter,this.durationFilter,this.page, this.clientLimit).subscribe({
  next: (data) => {
    this.clientsUnderUserData = data;
    this.clientTotalPages=data.totalPages;
    this.clientTotalItems=data.totalItems;
    this.clientCurrentPage=page;
    this.clientHasNext=data.hasNext;
    this.clientHasPrevious=data.hasPrevious;

    console.log(this.clientsUnderUserData)
  },error: (err) => {
    console.log(err);
   
  }
})
}

onLimitChange(newLimit: number): void {
  this.clientLimit = newLimit;
  this.clientCurrentPage = 1;
  this.fetchClients(this.clientCurrentPage)
}








}
