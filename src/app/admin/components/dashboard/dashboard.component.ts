import {
  Component,
  OnInit,
  AfterViewInit,
  HostListener,
  ElementRef,
  NgZone,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { CreateTeamLeadComponent } from '../../crete-team-lead/create-team-lead.component';

import { BehaviorSubject } from 'rxjs';
import {
  UserService,
  getAllClients,
  getAllClientsOverdue,
  clientStatusCounts,
} from '../../../services/user.service';

import { Chart, Colors, registerables, scales } from 'chart.js';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from '../../../services/modalService';
import { Router } from '@angular/router';
import { AddTeamMemberPopupComponent } from '../add-team-member-popup/add-team-member-popup.component';
import { AddTeamLeadPopupComponent } from '../add-team-lead-popup/add-team-lead-popup.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('doughnutChart') doughnutChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('barChart') barChart!: ElementRef<HTMLCanvasElement>;

  doughnutChartInstance!: Chart;
  barChartInstance!: Chart;
  

  activeModal: any;
  isOpenProfile: string | null = null;

  clientsObject: getAllClients = {
    data: [],
    currentPage: 0,
    totalPages: 0,
    totalItems: 0,
    pageSize: 0,
    hasNext: false,
    hasPrevious: false,
  };

  clients = this.clientsObject;
  overdueClients = this.clientsObject;

  limitOptions = [6, 10, 20, 50];
  currentPage = 1;
  totalPages = 3;
  totalItems = 12;
  limit = 5;
  hasNext = false;
  hasPrevious = false;

  clientCurrentPage = 1;
  clientTotalPages = 3;
  clientTotalItems = 12;
  clientLimit = 5;
  clientHasNext = false;
  clientHasPrevious = false;

  overdueClientCurrentPage = 1;
  overdueClientTotalPages = 3;
  overdueClientTotalItems = 12;
  overdueClientLimit = 6;
  overdueClientHasNext = false;
  overdueClientHasPrevious = false;

  // table search and filter
  searchTerm="";
  statusFilter="";
  durationFilter="";
  teamFilter="";

  mainSelectedDates:any
  inputedDate=""

  fromDate=""
  toDate=""

  mainTeamFilter=""

  statuses=[
    'Awaiting Documentation',
    'Interested',
    'Not Interested',
    'Onboarded',
    'Pending',]

    selectedStatus=""

    selectedTeam=""


  onSearchClients(){
    console.log(this.searchTerm);
    if(this.searchTerm.length >= 3){
      this.fetchAllClients(this.currentPage,this.searchTerm,this.statusFilter,this.teamFilter)
          
      
    }else if (this.searchTerm.length == 0) {
      this.fetchAllClients(this.currentPage,this.searchTerm,this.statusFilter,this.teamFilter)

    }
  }

  onStatusChange(event:Event){
    this.selectedStatus = (event.target as HTMLSelectElement).value;
    if(this.selectedStatus === "All Status"){
      this.statusFilter = ""
      this.fetchAllClients(this.currentPage)
    }else{
      this.statusFilter = this.selectedStatus
      this.fetchAllClients(this.currentPage)
    }
  }

  onTableTeamChange(event:Event){
    this.selectedTeam = (event.target as HTMLSelectElement).value;
    console.log(this.teamFilter);
    if(this.selectedTeam === "All Teams"){
      this.teamFilter = ""
      this.fetchAllClients(this.currentPage)
    }else{
      this.teamFilter = this.selectedTeam
    this.fetchAllClients(this.currentPage)
    }
  }

  

  onLimitChange(newLimit: number): void {
    
    this.limit = newLimit; // convert to number
    this.currentPage = 1;
    this.fetchAllClients(this.currentPage);
  }

  // onLimitChangess(newLimit: number): void {
  //   this.limit = newLimit;
  //   this.clientCurrentPage = 1;
  //   this.clientFetchAllClients(this.currentPage);
  // }



  // Was asked to remove after first presentation

  // onOverdueLimitChange(newLimit: number): void {
  //   this.overdueClientLimit = newLimit;
  //   this.overdueClientCurrentPage = 1;
  //   this.fetchOverdueClients(this.overdueClientCurrentPage);
  // }

  fetchAllClients(page: number, searchTerm?: string, statusFilter?: string, teamFilter?: string) {
    // get all clients for client activity tracker

    this.userService.getAllClients(page, this.limit,this.searchTerm,this.statusFilter,this.teamFilter).subscribe({
      next: (data) => {
        this.clients = data;
        this.totalPages = data.totalPages;
        this.totalItems = data.totalItems;
        this.currentPage = page;
        this.hasNext = data.hasNext;
        this.hasPrevious = data.hasPrevious;
        console.log(this.clients);
        console.log(this.totalPages);
      },
      error: (err) => {
        console.log(err);
        // this.router.navigate(['/authentication/login'])
      },
    });
  }

  // fetch Overdue Clients
  // Was asked to remove after first presentation

  // clientFetchAllClients(page: number, searchTerm?: string, statusFilter?: string, durationFilter?: string) {
    

  //   this.userService.getAllClients(page, this.limit,this.searchTerm,this.statusFilter,this.durationFilter).subscribe({
  //     next: (data) => {
       
  //       this.clients = data;
  //       this.clientTotalPages = data.totalPages;
  //       this.clientTotalItems = data.totalItems;
  //       this.clientCurrentPage = page;
  //       this.clientHasNext = data.hasNext;
  //       this.clientHasPrevious = data.hasPrevious;
  //       console.log(this.clients);

     
  //     },
  //     error: (err) => {
  //       console.log(err);
        
  //     },
  //   });
  // }

  fetchOverdueClients(page: number) {
    this.userService
      .getAllClientsOverdue(page, this.overdueClientLimit)
      .subscribe({
        next: (data) => {
          this.overdueClients = data;
          this.overdueClientTotalPages = data.totalPages;
          this.overdueClientTotalItems = data.totalItems;
          this.overdueClientCurrentPage = page;
          this.overdueClientHasNext = data.hasNext;
          this.overdueClientHasPrevious = data.hasPrevious;
          console.log(this.overdueClients);
          console.log(data.currentPage);
        },
        error: (err) => {
          console.log(err);
          // this.router.navigate(['/authentication/login'])
        },
      });
  }

  //  get client status coount

  overallStatusCounts: any = {};
  teamStats: any[] = [];
  selectedTeamName: string = '';
  displayedStatusCounts: any = {};
  doughnutTotalClients: any[] = [];
  doughnutTeamsTotalClients: any[] = [];
  teamNames:any[]=[]
  teamsTotalClientsOnboarded: any[] = [];
  allTeams:any[]=[]

  memberNames: any[] = [];
  membersTotalClientsOnboarded: any[] = [];

  getStatusCounts() {
    this.userService.getClientStatusCounts(this.fromDate, this.toDate).subscribe({
      next: (data) => {
        this.overallStatusCounts = data;
        this.teamStats = data.teamStats;

        // show default team status counts
        this.displayedStatusCounts = this.overallStatusCounts;

        // this.doughnutTotalClients = this.overallStatusCounts.teamStats.map((team: any) => team.totalClients)
        this.doughnutTotalClients = [
          this.overallStatusCounts.overallStatusCounts.AWAITING_DOCUMENTATION,
          this.overallStatusCounts.overallStatusCounts.INTERESTED,
          this.overallStatusCounts.overallStatusCounts.NOT_INTERESTED,
          this.overallStatusCounts.overallStatusCounts.ONBOARDED,
          this.overallStatusCounts.overallStatusCounts.PENDING,
          this.overallStatusCounts.overallStatusCounts.totalClients,
        ];

        // bar chart all teams
        data.teamStats.forEach((team: any) => {
          this.teamNames.push(team.teamName)

          // total clients onboarded by each team
          this.teamsTotalClientsOnboarded.push(team.totalClients)
        })
        console.log(this.teamsTotalClientsOnboarded)

        


  

        console.log(this.doughnutTotalClients);
        
        console.log(this.doughnutTeamsTotalClients)
        console.log(data.teamStats);

        // call Chart
        this.loadDoughnutChart(this.doughnutTotalClients);

        this.loadBarChart(this.teamNames,this.teamsTotalClientsOnboarded)
        
        if(this.selectedTeamName){
          this.handlingBarChart()
          this.handlingDoughnutChart()
        }
        console.log(this.memberNames)
        console.log(this.displayedStatusCounts);
        console.log(
          `hello ${this.displayedStatusCounts.overallStatusCounts.ONBOARDED}`
        );
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  fetchAllTeams(){
    this.userService.getAllTeams("",this.mainTeamFilter).subscribe({
      next: (data) => {
        // this.allTeams=data
        data.forEach((team) => {
        this.allTeams.push(team)
        })
        console.log(this.allTeams)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onMainDateChange(event: Event) {
    this.mainSelectedDates = (event.target as HTMLInputElement).value
    if(this.mainSelectedDates){
      [this.fromDate,this.toDate]=this.mainSelectedDates.split(" to ")
      
    }
// unsets fromDate and to Date when the date entered is cleared
    if(this.inputedDate.includes(" to ")){
        this.fromDate=""
        this.toDate=""
    }

    console.log(this.fromDate)
    console.log(this.toDate)
    console.log(this.inputedDate)

    this.getStatusCounts()
  

     // reset
     this.memberNames=[]
     this.membersTotalClientsOnboarded=[]
     this.teamsTotalClientsOnboarded=[]
     this.teamNames=[]

  }

  onTeamChange() {

   


    if (this.selectedTeamName === 'All Teams') {
      this.displayedStatusCounts = this.overallStatusCounts;
      this.loadDoughnutChart(this.doughnutTotalClients)
    } else  {
      
      this.handlingDoughnutChart()
    }


    if(this.selectedTeamName==='All Teams'){
      // display all teams data
      this.loadBarChart(this.teamNames,this.teamsTotalClientsOnboarded)
      console.log(this.membersTotalClientsOnboarded)
    }else{

     this.handlingBarChart()
      
    } 
  }

  handlingDoughnutChart(){
    const team = this.teamStats.find(
      (t) => t.teamName === this.selectedTeamName
    );
    this.displayedStatusCounts = team ? team : {};
    console.log(this.displayedStatusCounts);
   

    this.doughnutTeamsTotalClients =[
      team.statusCounts.AWAITING_DOCUMENTATION,
      team.statusCounts.INTERESTED,
      team.statusCounts.NOT_INTERESTED,
      team.statusCounts.ONBOARDED,
      team.statusCounts.PENDING

    ]
    console.log(this.doughnutTeamsTotalClients)
   
    // this.getStatusCounts()

    this.loadDoughnutChart(this.doughnutTeamsTotalClients)

   this.doughnutChartInstance.data.datasets[0].data =this.doughnutTeamsTotalClients
   this.doughnutChartInstance.update()

   // reset data
   this.doughnutTeamsTotalClients=[]
  //  this.teamsTotalClientsOnboarded=[]
  }
handlingBarChart(){
  // reset
  this.memberNames=[]
  this.membersTotalClientsOnboarded=[]
 

  const team = this.allTeams.find((t)=>{
    return t.teamName===this.selectedTeamName
  })
  console.log(team)
  team.teamMembers.forEach((member:any)=>{
    this.memberNames.push(member.memberName)
    this.membersTotalClientsOnboarded.push(member.totalClientsSubmitted)
  })


  this.loadBarChart(this.memberNames,this.membersTotalClientsOnboarded)

  this.barChartInstance.data.datasets[0].data =this.membersTotalClientsOnboarded
  this.barChartInstance.update()

  console.log(this.memberNames)
  console.log(this.membersTotalClientsOnboarded)
}

  clickOutsideArea = false;
  isMenuOpen = false;
  modalContent = '';
  modalType: 'team-lead' | 'team-member' = 'team-lead';
  @ViewChild('menu', { static: false }) menu!: ElementRef;

  modalForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    otherNames: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    staffId: new FormControl('', Validators.required),
  });
  isModalOpen = false;
  teamMembers: { id: number; name: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private userService: UserService,
    private modal: ModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.modalForm = this.fb.group({
      firstName: ['', Validators.required],
      otherNames: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      staffId: ['', Validators.required],
    });

    this.fetchAllClients(this.currentPage);
    this.fetchOverdueClients(this.overdueClientCurrentPage);

    // this.fetchAllClients(this.currentPage);
    // this.goToPage(this.currentPage);

    // get  client status count
    this.fetchAllTeams()
    this.getStatusCounts();

    



    // get all overdue clients
    // this.userService.getAllClientsOverdue().subscribe({
    //   next: (data) => {
    //     this.overdueClients = data;

    //   },
    //   error:(err)=>{
    //     console.log(err)
    //   }
    // })
  }

  
  get modalTitle(): string {
    return this.modalType === 'team-lead'
      ? 'Create New Team Lead'
      : 'Create New Team Member';
  }

  
  apiReady: boolean = false;
  ngAfterViewInit(): void {
    this.apiReady = true;
    Chart.register(...registerables);
    //this.loadBarChart(this.teamNames,this.teamsTotalClientsOnboarded)

    // Load charts

    // this.loadDoughnutChart();

    // this.loadBarChart();
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
            data: data,
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

    this.doughnutChartInstance =  new Chart(this.doughnutChart.nativeElement, {
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
  loadBarChart(label?:any,data?:any) {
    if(this.barChartInstance){
      this.barChartInstance.destroy();
     }
    const barData = {
      labels: label,
      datasets: [
        {
          label: 'Team Recommendations',
          data: data,
          backgroundColor: '#F46036',
          borderWidth: 1,
          barThickness: 28,
          borderRadius: 5,
          yAxisId: 'leftAxis',
        },
      ],
    };

   this.barChartInstance = new Chart(this.barChart.nativeElement, {
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

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;

    if (this.isMenuOpen) {
    } else {
      this.clickOutsideArea = false;
    }
  }

  private overlayRef: OverlayRef | null = null;

  editTeamMember(id: any) {
    this.openAddTeamMemberDialog(id, 'Edit Team Members');
  }

  addTeamMember() {
    this.openAddTeamMemberDialog(0, 'Create Team Member');
  }

  openAddTeamMemberDialog(id: any, title: any) {
    const popup = this.dialog.open(AddTeamMemberPopupComponent, {
      width: '500px',
      data: {
        title: title,
        id: id,
      },
    });
  }

  addTeamLead() {
    this.openAddTeamLeadDialog(0, 'Create Team Lead');
  }

  openAddTeamLeadDialog(id: any, title: any) {
    const addLeadPopup = this.dialog.open(AddTeamLeadPopupComponent, {
      width: '500px',
      data: {
        title: title,
        id: id,
      },
    });
  }

  openAddUserDialog(){
    const addUserPopup = this.dialog.open(AddEditUserComponent, {
      width: '500px',
      data: {
      },
    });
  }



  closeModal(): void {
    alert('Modal closed');
    this.overlayRef?.dispose();
    this.overlayRef = null;
  }

  submitForm(): void {
    console.log('Form Data:', this.modalForm);
    alert('Form submitted successfully!');
    this.closeModal();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.clickOutsideArea || !this.menu) return;

    const clickedInside = this.menu.nativeElement.contains(
      event.target as Node
    );
    if (!clickedInside) {
    }
  }

  // onPageSizeChange(event: Event) {
  //   const select = event.target as HTMLSelectElement;
  //   const newSize = Number(select.value);
  //   this.pageSize$.next(newSize);
  //   this.currentPage$.next(1); // reset to page 1 on page size change
  // }

  // goToPage(page: number) {
  //   this.currentPage$.next(page);
  // }
  openProfile(type: string): void {
    this.isOpenProfile = this.isOpenProfile;
  }

  openModal(type: 'teamLead' | 'createTeamMember' | 'assignMembers') {
    if (type === 'teamLead') {
      this.activeModal = 'teamLead';
    } else if (type === 'createTeamMember') {
      this.activeModal = 'createTeamMember';
    } else if (type === 'assignMembers') {
      this.activeModal = 'assignMembers';
    }
    this.modal.openModal(this.activeModal);
  }
}
