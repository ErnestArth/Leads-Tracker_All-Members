import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, Colors, registerables, scales } from 'chart.js';
import { FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  
  getAllClients,
  getAllTeams,
  getSpecificTeamLead,
  getUserDetails,
  UserService,
} from '../../../services/user.service';
import {ChangeDetectionStrategy} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { FlatpickrModule } from 'angularx-flatpickr';
import { DeactivateTeamDialogComponent } from '../deactivate-team-dialog/deactivate-team-dialog.component';
import { MatDialog } from '@angular/material/dialog';

Chart.register(...registerables, ChartDataLabels);
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




 

  progressColor: string = '';
  progressTextColor: string = '';
  progressOutlineColor: string = '';


  doughnutChartInstance!: Chart ;
  doughnutStatusData: any[] = [];

  barChartInstance!: Chart ;
  teamMembers:any[]=[]
  teamMemberNames: any[] = [];
  teamMembersData: any[] = [];

  teamDoughnutChartInstance!: Chart ;
  teamDoughnutStatusData: any[] = [];

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
  clientLimit = 5;
  clientHasNext = false;
  clientHasPrevious = false;

  // overdue clients pagination 
  overdueClientCurrentPage = 1;
  overdueClientTotalPages = 3;
  overdueClientTotalItems = 12;
  overdueClientLimit = 5;
  overdueClientHasNext = false;
  overdueClientHasPrevious = false;
  page=0

  overdueClientsData =this.clientsObject
  clientsUnderUserData =this.clientsObject

  overdueSearchTerm="";
  searchTerm="";
  statusFilter=""
  teamFilter=""
  durationFilter="week"

  fromDate="";
  toDate="";

  startDate="";
  endDate="";

  sdate:string[]=[]
  edate:string[]=[]

  allTeam:getAllTeams[]=[]

   searchTeamName=""
   searchMember=""

  allStatuses=[
    "Awaiting Documentation",
    "Interested",
    "Not Interested",
    "Onboarded",
    "Pending"
  ]

  clientStatus:any={}

    durationParam:string=""
   

  userData: getSpecificTeamLead | null = null;
  selectedDates: string = '';
  mainSelectedDates: string = '';

  clientDataForm!: FormGroup;


  @ViewChild('doughnutChart') doughnutChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('barChart') barChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('teamDoughnutChart') teamDoughnutChart!: ElementRef<HTMLCanvasElement>;

  constructor(
    private location: Location,
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder
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

    this.clientDataForm = this.fb.group({
      dateRange:['']
    });

    // this.clientDataForm.get('dateRange')?.valueChanges.subscribe((value) => {
    //  if(value){
    //   const [startDate, endDate] = value.split(' to ');
    //   console.log(startDate)
    //   console.log(endDate)
    //  }
    // });

    this.fetchTeams()
    this.fetchTeamLeadData()

    
  }
 

  fetchTeamLeadData() {
   



    let id = this.activatedRoute.snapshot.paramMap.get('teamLeadId');
    console.log(this.activatedRoute.snapshot.paramMap);
    if (id) {
      this.userService.getSpecificTeamLead(id,this.startDate,this.endDate,this.searchMember).subscribe({
        next: (data) => {
          // reset data
          this.teamMemberNames = [];
          this.teamMembersData = [];

          
          console.log(data);
          this.userData = data;
          this.teamMembers=data.teamPerformance.teamMembers
          this.teamLeadUserId = data.userId
          this.clientStatus= data.teamPerformance.clientStatus
          console.log(this.clientStatus)
          
          data.teamPerformance.teamMembers.forEach((member) => {
            this.teamMemberNames.push(member.memberName);
            this.teamMembersData.push(member.totalClientsSubmitted);
            console.log(this.teamMemberNames, this.teamMembersData);
          })
          console.log(this.userData);
          console.log(this.userData.teamPerformance.clientStatus)
          this.progressColorCode();

          this.doughnutStatusData =[
            this.userData.teamPerformance.clientStatus.Awaiting_Documentation,
            this.userData.teamPerformance.clientStatus.Interested,
            this.userData.teamPerformance.clientStatus.Not_Interested,
            this.userData.teamPerformance.clientStatus.Onboarded,
            this.userData.teamPerformance.clientStatus.Pending
          ]

         // call  charts
         console.log(this.doughnutStatusData)
          this.loadDoughnutChart(this.doughnutStatusData)
          this.loadTeamDoughnutChart(this.doughnutStatusData)
          console.log(this.userData.teamPerformance.clientStatus.Interested,)

          this.loadBarChart(this.teamMemberNames,this.teamMembersData)


          
          // call overdue clients
          // this.getOverdueClients(this.clientCurrentPage)
          // call clients under user
          console.log("hey")
          this.fetchClients(this.clientCurrentPage)        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      console.log('nothing');
    }
  }

  onMainDateChange(event: Event) {
    // this.durationParam = (event.target as HTMLSelectElement).value
    
  

      this.mainSelectedDates = (event.target as HTMLInputElement).value

    if (this.mainSelectedDates){
      [this.startDate,this.endDate]=this.mainSelectedDates.split(" to ")
      console.log(this.startDate)
      console.log(this.endDate)
    }


   


    //reset data
    this.teamMembersData=[]
    this.teamMemberNames=[]


    console.log(this.durationParam)
    this.fetchTeamLeadData()

    // update dougnut chart
    this.doughnutChartInstance.data.datasets[0].data=this.doughnutStatusData
    this.doughnutChartInstance.update()

    // update barChart
    this.barChartInstance.data.datasets[0].data=this.teamMembersData
    this.barChartInstance.update()

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

  this.doughnutChartInstance =   new Chart(this.doughnutChart.nativeElement, {
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


  loadTeamDoughnutChart(data?: any) {
    if(this.teamDoughnutChartInstance){
    
     this.teamDoughnutChartInstance.destroy();
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
 
   this.teamDoughnutChartInstance =   new Chart(this.teamDoughnutChart.nativeElement, {
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

  loadBarChart(memberNames: any, data: any) {
    if(this.barChartInstance){
    
      this.barChartInstance.destroy();
     }
    const barData = {
      labels: memberNames,
      datasets: [
        {
          label: 'Clients Onboarded By Members',
          data: data,
          backgroundColor: '#2C2368',
          borderWidth: 1,
          barThickness: 28,
          borderRadius: 5,
          yAxisId: 'leftAxis',
        },
      ],
    };

  this.barChartInstance =  new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: barData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' },
        },
        scales: {
          y: { beginAtZero: true },
          
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
    if(!this.showEditForm){
      this.location.back();
    }else{
   this.showEditForm = false
   this.isTitleNavActive= true
   this.showTeamPerformance = true
    } 
  }

  toggleTitleNav() {
    this.isTitleNavActive = !this.isTitleNavActive;
    this.showTeamPerformance = !this.showTeamPerformance;
    console.log(this.isTitleNavActive);
  }

  toggleEditForm() {
    this.showTeamPerformance =true
    this.isTitleNavActive = false;
    this.showEditForm =true
    console.log(this.showTeamPerformance);
    console.log(this.isTitleNavActive)
    
    
  }

 



  // being called in getSpecific team Lead request

 
  getOverdueClients(pages: number) {
  
  this.userService.getOverdueClientsUnderUser(this.teamLeadUserId, this.overdueSearchTerm,this.teamFilter,this.durationFilter,pages, this.overdueClientLimit).subscribe({
    next: (data) => {
      this.overdueClientsData = data;
      this.overdueClientTotalPages=data.totalPages ;
      this.overdueClientTotalItems=data.totalItems;
      this.overdueClientCurrentPage=this.page;
      this.overdueClientHasNext=data.hasNext;
      this.overdueClientHasPrevious=data.hasPrevious;
      
      
    },
    error:(err) => {
      console.log(err);
    }
  }
  );
 }


//  parameter "page" from paginated table component
 fetchClients(page:number){
  this.userService.getClientsUnderUser(this.teamLeadUserId, this.searchTerm,this.statusFilter,this.fromDate,this.toDate,page, this.clientLimit).subscribe({
    next: (data) => {
      this.clientsUnderUserData = data;
      this.clientTotalPages=data.totalPages -1;
      this.clientTotalItems=data.totalItems;
      this.clientCurrentPage=page;
      this.clientHasNext=data.hasNext;
      this.clientHasPrevious=data.hasPrevious;
      
      // console.log(this.clientsUnderUserData)
      // console.log(this.clientTotalPages)
    },error: (err) => {
      console.log(err);
     
    }
  })
  }

  fetchTeams(){
    this.userService.getAllTeams(this.searchTeamName,this.teamFilter).subscribe({
      next: (data) => {
        this.allTeam = data;
        console.log(data)
      }
    })
  }


 onTeamsChange(event:Event){
  this.teamFilter = (event.target as HTMLSelectElement).value;
  console.log(this.teamFilter);
  
    this.getOverdueClients(this.overdueClientCurrentPage)
  
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
onMemberSearch(){
  console.log(this.searchMember);
  if (this.searchMember.length >= 3) {
    this.fetchTeamLeadData()
   }else if(this.searchMember.length == 0){
    this.fetchTeamLeadData()
  }
}

onOverdueSearch(){
  console.log(this.overdueSearchTerm);
  if (this.searchTerm.length >= 3) {
    this.getOverdueClients(this.overdueClientCurrentPage) 
   }else if(this.searchTerm.length == 0){
    this.getOverdueClients(this.overdueClientCurrentPage)
  }
}




// table pagination
onLimitChange(newLimit: number): void {
  this.clientLimit = newLimit;
  this.clientCurrentPage = 1;
  this.fetchClients(this.clientCurrentPage)
}


onOverdueLimitChange(newLimit: number): void {
  this.overdueClientLimit = newLimit;
  this.overdueClientCurrentPage = 1;
  this.getOverdueClients(this.overdueClientCurrentPage);
  console.log(this.teamLeadUserId)
  console.log(this.overdueClientLimit)
  
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



updateEditChanges(){
  this.fetchTeamLeadData()
}

openDeactivateTeamLeadDialog() {
  this.dialog.open(DeactivateTeamDialogComponent,{
    width: '1200px',
    data:{
      title: 'Deactivate Team',
      teamLeadId: this.teamLeadUserId
      
      


    }
    
  })
 
  
}

}
