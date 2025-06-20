import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {FormGroup, FormBuilder,AbstractControl,ValidationErrors} from '@angular/forms';

@Component({
  selector: 'app-otp-auth',
  standalone: false,
  templateUrl: './otp-auth.component.html',
  styleUrl: './otp-auth.component.css'
})
export class OtpAuthComponent {

  otpLoginForm: FormGroup ;


  constructor(private fb: FormBuilder) {
    this.otpLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        this.strongPasswordValidator
      ]]
    });
  }

  strongPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    const valid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&+]{8,}$/.test(value);
    return valid ? null : { weakPassword: true };
  }

  onSubmit(): void {
    if (this.otpLoginForm.valid) {
      console.log('Form submitted:', this.otpLoginForm.value);
    } else {
      this.otpLoginForm.markAllAsTouched(); // Show all errors
    }
  }

}
