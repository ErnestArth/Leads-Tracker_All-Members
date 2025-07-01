
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  email: string;
  message: string;
  status: string; 
}

export interface VerifyOtpRequest {
    email: string | null;
    otp: string | null;
    
}
export interface VerifyOtpResponse {
   
    status: string;
    token: string;
     
}

export interface forgotPasswordRequest {
  email: string;
}

export interface forgotPasswordResponse{
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:4010'; 

//   http://13.48.84.210:8080
// leads-tracker/leads/login

  constructor(private http: HttpClient) {}

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials);
  }

  verifyOtp(otpRequest: VerifyOtpRequest): Observable<VerifyOtpResponse> {
    return this.http.post<VerifyOtpResponse>(`${this.apiUrl}/verify-otp`, otpRequest);
  }

  verifyforgotPassword(forgotPasswordRequest: forgotPasswordRequest): Observable<forgotPasswordResponse> {
    return this.http.post<forgotPasswordResponse>(`${this.apiUrl}/leads-tracker/api/v1/leads/forgot-password-request`, forgotPasswordRequest);
  }

}
