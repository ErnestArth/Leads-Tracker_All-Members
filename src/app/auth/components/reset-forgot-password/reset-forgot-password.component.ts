import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  AbstractControl,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { AuthService } from '../../AuthServices';
import { forgotPasswordResponse } from '../../AuthServices';
import { resendOtpResponse } from '../../AuthServices';
import { resendOtpRequest } from '../../AuthServices';

@Component({
  selector: 'app-reset-forgot-password',
  standalone: false,
  templateUrl: './reset-forgot-password.component.html',
  styleUrl: './reset-forgot-password.component.css',
})
export class ResetForgotPasswordComponent implements OnInit {
  // source: 'isFromLogin' | 'isEmailValid'|null = null;
  forgotPasswordPage = true;
  isFromLogin = false;
  isEmailValid = false;
  emailDoesNotExist = false;
  emailForgotPasswordFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  emailForgotPasswordForm: FormGroup;

  //  emailIsUnique(control:AbstractControl){
  //   const existingEmails =['solv@solv.com']
  //   if(control.value.includes(existingEmails)){
  //     return of(null);

  //   }
  //   return of ({emailNotFound:true})
  //  }

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.emailForgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.emailForgotPasswordFormControl.valueChanges.subscribe({
      next: (value: any) => {
        console.log(value);
      },
    });

    //   this.route.queryParams.subscribe(params => {
    //   //  this.source = params['source']?? null;
    //   //  console.log('State from query param:', this.source);
    //   //  console.log(this.source === 'isFromLogin');
    //   const source = params['source'];
    //   this.isFromLogin = source === 'login';
    //   this.isEmailValid = source === 'email';
    //   console.log(source)
    // });
  }

  onSubmit(): void {
    if (this.emailForgotPasswordForm.valid) {
      this.authService
        .verifyforgotPassword(this.emailForgotPasswordForm.value)
        .subscribe({
          next: (response: forgotPasswordResponse) => {
            if (
              response.message ===
              'Password reset instructions have been sent to your email.'
            ) {
              console.log(response);
              this.isEmailValid = true;
              console.log(this.isEmailValid);
              this.emailDoesNotExist = false;
              this.forgotPasswordPage = false;
              console.log('Login response:', response);
            } else if (
              response.message !==
              'Password reset instructions have been sent to your email.'
            ) {
              this.emailDoesNotExist = true;
              this.isEmailValid = true;
              this.forgotPasswordPage = false;
              console.log(this.forgotPasswordPage);
              console.log(this.isEmailValid);
              console.log(this.emailDoesNotExist);
              // console.log('Login response:', response);
            }
          },
          error: (err) => {
            this.emailDoesNotExist = false;
            this.forgotPasswordPage = false;
            this.isEmailValid = true;
            console.log(err.error?.message || 'Login failed');
          },
        });

      console.log(this.emailForgotPasswordForm.value);
    } else {
      this.emailForgotPasswordForm.markAllAsTouched();
      this.emailDoesNotExist = true;
      this.isEmailValid = false;
      this.isFromLogin = false;
    }
  }
}
