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
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { MatFormField } from '@angular/material/form-field';



// import { ResettingPasswordComponent } from './auth/components/resetting-password/resetting-password.component';
import { HttpClientModule } from '@angular/common/http';


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
    HttpClientModule,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    // {provide: HTTP_INTERCEPTORS, useClass: UserService, multi: true},

  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
