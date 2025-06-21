import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FormGroup, FormBuilder,AbstractControl,ValidationErrors,Validators} from '@angular/forms';
import { FormControl } from '@angular/forms';




@Component({
  selector: 'app-reset-forgot-password',
  standalone: false,
  templateUrl: './reset-forgot-password.component.html',
  styleUrl: './reset-forgot-password.component.css'
})
export class ResetForgotPasswordComponent implements OnInit {
  // source: 'isFromLogin' | 'isFromEmail'|null = null;
  isFromLogin = false;
  isFromEmail = false;
  emailExists = false;
  emailDoesNotExist = false
  emailForgotPasswordFormControl = new FormControl('', [Validators.required,Validators.email])
  emailDb ='mot@mot.com';
  emailForgotPasswordForm:FormGroup;
  emailMatch =false
 

  constructor(private route: ActivatedRoute,private fb: FormBuilder) {
    this.emailForgotPasswordForm= this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    })

    
  }

  ngOnInit(): void{

    this.emailForgotPasswordFormControl.valueChanges.subscribe({
      next: (value:any) =>{
        console.log(value)
     if(value.toString() === this.emailDb){
      this.emailMatch = true
     }
        
      }
    })
    


      this.route.queryParams.subscribe(params => {
      //  this.source = params['source']?? null;
      //  console.log('State from query param:', this.source);
      //  console.log(this.source === 'isFromLogin');
      const source = params['source'];
      this.isFromLogin = source === 'login';
      this.isFromEmail = source === 'email';
      this.emailExists = source === 'email-exists';
      console.log(source)
    });
  }




  onSubmit(): void{

    // this.emailDb.forEach(email =>{
    //   if(email === value){
    //    this.emailMatch = true
    //   }
    // })
    if(this.emailForgotPasswordForm.valid){
      console.log(this.emailForgotPasswordForm.value);
      this.emailExists = true;
      console.log(this.emailExists)
      this.isFromEmail =false;
      this.isFromLogin = false;
      
     
      

    }else{
      this.emailForgotPasswordForm.markAllAsTouched()
      this.emailDoesNotExist =true
      this.isFromEmail =false;
      this.isFromLogin = false;
      this.emailExists = false;
      
    }
  }

  


}
