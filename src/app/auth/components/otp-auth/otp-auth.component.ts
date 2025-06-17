import { Component } from '@angular/core';
import { FormGroup, FormsModule, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-otp-auth',
  standalone: false,
  templateUrl: './otp-auth.component.html',
  styleUrl: './otp-auth.component.css'
})
export class OtpAuthComponent { 
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });


  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      console.log('Form Submitted!', formData);
    } else {
      console.log('Form is invalid');
    }
  }
}


