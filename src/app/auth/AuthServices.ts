
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
  email : string | null;
    otp: string | null;
}
export interface VerifyOtpResponse {

    status: string;
    message: string;
        data: {
          user_id: string;
          access_token: string;
          token_type: string;
        }

}
export interface ResetPasswordRequest {
  token: string;
  newPassword: string | null;
  confirmNewPassword : string | null;
}

export interface ResetPasswordResponse {
  status: string;
  message: string;
  token_type: string;
  access_token: string;

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
  private apiUrl = 'http://16.16.217.252:8080';
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


}
