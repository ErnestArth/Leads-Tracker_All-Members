import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  @Output() onCancel = new EventEmitter<void>();
  areChangesSaved = false;
  profileForm: FormGroup;
  resetPage = true;
  successPage = false;
  showErrors = false;
  showGuide = false;
  fieldTextType = false;
  fieldTextTypeCurrent = false;
  fieldTextTypeNew = false;
  fieldTextTypeConfirm = false;
  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;
  hasUpperCase = false;
  hasLowerCase = false;
  hasNumber = false;
  hasSpecialChar = false;
  hasMinLength = false;
  isOpenOverview = false;

  error: string | null = null;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      firstName: ['Freda', Validators.required],
      otherNames: ['Yaa Nketiah', Validators.required],
      businessEmail: [
        'username@domain.com',
        [Validators.required, Validators.email],
      ],
      phoneNumber: ['024 000 1111', Validators.required],
      role: ['Admin', Validators.required],
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmNewPassword: ['', [Validators.required]],
    });
  }

  onChangePassword(): void {
    if (
      this.profileForm.value.newPassword &&
      this.profileForm.value.newPassword ===
        this.profileForm.value.confirmNewPassword
    ) {
      console.log('Password changed successfully');
      // Add your password change logic here
    } else {
      alert('Passwords do not match');
    }
  }

  onSaveChanges() {
    this.areChangesSaved = !this.areChangesSaved;
  }
  cancel() {
    this.onCancel.emit();
  }
  checkPasswordRules(): void {
    const password = this.profileForm.get('password')?.value;

    this.hasUpperCase = /[A-Z]/.test(password);
    this.hasLowerCase = /[a-z]/.test(password);
    this.hasNumber = /\d/.test(password);
    this.hasSpecialChar = /[^A-Za-z0-9]/.test(password);
    this.hasMinLength = password.length >= 8;
  }
  toggleFieldTextType(field: 'current' | 'new' | 'confirm') {
    if (field === 'current') {
      this.showCurrentPassword = !this.showCurrentPassword;
      this.fieldTextTypeCurrent = !this.fieldTextTypeCurrent;
    } else if (field === 'new') {
      this.showNewPassword = !this.showNewPassword;
      this.fieldTextTypeNew = !this.fieldTextTypeNew;
    } else if (field === 'confirm') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
    this.fieldTextType = !this.fieldTextType;
  }

  onBackArrow(type: string): void {
    this.isOpenOverview = this.isOpenOverview;
  }
}
