import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-forgot-password',
  standalone: false,
  templateUrl: './reset-forgot-password.component.html',
  styleUrl: './reset-forgot-password.component.css'
})
export class ResetForgotPasswordComponent {

  resetPassword: FormGroup ;


  constructor(private fb: FormBuilder) {
    this.resetPassword = this.fb.group({
      newPassword:  ['', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?!.*\s).+$/)
  ]],
      confirmNewpassword: ['', [Validators.required, Validators.pattern('newPassword')]],
}, {
  validators: [this.passwordsMatchValidator]
});
  }

  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmNewPassword')?.value;
    if (!newPassword || !confirmPassword) return null;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };}


  onSubmit(): void {
    if (this.resetPassword.valid) {
      console.log('Form submitted:', this.resetPassword.value);
    } else {
      this.resetPassword.markAllAsTouched(); // Show all errors
    }
  }

  get newPassword() { return this.resetPassword.get('newPassword'); }
  get confirmPassword() { return this.resetPassword.get('confirmNewPassword'); }


  requestNewResetLink() {
}
}

