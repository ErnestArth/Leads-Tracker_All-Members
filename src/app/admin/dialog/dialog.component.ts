import { Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  standalone: false,
})
export class DialogComponent implements OnInit {
  @Input() modalType: string = '';
  @Input() visible: boolean = false;
  @Input() teamMembers: { id: number, name: string }[] = [];
  @Output() submit = new EventEmitter<any>();
  @Output() close = new EventEmitter<any>();
  router: any;


get modalTitle(): string {
  return this.modalType === 'team-lead'  ? 'Create New Team Lead' : 'Create New Team Member';
}



  isModalOpen = false;
  showSuccess = false;

  constructor(private fb: FormBuilder) {}

  modalForm!: FormGroup;
  ngOnInit(): void {
    this.modalForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      otherNames: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
      staffId: ['', Validators.required],
    });
  }

  onCancel(): void {
    this.close.emit();
  }

    submitForm(): void {
    if (this.modalForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    const formData = this.modalForm.value;
    console.log('Form Submitted:', formData);

    if (this.modalForm.invalid) {
    this.modalForm.markAllAsTouched();
    return;
}
  this.showSuccess = true;
}

createAnotherTeamLead(): void {
    this.modalForm.reset();
    this.isModalOpen = true;
    this.modalType = 'team-lead';
  }

  backToDashboard(): void {
    this.close.emit();
    this.router.navigate(['/admin/dashboard']);
  }


}

