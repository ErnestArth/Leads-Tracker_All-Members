import { Component, inject, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {FormGroup, FormBuilder,AbstractControl,ValidationErrors} from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../AuthServices';
import { LoginResponse } from '../../AuthServices';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  loginForm: FormGroup ;
  
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  fieldTextType = false
 
 
  

  constructor(private fb: FormBuilder,private router: Router, private authService: AuthService) {
    

    this.loginForm = this.fb.group({
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
    const valid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/.test(value);
    if (valid) {
      return null;
    } else {
      return { weakPassword: true };
    }
  }





  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
  
      this.authService.login(this.loginForm.value).subscribe({
        next: (response: LoginResponse) => {
          console.log('Login response:', response);
  
          if (response.status === 'OTP_SENT') {
            localStorage.setItem('login_email', response.email);
  
           
            this.router.navigate(['/otp-auth']);
          } else {
            alert('Unexpected response status: ' + response.status);
          }
        },
        error: (err) => {
          alert(err.error?.message || 'Login failed');
        }
      });
  
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  
  
}

