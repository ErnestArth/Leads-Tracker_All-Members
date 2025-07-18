import { Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  standalone: false,
})
export class DialogComponent implements OnInit {
  @Input() modalType: 'team-lead' | 'team-member' = 'team-lead';
  @Input() visible: boolean = false;
  @Input() teamMembers: { id: number, name: string }[] = [];
  @Output() submit = new EventEmitter<any>();
  @Output() close = new EventEmitter<any>();

get modalTitle(): string {
  return this.modalType === 'team-lead'  ? 'Create New Team Lead' : 'Create New Team Member';
}




  modalForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      otherNames: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]),
      staffId: new FormControl('', Validators.required),

    });;
  isModalOpen = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.modalForm
    this.teamMembers = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
      { id: 3, name: 'Alice Johnson' },
      { id: 4, name: 'Bob Brown' }
    ];
    if (this.modalType === 'team-member') {
      this.modalForm.get('team-lead')?.setValidators([Validators.required]);
    } else {
      this.modalForm.get('team-lead')?.clearValidators();
    }
    this.modalForm.get('team-lead')?.updateValueAndValidity();
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  onCancel(): void {
    this.close.emit();
  }

  submitForm(): void {
    if (this.modalForm.valid) {
      console.log('Form Data:', this.modalForm.value);
      alert('Form submitted successfully!');
      this.onCancel();
    } else {
      this.modalForm.markAllAsTouched();
    }
    const assignedMember = this.modalForm.get('staffId')?.value;
    if (assignedMember) {
      console.log('Assigned Member:', assignedMember);
    }
  }

  saveModal(): void {
    if (this.modalForm.valid) {
      const formData = this.modalForm.value;

      console.log('Form Data:', formData);
      alert('Form saved successfully!');
      const modalData = {
        type: this.modalType,
        data: formData
      };


      localStorage.setItem('modalData', JSON.stringify(modalData));

      console.log('Form saved to localStorage:', modalData);
      this.close.emit();
    }
  }


}
