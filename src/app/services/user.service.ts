import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id?: number;
  name: string;
  // add other user fields here
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = '/api/users'; // base endpoint

  constructor(private http: HttpClient) {}

  // Get all users with pagination
  getUsers(page: number, limit: number): Observable<User[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get<User[]>(this.apiUrl, { params });
  }

  // Get a user by ID
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/leads-tracker/api/v1/leads/${id}`);
  }

  // Add a new user
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  // Update user profile by ID
  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/leads-tracker/api/v1/leads/${id}`, user);
  }

  // Delete user by ID
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/leads-tracker/api/v1/leads/${id}`);
  }
}
