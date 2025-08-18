import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AddTeamRequest {
  name: string;
  teamLeadUserId: string;
}
export interface teamName {
  name: string;
  teamLeadUserId: string;
  teamLeadName: string;
}
export interface AddTeamResponse {
  teamName: teamName;
  message: string;
}
export interface createTeamMember {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  staffId: string;
  role: string;
  teamLeadUserId: string;
}
export interface createTeamLead {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  staffId: string;
  role: string;
}

export interface createTeamMemberResponse {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  staffId: string;
  role: string;
  userId: string;
}

export interface specificTeamMembers {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phoneNumber: string;
  staffId: string;
}
export interface AllTeamsTeamMembers {
  memberId: string;
  memberName: string;
  totalClientsSubmitted: string;
  clientStatus: object;
  target: number;
  progressPercentage: number;
  progressFraction: number;
}
export interface getAllTeamLeads {
  // userId: string
  // firstName: string
  // lastName: string
  // email: string
  // role: string
  // phoneNumber: string
  // staffId: string
  // teamPerformance: string
  // memberPerformance: string

  clientStatus: object;
  numberOfClients: number;
  numberOfTeamMembers: number;
  progressFraction: string;
  progressPercentage: number;
  teamId: number;
  teamLeadName: string;
  teamMembers: getAllTeamTeamMembers[];
  teamLeadUserId: string;
  teamName: string;
  teamTarget: number;
  totalClientsAdded: number;
  email: string;
  color?: string;
  progressColor?: string;
  progressTextColor?: string;
  progressOutlineColor?: string;
}


export interface data{
  clientId: string
  firstName: string
  lastName: string
  phoneNumber: string
  lastUpdated: string
  createdAt:string
  clientStatus: string
  lastAction: string
  createdBy:string
  assignedTo: string
  gpslocation:string
  teamName:string
}

export interface getAllClients {
  data: data[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  hasNext: boolean;
  hasPrevious: boolean;

  // clientId: string
  // firstName: string
  // lastName: string
  // phoneNumber: string
  // lastUpdated: string
  // createdAt:string
  // clientStatus: string
  // lastAction: string
  // createdBy:string
}

// export interface getOverdueClientsUnderUser{
//   data:data[]
//   currentPage:number
//   totalPages:number
//   totalItems:number
//   pageSize:number
//   hasNext:boolean
//   hasPrevious:boolean
// }
export interface getAllClientsOverdue{
    data:data[]
    currentPage:number
    totalPages:number
    totalItems:number
    pageSize:number
    hasNext:boolean
    hasPrevious:boolean


