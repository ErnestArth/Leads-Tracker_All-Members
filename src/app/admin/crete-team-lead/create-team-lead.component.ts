import { Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './create-team-lead.component.html',
  styleUrls: ['./create-team-lead.component.css'],
  standalone: false,
})
export class CreateTeamLeadComponent  {
  closeModal() {
    throw new Error('Method not implemented.');
  }
  // @Input() modalType: string = '';
  // @Input() visible: boolean = false;
  // @Input() teamMembers: { id: number, name: string }[] = [];
  // @Output() submit = new EventEmitter<any>();
  // @Output() close = new EventEmitter<any>();
  router: any;
  submitForm: any;


// get modalTitle(): string {
//   return this.modalType === 'team-lead'  ? 'Create New Team Lead' : 'Create New Team Member';
// }

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



  // onClose(): void {
  //   this.close.emit();
  //   // this.dialogRef.close();
  // }

    onSubmit(): void {
    if (this.modalForm.invalid) {
      console.log('Form is invalid');
      return;
    }
  this.showSuccess = true;
}

@Output() onCancel = new EventEmitter<void>();

cancel(){
  this.onCancel.emit();
}
// createAnotherTeamLead(): void {
//     this.modalForm.reset();
//     this.isModalOpen = true;
    
//   }

  backToDashboard(): void {
    this.router.navigate(['/admin/dashboard']);
  }

  onSaveChanges(): void {
    if (this.modalForm.valid) {
      this.modalForm.reset()
    }
    this.showSuccess=false
    
  }

}

