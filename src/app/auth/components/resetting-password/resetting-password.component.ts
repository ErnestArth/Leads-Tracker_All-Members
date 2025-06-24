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


  constructor(private fb: FormBuilder,private router: Router){
    this.ResettingPasswordForm=this.fb.group({
      password: ['',[
        Validators.required,
        Validators.minLength(8),
        this.strongPasswordValidator
      ]],
      confirmPassword: ['',Validators.required]
    },
    {Validators: this.passwordsMatchValidator}
  );
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

  passwordsMatchValidator(group: AbstractControl): { [key: string]: any } | null {
    const password = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }
  ngOnInit(): void {
    this.ResettingPasswordFormControl.valueChanges.subscribe({
      next: (value:any) =>{
        console.log(value)
        
      }
    })
    
  }
 

  onSubmit(): void{
    console.log("yu")
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


}