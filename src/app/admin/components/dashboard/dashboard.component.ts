import { Component, OnInit, AfterViewInit, HostListener, ElementRef, NgZone, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import { CreateTeamLeadComponent } from '../../crete-team-lead/create-team-lead.component';

import { BehaviorSubject } from 'rxjs';
import { UserService,getAllClients,getAllClientsOverdue} from '../../../services/user.service';

import {Chart, Colors, registerables, scales} from 'chart.js';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatDialog,} from '@angular/material/dialog';
import { ModalService } from '../../../services/modalService';
import { Router } from '@angular/router';
import {AddTeamMemberPopupComponent} from '../add-team-member-popup/add-team-member-popup.component'
import { AddTeamLeadPopupComponent } from '../add-team-lead-popup/add-team-lead-popup.component';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})


export class DashboardComponent  implements OnInit, AfterViewInit {
  activeModal: any;

  clients : getAllClients[] = [];
  overdueClients : getAllClientsOverdue[] = []



  // users = new BehaviorSubject<User[]>([]);
  // totalUsers = new BehaviorSubject(0);
  // totalPages = new BehaviorSubject(0);

  // pageSizeOptions = [5, 6, 10, 15, 20];

  // private currentPage$ = new BehaviorSubject<number>(3);
  // private pageSize$ = new BehaviorSubject<number>(5);

  // pages: number[] = [];
  // currentPage = 3;
  // pageSize = 5;


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
    });;
  isModalOpen = false;
  teamMembers: { id: number, name: string }[] = [];

constructor(private fb: FormBuilder, private dialog: MatDialog, 
  private userService: UserService, private modal: ModalService,
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

    // function formatField(str: string): string {
    //   return str
    //     .toLowerCase()
    //     .replace(/_/g, ' ')
    //     .replace(/\b\w/g, char => char.toUpperCase());
    // }
  
    // const formattedClients = this.clients.map(client => ({
    
    //   readableStatus: formatField(client.clientStatus)
    // }));
    


    // get all overdue clients
    this.userService.getAllClientsOverdue().subscribe({
      next: (data) => {
        this.overdueClients = data;
        
      },
      error:(err)=>{
        console.log(err)
      }
    })
    

    // get all clients for client activity tracker
    this.userService.getAllCients().subscribe({
      next: (data) => {
        this.clients = data;
       

      },
      error: (err) => {
        console.log(err)
        // this.router.navigate(['/authentication/login'])
      }
    })

    // combineLatest([this.currentPage$, this.pageSize$])
    //   .pipe(
    //     switchMap(([page, limit]) => this.userService.getUsers(page, limit))
    //   )
    //   .subscribe((res: any)=>{
    //     this.users.next(res.items);
    //     this.totalUsers.next(res.total);
    //     this.totalPages.next(res.totalPages);

    //   })

    // const totalPages$ = Math.ceil(res.total / this.pageSize);
    // this.totalPages.next(totalPages$);

    // this.pages = Array.from({length: totalPages$}, (_, i) => i + 1);


  }
 get modalTitle(): string {
    return this.modalType === 'team-lead' ? 'Create New Team Lead' : 'Create New Team Member';
 }

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
toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;

    if (this.isMenuOpen) {
    } else {
      this.clickOutsideArea = false;
    }
  }

  private overlayRef: OverlayRef | null = null;
  
  editTeamMember( id:any) {
    this.openAddTeamMemberDialog(id, "Edit Team Members");
  }

  addTeamMember() {
    this.openAddTeamMemberDialog(0, "Create Team Member");
  }

  openAddTeamMemberDialog(id:any , title:any){
   const popup= this.dialog.open(AddTeamMemberPopupComponent,{
      width: "500px",
      data:{
        title:title,
        id:id
      }
    });
  }

  addTeamLead() {
    this.openAddTeamLeadDialog(0, "Create Team Lead");
  }

  openAddTeamLeadDialog(id:any , title:any){
    const addLeadPopup= this.dialog.open(AddTeamLeadPopupComponent,{
       width: "500px",
       data:{
         title:title,
         id:id
       }
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

    const clickedInside = this.menu.nativeElement.contains(event.target as Node);
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

  openModal(type: 'teamLead'|'createTeamMember'|'assignMembers') {
    if(type === 'teamLead'){
      this.activeModal = 'teamLead'
    }
    else if(type === 'createTeamMember'){
      this.activeModal = 'createTeamMember'
    }
    else if (type === 'assignMembers'){
      this.activeModal = 'assignMembers'
    }
    this.modal.openModal(this.activeModal);
  }

}
