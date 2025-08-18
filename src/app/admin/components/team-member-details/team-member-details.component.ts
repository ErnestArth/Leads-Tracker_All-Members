import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, Colors, registerables, scales } from 'chart.js';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService, getAllClients, getUserDetails } from '../../../services/user.service';
import { FlatpickrModule } from 'angularx-flatpickr';
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
  clientsUnderUserData:getAllClients={
    data: [],
    currentPage: 0,
    totalPages: 0,
    totalItems: 0,
    pageSize: 0,
    hasNext: false,
    hasPrevious: false
  }

  clientCurrentPage = 0;
  clientTotalPages = 3;
  clientTotalItems = 12;
  clientLimit = 5;
  clientHasNext = false;
  clientHasPrevious = false;

  allStatuses=[
    "Awaiting Documentation",
    "Interested",
    "Not Interested",
    "Onboarded",
    "Pending"
  ]

  selectedDates: string = '';

  searchTerm="";
  statusFilter=""
  teamFilter=""
  durationFilter="week"

  fromDate="";
  toDate="";

  memberDoughnutChartInstance!: Chart;

  @ViewChild('memberDoughnutChart') memberDoughnutChart!: ElementRef<HTMLCanvasElement>;
  constructor(
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  progressColorCoe(){
    
  }

  ngOnInit(): void {
    
   this.fetchUserData()
  }


  fetchUserData(){
    let id = this.activatedRoute.snapshot.paramMap.get('memberId');
    console.log(this.activatedRoute.snapshot.paramMap.get('memberId'));
    if (id) {
      this.userService.getUser(id).subscribe({
        next: (data) => {
          console.log(data);
          this.userData = data;
          console.log(this.userData);
          this.fetchClients(this.clientCurrentPage)
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      console.log('nothing');
    }
  }

  fetchClients(page: number){
    this.userService.getClientsUnderUser(this.userData.userId, this.searchTerm,this.statusFilter,this.fromDate,this.toDate,page, this.clientLimit).subscribe({
      next: (data) => {
        this.clientsUnderUserData = data;
        this.clientTotalPages=data.totalPages -1;
        this.clientTotalItems=data.totalItems;
        this.clientCurrentPage=page;
        this.clientHasNext=data.hasNext;
        this.clientHasPrevious=data.hasPrevious;
        
        console.log(this.clientsUnderUserData)
        // console.log(this.clientTotalPages)
      },error: (err) => {
        console.log(err);
       
      }
    })
  }

  loadTeamDoughnutChart(data?: any) {
    if(this.memberDoughnutChartInstance){
    
     this.memberDoughnutChartInstance.destroy();
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
 
   this.memberDoughnutChartInstance =   new Chart(this.memberDoughnutChart.nativeElement, {
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
             datalabels: {
                 color:'white',
             }
           },
         },
       });
     
   }
  ngAfterViewInit() {
    Chart.register(...registerables);
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
          label: 'Onboarding Status',
          data: [800, 260, 105, 85, 310],
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
            datalabels: {
                color:'white',
            }
          },
        },
      });
    }
  }

  onSearchClients() {
    console.log(this.searchTerm);
    
    if (this.searchTerm.length >= 3) {
      this.fetchClients(this.clientCurrentPage) 
     }else if(this.searchTerm.length == 0){
      this.fetchClients(this.clientCurrentPage)
    }
    
  }

  onStatusChange(event: Event) {
    this.statusFilter = (event.target as HTMLSelectElement).value;
    console.log(this.statusFilter);
    if(this.statusFilter === "All Statuses"){
      this.fetchClients(this.clientCurrentPage)
    }else{
      this.fetchClients(this.clientCurrentPage)
  
    }
  }

  onDateChange(event: Event) {
    this.selectedDates = (event.target as HTMLInputElement).value
    console.log(this.selectedDates);
     [this.fromDate, this.toDate] = this.selectedDates.split(' to ');
    this.fetchClients(this.clientCurrentPage)
    // fromDate=this.fromDate
    // toDate=this.toDate
        console.log(this.fromDate)
        console.log(this.toDate)
  
  
  
  }
// pagination
  onLimitChange(newLimit: number): void {
    this.clientLimit = newLimit;
    this.clientCurrentPage = 0;
    this.fetchClients(this.clientCurrentPage)
  }
  
  editTeamMember() {
    this.isEditTeamMemberActive = !this.isEditTeamMemberActive;
  }
  goBack() {
    this.location.back();
  }

  updateEditChanges(){
    this.fetchUserData()
  }
}
