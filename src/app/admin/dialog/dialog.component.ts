import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  standalone: false, 
})
export class DialogComponent {
  modalForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      otherNames: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      staffId: new FormControl('', Validators.required),
    });;
  isModalOpen = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.modalForm
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.modalForm.reset();
  }

  submitForm(): void {
    if (this.modalForm.valid) {
      console.log('Form Data:', this.modalForm.value);
      alert('Form submitted successfully!');
      this.closeModal();
    } else {
      this.modalForm.markAllAsTouched();
    }
  }
}