  // clientId: string
  // firstName: string
  // lastName: string
  // phoneNumber: string
  // lastUpdated: string
  // createdAt:string
  // clientStatus: string
  // lastAction: string
  // createdBy:string
  // assignedTo: string,
  // gpslocation: null
}
// interface for endpoint to get a specific team lead
// first define interface for teamMembers which is an array

export interface clientStatus{
  PENDING?: number
  AWAITING_DOCUMENTATION?: number
  NOT_INTERESTED?: number
  INTERESTED?: number
  ONBOARDED?: number
  totalClients?: number

}
export interface teamMembers {
  memberId: string;
  memberName: string;
  totalClientsSubmitted: number;
  clientStatus: clientStatus;
  progressFraction: number;
  email: string;
  teamName: string;
  teamLeadName: string;
}

export interface teamPerformance{
  teamLeadName:string
  teamName:string
  totalClientsAdded:string
  teamTarget:string
  numberOfClients:string
  progressPercentage:number
  teamMembers:teamMembers[]
  clientStatus:clientStatus
  numberOfTeamMembers:number
  progressFraction:number
  email:string
  color?:string
}

export interface getSpecificTeamLead {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phoneNumber: string;
  staffId: string;
  teamPerformance: teamPerformance;
  memberPerformance: number;
}

// get specific team member
export interface memberPerformance {
  memberId: string;
  memberName: string;
  totalClientsSubmitted: string;
  clientStatus: object;
}

export interface getSpecificTeamMember {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phoneNumber: string;
  staffId: string;
  teamPerformance: null;
  memberPerformance: memberPerformance;
}

export interface getAllTeamMembers {
  memberId: string;
  memberName: string;
  totalClientsSubmitted: number;
  target: number;
  progressPercentage: number;
  clientStatus: object;
  progressFraction: string;
  email: string;
  teamLeadName: string;
  teamName: string;
  color?: string;
  progressColor?: string;
  progressTextColor?: string;
  progressOutlineColor?: string;
  // teamPerformance: null
  // memberPerformance: null
}

export interface getUserDetails {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phoneNumber: string;
  staffId: string;
  progressFraction?: number;
  progressPercentage?: number;
  targetValue?: number;
  progress?: number;
  createdDate?: string;
}

export interface updateUserProfile {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password: string;
  phoneNumber: string;
  staffId: string;
}

// get all team

export interface getAllTeamsTeamMembersClientStatus {
  PENDING: number;
}

export interface getAllTeamTeamMembers {
  memberId: string;
  memberName: string;
  totalClientsSubmitted: number;
  target: number;
  progressPercentage: number;
  clientStatus: getAllTeamsTeamMembersClientStatus;
  progressFraction: number;
}

export interface getAllTeamsClientStatus {
  PENDING: number;
}

export interface getAllTeams {
  teamId: string;
  teamName: string;
  teamLeadName: string;
  totalClientsAdded: number;
  teamTarget: number;
  numberOfClients: number;
  progressPercentage: number;
  teamMembers: getAllTeamTeamMembers[];
  clientStatus: getAllTeamsClientStatus;
  numberOfTeamMembers: number;
  progressFraction: number;
  progressColor?: string;
  progressTextColor?: string;
  progressOutlineColor?: string;
}

// Get A Team

export interface team {
  name: string;
  teamLeadUserId: string;
  teamLeadName: string;
}

export interface getATeam {
  team: team;
  message: string;
}

// interface for getting unresolved notificatioon
export interface teamLead {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface client {
  clientId: string;
  userId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  clientStatus: string;
  createdDate: string;
}

export interface unResolvedNotification {
  id: number;
  message: string;
  resolved: boolean;
  createdAt: string;
  type: string;
  teamLead: {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  client: {
    clientId: string;
    userId: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    clientStatus: string;
    createdDate: string;
  };
  daysOverdue: number;
}

// Get total no of clients by statuses

export interface overallStatusCounts {
  NOT_INTERESTED?: number;
  INTERESTED?: number;
  AWAITING_DOCUMENTATION?: number;
  ONBOARDED?: number;
}
export interface statusCounts {
  not_interested: number;
  interested: number;
  awaiting_documentation: number;
  on_boarded: number;
  pending: number;
}

export interface teamStats {
  teamName: string;
  statusCounts: statusCounts;
  totalClients: number;
}
export interface clientStatusCounts {
  totalClients: number;
  overallStatusCounts: overallStatusCounts;
  teamStats: teamStats[];
}

export interface adminProfile {
  fullName: string;
  email: string;
  phoneNumber: number;
  staffId: string;
  role: string;
  createdAt: null;
}

export interface changeAdminPassword {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface deactivateTeam{
  message:string
}

// const token =localStorage.getItem('token')
// console.log(token)
// const headers = new HttpHeaders({
//     'Authorization' : `Bearer ${token}`
// })

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://13.61.150.158:8080'; //

  private teamMembers: createTeamMember[] = [];

  private specificTeamMembers: specificTeamMembers[] = [];

  constructor(private http: HttpClient) {}
  // create a team

  addTeam(team: AddTeamRequest): Observable<AddTeamRequest> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.post<AddTeamRequest>(
      `${this.apiUrl}/leads-tracker/api/v1/leads/team`,
      team,
      { headers }
    );
  }

  // Update a team
  updateTeam(team: AddTeamRequest): Observable<AddTeamRequest> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.put<AddTeamRequest>(
      `${this.apiUrl}/leads-tracker/api/v1/leads/Edit-team/1`,
      team,
      { headers }
    );
  }

  // Deactivate a Team

  deactivateTeam(teamId: string): Observable<void> {
    const token =localStorage.getItem('token')
    const headers = new HttpHeaders({'Authorization' : `Bearer ${token}`})
    console.log(headers)
    return this.http.patch<void>(`${this.apiUrl}/leads-tracker/api/v1/leads/team/${teamId}/deactivate`, {}, {headers});
  }

  // deleting a user
  deleteUser(userId:string):Observable<void> {
    const token =localStorage.getItem('token')
    const headers = new HttpHeaders({'Authorization' : `Bearer ${token}`})
    return this.http.delete<void>(`${this.apiUrl}/leads-tracker/api/v1/leads/delete/${userId}`,{headers});

  }

// create a team member
  addTeamMember(teamMember: createTeamMember[]): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.post<void>(
      `${this.apiUrl}/leads-tracker/api/v1/leads`,
      teamMember,
      { headers }
    );
  }

  // get total number of clients by status

