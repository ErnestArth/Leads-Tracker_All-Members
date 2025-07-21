import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgOtpInputComponent } from 'ng-otp-input';
import { AdminModule } from './admin/admin.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';



import { Dash2Component } from './admin/components/dash2/dash2.component';
import { DialogComponent } from './admin/dialog/dialog.component';

// import { ResettingPasswordComponent } from './auth/components/resetting-password/resetting-password.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';

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
    FontAwesomeModule,
    HttpClientModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
