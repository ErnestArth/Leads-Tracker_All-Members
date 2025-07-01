import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { AbstractControl, Form, FormBuilder,FormControl,FormGroup,ValidationErrors,Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private fb: FormBuilder,private router: Router){
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

    console.log(this.hasUpperCase);
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
    })

  }



  onSubmit(): void{

    if (this.ResettingPasswordForm.valid){
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
