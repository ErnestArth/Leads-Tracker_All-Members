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
  limit = 6;
  hasNext = false;
  hasPrevious = false;

  clientCurrentPage = 1;
  clientTotalPages = 3;
  clientTotalItems = 12;
  clientLimit = 6;
  clientHasNext = false;
  clientHasPrevious = false;

  overdueClientCurrentPage = 1;
  overdueClientTotalPages = 3;
  overdueClientTotalItems = 12;
  overdueClientLimit = 6;
  overdueClientHasNext = false;
  overdueClientHasPrevious = false;

  // pagination
  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchAllClients(page);
    }
  }
  goToPreviousPage() {
    if (this.hasPrevious) {
      const prevPage = this.currentPage - 1;
      this.fetchAllClients(prevPage);
    }
  }

  goToNextPage() {
    if (this.hasNext) {
      const nextPage = this.currentPage + 1;
      this.fetchAllClients(nextPage);
    }
  }

  onLimitChange(event: Event): void {
    const newLimit = (event.target as HTMLSelectElement).value;
    this.limit = +newLimit; // convert to number
    this.currentPage = 1;
    this.fetchAllClients(this.currentPage);
  }

  onLimitChangess(newLimit: number): void {
    this.limit = newLimit;
    this.clientCurrentPage = 1;
    this.clientFetchAllClients(this.currentPage);
  }

  onOverdueLimitChange(newLimit: number): void {
    this.overdueClientLimit = newLimit;
    this.overdueClientCurrentPage = 1;
    this.fetchOverdueClients(this.overdueClientCurrentPage);
  }

  fetchAllClients(page: number) {
    // get all clients for client activity tracker

    this.userService.getAllClients(page, this.limit).subscribe({
      next: (data) => {
        this.clients = data;
        this.totalPages = data.totalPages;
        this.totalItems = data.totalItems;
        this.currentPage = page;
        this.hasNext = data.hasNext;
        this.hasPrevious = data.hasPrevious;
        console.log(this.clients);
      },
      error: (err) => {
        console.log(err);
        // this.router.navigate(['/authentication/login'])
      },
    });
  }

  clientFetchAllClients(page: number) {
    // get all clients for client activity tracker

    this.userService.getAllClients(page, this.limit).subscribe({
      next: (data) => {
        this.clients = data;
        this.clientTotalPages = data.totalPages;
        this.clientTotalItems = data.totalItems;
        this.clientCurrentPage = page;
        this.clientHasNext = data.hasNext;
        this.clientHasPrevious = data.hasPrevious;
        console.log(this.clients);

        this.loadDoughnutChart();
      },
      error: (err) => {
        console.log(err);
        // this.router.navigate(['/authentication/login'])
      },
    });
  }

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

  getStatusCounts() {
    this.userService.getClientStatusCounts().subscribe({
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

        console.log(this.doughnutTotalClients);
        
        console.log(this.doughnutTeamsTotalClients)
        console.log(data.teamStats.length);

        // call Chart
        this.loadDoughnutChart(this.doughnutTotalClients);

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

  onTeamChange() {
    if (this.selectedTeamName === 'All Teams') {
      this.displayedStatusCounts = this.overallStatusCounts;
    } else {
      const team = this.teamStats.find(
        (t) => t.teamName === this.selectedTeamName
      );
      this.displayedStatusCounts = team ? team : {};
      console.log(this.displayedStatusCounts);
      this.doughnutTotalClients= team.totalClients
      this.loadDoughnutChart(this.doughnutTotalClients)
      console.log(this.doughnutTotalClients)
      
    }
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

    this.fetchAllClients(this.currentPage);
    this.goToPage(this.currentPage);

    // get  client status count
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

  // renderChart(){
  //   const doughnutData = {
  //     labels: [
  //       'onboarded',
  //       'Interested',
  //       'Awaiting Docs',
  //       'Pending',
  //       'Not Interested',
  //     ],
  //     datasets: [
  //       {
  //         label: 'Status',
  //         data: [2, 20, 15,   5, 10],
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
  //     labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
  //     datasets: [
  //       {
  //         label: 'Team Recommendations',
  //         data: [480, 510, 800, 285, 700],
  //         backgroundColor: '#F46036',
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
  apiReady: boolean = false;
  ngAfterViewInit(): void {
    this.apiReady = true;
    Chart.register(...registerables);

    // Load charts

    // this.loadDoughnutChart();

    this.loadBarChart();
  }
  loadDoughnutChart(data?: any) {
    if (this.apiReady) {
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

      new Chart(this.doughnutChart.nativeElement, {
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
  }
  loadBarChart() {
    const barData = {
      labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
      datasets: [
        {
          label: 'Team Recommendations',
          data: [480, 510, 800, 285, 700],
          backgroundColor: '#F46036',
          borderWidth: 1,
          barThickness: 28,
          borderRadius: 5,
          yAxisId: 'leftAxis',
        },
      ],
    };

    new Chart(this.barChart.nativeElement, {
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

  // openDialog(type: 'team-lead' | 'team-member') {
  //   const entityType = type.includes('lead') ? "Team Lead" : "Team Member"
  //   const dialogRef = this.dialog.open(CreateTeamLeadComponent , {
  //     width: "500px", maxHeight : "100vh",
  //     data: {
  //     title: "Create" + entityType,
  //     buttonLabel: "Add" + entityType,
  //     }
  // });
  // dialogRef.afterClosed().subscribe(data => {})
  // }

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
