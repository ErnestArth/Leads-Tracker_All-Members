import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgOtpInputComponent } from 'ng-otp-input';
import { HttpClientModule } from '@angular/common/http';
import { AdminModule } from './admin/admin.module';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



// import { ResettingPasswordComponent } from './auth/components/resetting-password/resetting-password.component';

@NgModule({
  declarations: [
    AppComponent,
    
  
  




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    HttpClientModule,
    FontAwesomeModule ,
    AdminModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
