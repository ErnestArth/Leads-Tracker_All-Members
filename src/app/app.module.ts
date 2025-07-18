import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgOtpInputComponent } from 'ng-otp-input';
import { AdminModule } from './admin/admin.module';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



import { Dash2Component } from './admin/components/dash2/dash2.component';
import { DialogComponent } from './admin/dialog/dialog.component';

// import { ResettingPasswordComponent } from './auth/components/resetting-password/resetting-password.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,







  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    FontAwesomeModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
