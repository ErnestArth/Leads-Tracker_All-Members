import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { AbstractControl, Form, FormBuilder,FormControl,FormGroup,ValidationErrors,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResetPasswordResponse, ResetPasswordRequest,AuthService} from '../../AuthServices';
import { HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-resetting-password',
  standalone: false,
  templateUrl: './resetting-password.component.html',
  styleUrl: './resetting-password.component.css'
})
export class ResettingPasswordComponent implements OnInit{


  ResettingPasswordForm:FormGroup;
  ResettingPasswordFormControl =new FormControl ('',[Validators.required])
  resetPage = true
  successPage = false
  showErrors = false
  showGuide = false
  fieldTextType2= false
  fieldTextType= false

  hasUpperCase = false
  hasLowerCase = false
  hasNumber = false
  hasSpecialChar = false
  hasMinLength = false

  error: string | null = null;

  constructor(private fb: FormBuilder,private router: Router, private authService: AuthService) {
    this.ResettingPasswordForm=this.fb.group({
      password: ['',[
        Validators.required,
        Validators.minLength(8),
        this.strongPasswordValidator
      ]],
      confirmPassword: ['',Validators.required]
    },
    {validators: this.passwordsMatchValidator}

  );
  }

  checkPasswordRules(): void {
    const password = this.ResettingPasswordForm.get('password')?.value;

    this.hasUpperCase = /[A-Z]/.test(password);
    this.hasLowerCase = /[a-z]/.test(password);
    this.hasNumber = /\d/.test(password);
    this.hasSpecialChar = /[^A-Za-z0-9]/.test(password);
    this.hasMinLength = password.length >= 8;
  }





  strongPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    const valid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!./%*#?&]{8,}$/.test(value);
    if (valid) {
      return null;
    } else {
      return { weakPassword: true };
    }
  }


  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
  ngOnInit(): void {
    this.ResettingPasswordForm.valueChanges.subscribe({
      next: (value:any) =>{
        console.log(value)
        if(value){
          this.showGuide= true
          console.log(this.showGuide)
        }
      }
    });

    this.router.routerState.root.queryParams.subscribe((params: any) => {
      const token = params['token'];
      if (token) {
        sessionStorage.setItem('resetToken', token);
      }
    });
  }


  onSubmit(): void{

    const token = localStorage.getItem('resetPaswordToken');
    const  newPassword = this.ResettingPasswordForm.get('password')?.value
    const confirmNewPassword = this.ResettingPasswordForm.get('confirmPassword')?.value

    let payload : ResetPasswordRequest;
    if(token){
      payload = {token,newPassword,confirmNewPassword}
    }else{
      console.log('No token found')
      return
    }
    console.log(payload)

    if (this.ResettingPasswordForm.valid){

      this.authService.resetpassword(payload).subscribe({
        next: (response: ResetPasswordResponse) => {
          console.log('Reset Password Response', response);

  }
})


      // this.router.navigate(['/login']);
      this.resetPage = false
      this.successPage = true
      console.log('Afaluwa')
    }else{
      this.showErrors = true
      this.ResettingPasswordForm.markAllAsTouched();
    }
  }


  toggleFieldTextType2() {
    this.fieldTextType2 = !this.fieldTextType2;
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}


