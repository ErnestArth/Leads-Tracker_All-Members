import { Component, OnInit, viewChild } from '@angular/core';
import { NgOtpInputComponent, NgOtpInputConfig } from 'ng-otp-input';
import {FormControl, FormGroup,FormBuilder, Validators} from '@angular/forms';
import { ViewChild } from '@angular/core';
import { VerifyOtpResponse } from '../../AuthServices';
import { AuthService } from '../../AuthServices';



@Component({
  selector: 'app-otp-auth',
  standalone: false,
  templateUrl: './otp-auth.component.html',
  styleUrl: './otp-auth.component.css'
})
export class OtpAuthComponent implements OnInit {
  config:NgOtpInputConfig={
    length: 6,inputStyles: {
      width: '30px',
      height: '30px',
      fontSize: '16px',
      color:'#4B5675',
      fontWeight:'500',
      
    }
    ,allowNumbersOnly:true
  }

  errorMessage: string ='';
  isOtpFailed: boolean = false;

  otpFailCount: number = 0;
  remainingTime: String ='';
  otpRemainingTime: String ='';
  temporalBlock: number = 3;
  maxAttempts: number =5;
  lockStartTime: number | null = null;
  otpStartTime: number  = Date.now();
  lockDurationMs = 5000;
  otpDurationMs = 5000;
  isLocked: boolean = false;
  showAccessDenied: boolean = false;
  isPermanentlyLocked: boolean =false

  otpCode: number = 0
  isVerified : boolean = false
  otpFormControl = new FormControl('', [Validators.required])
  isLoading:boolean =false;

  otpForm: FormGroup;
  pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
  

  constructor(private authService: AuthService) {
    this.otpForm = new FormGroup({})
   }
  @ViewChild('ngOtpInput',{static:false}) ngOtpInput!: NgOtpInputComponent

  ngOnInit(): void {
      // this.generateNumber();

      this.otpFormControl.valueChanges.subscribe({
        next: (value: any) =>{
          console.log(value)

          if(value.length === this.config.length){
            this.onSubmit();
          }
        }
      })

      setInterval(() => {
        this.startLockTimer();
      }, 1);

      setInterval(() => {
        this.startOtpTimer();
      }, 1);
  }
  // generateNumber(){
  //   this.otpCode = Math.floor(100000 + Math.random() * 9000);
  //   console.log('otp code is', this.otpCode);
  // }

  onSubmit(): void {
    this.authService.verifyOtp(this.otpForm.value).subscribe({
      next: (response: VerifyOtpResponse) => {
        console.log('Login response:', response);
       
        
        // setTimeout(() => {
          
          

          if(response.status === 'success'){
            this.isVerified = true
            this.isOtpFailed= false
            this.otpFailCount = 0;
            console.log(response)
            this.errorMessage = '';
          }else{
            this.ngOtpInput?.setValue('');
            this.isVerified =false
            this.config.inputStyles ={
              'width': '30px',
              'height': '30px',
              'fontSize': '16px',
              'color':'#4B5675',
              'fontWeight':'500',
              'border': '1px solid red'
            }
            this.errorMessage ='Invalid OTP. Please try again'
            // this.isOtpFailed=true
            this.otpFailCount++;
            console.log(this.otpFailCount)
            console.log(this.lockStartTime)
          }

          
        // },2000)
       
      

        //  temporal and permanent lock logic
      if (this.otpFailCount === 3) {
        this.isLocked = true;
        this.lockStartTime = Date.now();
        this.errorMessage = 'You have been locked for 5 minutes.';
      } else if (this.otpFailCount >= this.maxAttempts) {
        this.isPermanentlyLocked = true;
        this.showAccessDenied = true;
        this.errorMessage = '';
        console.log('show time')
      }

    this.ngOtpInput.otpForm.enable();
    this.isLoading = false

      }
      })
    }


    startLockTimer() {
      if (this.lockStartTime) {
        const now = Date.now();
        const timeSinceLock = now - this.lockStartTime;
    
        if (timeSinceLock >= this.lockDurationMs) {
          
          this.isLocked = false;
          this.lockStartTime = null;
          this.errorMessage = '';
        } else {
         
          this.isLocked = true;
        }
      
  
        // Temporal Screen timer
        const timeLeftMs = this.lockDurationMs - timeSinceLock;
  
        if (timeLeftMs > 0) {
          const secondsLeft = Math.ceil(timeLeftMs / 1000);
          const minutes = Math.floor(secondsLeft / 60);
          const seconds = secondsLeft % 60;
  
          // add zeros to the timer
          this.remainingTime = `${this.pad(minutes)}:${this.pad(seconds)}`;
        } else {
          this.remainingTime = '0:00';
          this.isLocked = false;
          this.lockStartTime = null;
          this.errorMessage = '';
        }
  
        
      }
    }
  
    startOtpTimer() {
      const now = Date.now();
      const timeSinceOtp = now - this.otpStartTime;
      const otpTimeLeftMs = this.otpDurationMs - timeSinceOtp;
    
      if (otpTimeLeftMs > 0) {
        const secondsLeft = Math.ceil(otpTimeLeftMs / 1000);
        const minutes = Math.floor(secondsLeft / 60);
        const seconds = secondsLeft % 60;
        this.otpRemainingTime = `${this.pad(minutes)}:${this.pad(seconds)}`;
      } else {
        this.otpRemainingTime = '0:00';
       
      }
    }
  
    pad2(num:number){
      if(num<10){
        return '0'+num;
      }else{
        return num.toString();
      }
    }

  }
  