  getClientStatusCounts(): Observable<clientStatusCounts> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<clientStatusCounts>(
      `${this.apiUrl}/leads-tracker/api/v1/clients/statistics?duration=week`,
      { headers }
    );
  }

  // create a team lead
  addTeamLead(request: createTeamLead): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.post<void>(
      `${this.apiUrl}/leads-tracker/api/v1/leads`,
      request,
      { headers }
    );
  }

  getClientsUnderUser(userId: string, name: string, status: string,fromDate: string,toDate:string,page: number , limit: number ) :Observable<getAllClients> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<getAllClients>(
      `${this.apiUrl}/leads-tracker/api/v1/clients/all-clients/${userId}`,
      { headers, params:{name, status,fromDate,toDate,page,limit} }
    );
  }

  getOverdueClientsUnderUser(userId: string, name: string, team: string, duration: string,page: number , limit: number): Observable<getAllClients> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<getAllClients>(
      `${this.apiUrl}/leads-tracker/api/v1/clients/user/${userId}/overdueClients`,
      { headers,params:{name, team,duration,page,limit} }
    );
  }

  // get team members under a specific team lead

  getTeamMembers(userId: string): Observable<specificTeamMembers[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    console.log(headers);
    return this.http.get<specificTeamMembers[]>(
      `${this.apiUrl}/leads-tracker/api/v1/leads/team-leads/${userId}/members?duration=week`,
      { headers }
    );
  }

  // get all teams

  getAllTeams(): Observable<getAllTeams[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<getAllTeams[]>(
      `${this.apiUrl}/leads-tracker/api/v1/teams/all-teams?duration=week`,
      { headers }
    );
  }

  //get a team
  getATeam(teamId: string): Observable<getATeam> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<getATeam>(
      `${this.apiUrl}/leads-tracker/api/v1/leads/team/${teamId}`,
      { headers }
    );
  }

  getAllTeamLeads(): Observable<getAllTeamLeads[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<getAllTeamLeads[]>(
      `${this.apiUrl}/leads-tracker/api/v1/leads/team-leads`,
      { headers }
    );
  }

  getAllClients(page: number, limit: number, searchTerm: string, statusFilter: string, durationFilter: string): Observable<getAllClients> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<getAllClients>(
      `${this.apiUrl}/leads-tracker/api/v1/clients/all-clients?page=${page}&limit=${limit}`,
      { headers }
    );
  }

  // get all team members

  getAllTeamMembers(): Observable<getAllTeamMembers[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<getAllTeamMembers[]>(
      `${this.apiUrl}/leads-tracker/api/v1/leads/team-members`,
      { headers }
    );
  }
  getSpecificTeamLead(userId: string,duration: string): Observable<getSpecificTeamLead> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<getSpecificTeamLead>(
      `${this.apiUrl}/leads-tracker/api/v1/leads/team-leads/${userId}`,
      { headers, params: { duration } }
    );
  }
  getSpecificTeamMember(
    teamLeadId: string,
    memberId: string
  ): Observable<getSpecificTeamMember> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<getSpecificTeamMember>(
      `${this.apiUrl}/leads-tracker/api/v1/leads/team-leads/${teamLeadId}/members/${memberId}?duration=week`,
      { headers }
    );
  }

  getAllClientsOverdue(
    page: number,
    limit: number
  ): Observable<getAllClientsOverdue> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<getAllClientsOverdue>(
      `${this.apiUrl}/leads-tracker/api/v1/clients/admin/overdueClients?page=${page}&limit=${limit}`,
      { headers }
    );
  }

  // Get a user by id

  getUser(userId: string): Observable<getUserDetails> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<getUserDetails>(
      `${this.apiUrl}/leads-tracker/api/v1/leads/${userId}`,
      { headers }
    );
  }

  // update user profile
  updateUserProfile(
    userId: string,
    updateUserProfile: updateUserProfile
  ): Observable<updateUserProfile> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.put<updateUserProfile>(
      `${this.apiUrl}/leads-tracker/api/v1/leads/${userId}`,
      updateUserProfile,
      { headers }
    );
  }
  // unresolved notification
  getUnResolvedNotification(): Observable<unResolvedNotification[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<unResolvedNotification[]>(
      `${this.apiUrl}/leads-tracker/api/v1/notifications/admin/notifications/unresolved`,
      { headers }
    );
  }

  // Viewing the admin Profile
  getAdminProfile(): Observable<adminProfile[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<adminProfile[]>(
      `${this.apiUrl}/leads-tracker/api/v1/leads/profile`,
      { headers }
    );
  }

  // change admin password
  changeAdminPassword(data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }): Observable<changeAdminPassword> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.put<changeAdminPassword>(
      `${this.apiUrl}/leads-tracker/api/v1/leads/admin/profile/change-password`,
      data,
      { headers }
    );
  }
}
