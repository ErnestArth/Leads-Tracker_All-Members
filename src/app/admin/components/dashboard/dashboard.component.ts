import { Component, OnInit, AfterViewInit, HostListener, ElementRef, NgZone, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import { DialogComponent } from '../../dialog/dialog.component';

import {Chart, Colors, registerables, scales} from 'chart.js';
import { ComponentPortal } from '@angular/cdk/portal';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})


export class DashboardComponent  {
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


constructor(private fb: FormBuilder, private overlay: Overlay, private zone: NgZone) {}

  ngOnInit(): void {
    this.modalForm = this.fb.group({
      firstName: ['', Validators.required],
      otherNames: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      staffId: ['', Validators.required],
    });
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
      this.zone.runOutsideAngular(() => {
        setTimeout(() => {
          this.clickOutsideArea = true;
        }, 0);
      });
    } else {
      this.clickOutsideArea = false;
    }
  }

  private overlayRef: OverlayRef | null = null;




  openModal(type: 'team-lead' | 'team-member') : void {
    this.isModalOpen = true;
    this.isModalOpen = true;
    this.clickOutsideArea = false;
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-dark-backdrop',
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    });

    const portal = new ComponentPortal(DialogComponent);
    const componentRef = this.overlayRef.attach(portal);

    this.overlayRef.backdropClick().subscribe(() => this.closeModal());

    componentRef.instance.onCancel();

    componentRef.instance.submitForm.apply((formData: any) => {
      console.log ('Form Submitted:', formData);
      this.closeModal();
    });

  }

  private closeModal(): void {
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
      this.zone.run(() => {
        this.isMenuOpen = false;
        this.clickOutsideArea = false;
      });
    }
  }


}
