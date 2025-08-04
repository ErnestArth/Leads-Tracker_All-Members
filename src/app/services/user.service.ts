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
  createdAt:string
  clientStatus: string
  lastAction: string
  createdBy:string
}
export interface getAllClientsOverdue{
  clientId: string
  firstName: string
  lastName: string
  phoneNumber: string
  lastUpdated: string
  createdAt:string
  clientStatus: string
  lastAction: string
  createdBy:string
  assignedTo: string,
  gpslocation: null
}
// interface for endpoint to get a specific team lead
// first define interface for teamMembers which is an array
export interface teamMembers{
  memberId: string
  memberName: string
  totalClientsSubmitted: string,
  clientStatus: object
}

export interface teamPerformance{
  teamLeadName:string
  totalClientsAdded:string
  teamTarget:string
  numberOfClients:string
  progressPercentage:string
  teamMembers:teamMembers[]
  clientStatus:object
  numberOfTeamMembers:string
}

export interface getSpecificTeamLead{
  userId: string
  firstName: string
  lastName: string
  email: string
  role:string
  phoneNumber:string
  staffId:string
  teamPerformance:teamPerformance
}

export interface memberPerformance{
  memberId:string
  memberName:string
  totalClientsSubmitted:string
  clientStatus:object
}

export interface getSpecificTeamMember{
  userId: string
  firstName: string
  lastName: string
  email: string
  role: string
  phoneNumber: string
  staffId: string
  teamPerformance: null
  memberPerformance:memberPerformance
}

export interface getAllTeamMembers{
  userId: string
  firstName: string
  lastName: string
  email: string
  role: string
  phoneNumber: string
  staffId: string
  // teamPerformance: null
  // memberPerformance: null
}

export interface getUserDetails{
  userId: string
  firstName: string
  lastName: string
  email: string
  role: string
  phoneNumber: string
  staffId: string

}

export interface updateUserProfile{
  firstName: string
  lastName: string
  email: string
  role: string
  password:string
  phoneNumber: string
  staffId: string
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




  private apiUrl = 'http://13.60.10.108:8080'; //


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

  getTeamMembers(userId: string): Observable<specificTeamMembers[]> {
    const token =localStorage.getItem('token')
    const headers = new HttpHeaders({'Authorization' : `Bearer ${token}`
  })
    return this.http.get<specificTeamMembers[]>(`${this.apiUrl}/leads-tracker/api/v1/leads/team-leads/${userId}/members?duration=week`,{headers} );
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

  // get all team members

  getAllTeamMembers():Observable<getAllTeamMembers[]> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({'Authorization' : `Bearer ${token}`})
    return this.http.get<getAllTeamMembers[]>(`${this.apiUrl}/leads-tracker/api/v1/leads/team-members`,{headers});
  }
getSpecificTeamLead(userId: string): Observable<getSpecificTeamLead> {
  const token = localStorage.getItem('token')
  const headers = new HttpHeaders({'Authorization' : `Bearer ${token}`})
  return this.http.get<getSpecificTeamLead>(`${this.apiUrl}/leads-tracker/api/v1/leads/team-leads/${userId}`,{headers});
}
getSpecificTeamMember( teamLeadId: string, memberId: string): Observable<getSpecificTeamMember> {
  const token = localStorage.getItem('token')
  const headers = new HttpHeaders({'Authorization' : `Bearer ${token}`})
  return this.http.get<getSpecificTeamMember>(`${this.apiUrl}/leads-tracker/api/v1/leads/team-leads/${teamLeadId}/members/${memberId}?duration=week`,{headers});
}

getAllClientsOverdue(): Observable<getAllClientsOverdue[]>{
  const token = localStorage.getItem('token')
  const headers = new HttpHeaders({'Authorization' : `Bearer ${token}`})
  return this.http.get<getAllClientsOverdue[]>(`${this.apiUrl}/leads-tracker/api/v1/clients/admin/notifications`,{headers});  
}

// Get a user by id 

getUser(userId:string):Observable<getUserDetails>{
  const token = localStorage.getItem('token')
  const headers = new HttpHeaders({'Authorization' : `Bearer ${token}`})
  return this.http.get<getUserDetails>(`${this.apiUrl}/leads-tracker/api/v1/leads/${userId}`,{headers});

}

// update user profile
updateUserProfile(userId:string, updateUserProfile:updateUserProfile):Observable<updateUserProfile>{
  const token = localStorage.getItem('token')
  const headers = new HttpHeaders({'Authorization' : `Bearer ${token}`})
  return this.http.put<updateUserProfile>(`${this.apiUrl}/leads-tracker/api/v1/leads/${userId}`,updateUserProfile,{headers});


}

}