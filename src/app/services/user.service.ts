import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface createTeamMember {
  firstName:string,
  lastName:string,
  email:string,
  password:string,
  phoneNumber: string,
  staffId: string,
  role: string,
  teamLeadUserId:string
}
export interface createTeamLead {
  firstName:string,
  lastName:string,
  email:string,
  password:string,
  phoneNumber: string,
  staffId: string,
  role: string,
}

export interface createTeamMemberResponse {
  firstName:string,
  lastName:string,
  email:string,
  password:string,
  phoneNumber: string,
  staffId: string,
  role: string,
  userId:string
}


export interface  specificTeamMembers{
        userId: string
        firstName: string
        lastName: string
        email: string
        role: string
        phoneNumber: string
        staffId: string
}

export interface getAllTeamLeads{
  userId: string
  firstName: string
  lastName: string
  email: string
  role: string
  phoneNumber: string
  staffId: string
  teamPerformance: string
  memberPerformance: string
}

export interface getAllClients{
  clientId: string
  firstName: string
  lastName: string
  phoneNumber: string
  lastUpdated: string
}



// const token =localStorage.getItem('token')
// console.log(token)
// const headers = new HttpHeaders({
//     'Authorization' : `Bearer ${token}`
// })


@Injectable({
  providedIn: 'root'
})
export class UserService {




  private apiUrl = 'http://56.288.17.87:8080'; //


  private teamMembers:createTeamMember[]=[];

  private specificTeamMembers:specificTeamMembers[]=[]







  constructor(private http: HttpClient) {}
// create a team member
  addTeamMember(teamMember: createTeamMember[]): Observable<void> {

    const token =localStorage.getItem('token')
    const headers = new HttpHeaders({'Authorization' : `Bearer ${token}`
  })
    return this.http.post<void>(`${this.apiUrl}/leads-tracker/api/v1/leads`, teamMember,{headers} );

  }

  // create a team lead
  addTeamLead(request: createTeamLead): Observable<void> {

    const token =localStorage.getItem('token')
    const headers = new HttpHeaders({'Authorization' : `Bearer ${token}`})
    return this.http.post<void>(`${this.apiUrl}/leads-tracker/api/v1/leads`, request,{headers})
  }

  // get team members under a specific team lead

  getTeamMembers(): Observable<specificTeamMembers[]> {
    const token =localStorage.getItem('token')
    const headers = new HttpHeaders({'Authorization' : `Bearer ${token}`
  })
    return this.http.get<specificTeamMembers[]>(`${this.apiUrl}/leads-tracker/api/v1/leads/team-leads/l5g9duv5POh5Dad4Tvpz2xiZTDFNwZ/members`,{headers} );
  }

  getAllTeamLeads():Observable<getAllTeamLeads[]> {
    const token =localStorage.getItem('token')
    const headers = new HttpHeaders({'Authorization' : `Bearer ${token}`
  })
    return this.http.get<getAllTeamLeads[]>(`${this.apiUrl}/leads-tracker/api/v1/leads/team-leads`,{headers} );
  }

  getAllCients():Observable<getAllClients[]> {
    const token =localStorage.getItem('token')
    const headers = new HttpHeaders({'Authorization' : `Bearer ${token}`})
    return this.http.get<getAllClients[]>(`${this.apiUrl}/leads-tracker/api/v1/clients/all-clients`,{headers});
  }



  // constructor(private http: HttpClient) {}

  // // Get all users with pagination
  // getUsers(page: number, limit: number): Observable<User[]> {
  //   const params = new HttpParams()
  //     .set('page', page.toString())
  //     .set('limit', limit.toString());
  //   return this.http.get<User[]>(this.apiUrl, { params });
  // }

  // // Get a user by ID
  // getUserById(id: number): Observable<User> {
  //   return this.http.get<User>(`${this.apiUrl}/leads-tracker/api/v1/leads/${id}`);
  // }

  // // Add a new user
  // addUser(user: User): Observable<User> {
  //   return this.http.post<User>(this.apiUrl, user);
  // }

  // // Update user profile by ID
  // updateUser(id: number, user: Partial<User>): Observable<User> {
  //   return this.http.put<User>(`${this.apiUrl}/leads-tracker/api/v1/leads/${id}`, user);
  // }

  // // Delete user by ID
  // deleteUser(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/leads-tracker/api/v1/leads/${id}`);
  // }
}

