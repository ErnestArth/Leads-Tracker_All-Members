
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
  role: string;
  token: string ;
}

export interface VerifyOtpRequest {
  email : string | null;
    otp: string | null;
}
export interface VerifyOtpResponse {

    status: string;
    token: string;

}

export interface resendOtpRequest{
  email: string | null;
}

export interface resendOtpResponse{
  message: string;
  timestamp: string;
  details: {
    resendAttemptsRemaining:string;
  }
  status: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string | null;
  confirmNewPassword : string | null;
}

export interface ResetPasswordResponse {
  status: string;
  email: string;
  message: string;
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
  private email: string | null = null;
  private password: string | null = null;
  private apiUrl = 'http://13.61.145.166:8080';
//  http://127.0.0.1:4010
//   http://13.48.84.210:8080
// leads-tracker/leads/login

  constructor(private http: HttpClient) {}

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/leads-tracker/leads/login`, credentials);
    // /leads-tracker/leads/login
  }

  verifyOtp(otpRequest: VerifyOtpRequest): Observable<VerifyOtpResponse> {
    return this.http.post<VerifyOtpResponse>(`${this.apiUrl}/leads-tracker/api/v1/leads/verify-otp`, otpRequest);
    // /leads-tracker/api/v1/leads/verify-otp
    // /verify-otp
  }

  verifyforgotPassword(forgotPasswordRequest: forgotPasswordRequest): Observable<forgotPasswordResponse> {
    return this.http.post<forgotPasswordResponse>(`${this.apiUrl}/leads-tracker/api/v1/leads/forgot-password-request`, forgotPasswordRequest);
    // /leads-tracker/api/v1/leads/forgot-password-request
    // /forgot-password-request
  }

resetpassword(ResetPasswordRequest: ResetPasswordRequest): Observable<ResetPasswordResponse>{
  return this.http.post<ResetPasswordResponse>(`${this.apiUrl}/leads-tracker/api/v1/leads/reset-password`, ResetPasswordRequest);
  // /leads-tracker/api/v1/leads/reset-password
  // /reset-password
}

resendOtp(resendOtpRequest: resendOtpRequest): Observable<resendOtpResponse>{
  return this.http.post<resendOtpResponse>(`${this.apiUrl}/leads-tracker/api/v1/leads/resend-otp`, resendOtpRequest);
}

  setEmail(email: string) {
    this.email = email;
    sessionStorage.setItem('email', email);
  }

  setPassword(password: string) {
    this.password = password;
    sessionStorage.setItem('password', password);
  }

  saveToken (token: string) : void{
    sessionStorage.setItem('token', token);
  }
  hasEmail(): boolean {
    return !!this.email;
  }

  hasEmailAndPassword(): boolean {
    return !!this.email && !!this.password;
  }

  saveResetPasswordToken(token: string): void {
    sessionStorage.setItem('resetPasswordToken', token);
  }

  getEmail(): string | null {
    return this.email || sessionStorage.getItem('email');
  }

  getPassword(): string | null {
    return this.password || sessionStorage.getItem('password');
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  getResetToken(): string | null {
    return sessionStorage.getItem('resetPasswordToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

logout(): void {
    this.email = null;
    this.password = null;
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('password');
    sessionStorage.removeItem('token');
}



}
