import { Component } from '@angular/core';
import{ getAllClients, UserService } from '../../../services/user.service';

@Component({
  selector: 'app-reports',
  standalone: false,
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {
  clientsObject: getAllClients = {
    data: [],
    currentPage: 0,
    totalPages: 0,
    totalItems: 0,
    pageSize: 0,
    hasNext: false,
    hasPrevious: false,
  };

  clients = this.clientsObject;
  overdueClients = this.clientsObject;
  mainSelectedDates="";
  fromDate="";
  toDate="";
  constructor( private userService: UserService) { }

  limitOptions = [6, 10, 20, 50];
  currentPage = 1;
  totalPages = 3;
  totalItems = 12;
  limit = 5;
  hasNext = false;
  hasPrevious = false;
  allTeams:any[]=[]

  searchTerm="";
  statusFilter="";
  durationFilter="";
  teamFilter="";

   selectedStatus=""

   inputedDate=""
   selectedTeam=""



   ngOnInit() {
    this.fetchAllClients(this.currentPage);
    this.fetchAllTeams();
   }
  fetchAllClients(page: number, searchTerm?: string, statusFilter?: string, teamFilter?: string) {
    // get all clients for client activity tracker

    this.userService.getAllClients(page, this.limit,this.searchTerm,this.statusFilter,this.teamFilter).subscribe({
      next: (data) => {
        this.clients = data;
        this.totalPages = data.totalPages;
        this.totalItems = data.totalItems;
        this.currentPage = page;
        this.hasNext = data.hasNext;
        this.hasPrevious = data.hasPrevious;
        console.log(this.clients);
        console.log(this.totalPages);
      },
      error: (err) => {
        console.log(err);
        // this.router.navigate(['/authentication/login'])
      },
    });
  }

  fetchAllTeams(){
    this.userService.getAllTeams("",this.teamFilter).subscribe({
      next: (data) => {
        // this.allTeams=data
        data.forEach((team) => {
        this.allTeams.push(team)
        })
        console.log(this.allTeams)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onLimitChange(newLimit: number): void {
    
    this.limit = newLimit; // convert to number
    this.currentPage = 1;
    this.fetchAllClients(this.currentPage);
  }

  onSearchClients(){
    console.log(this.searchTerm);
    if(this.searchTerm.length >= 3){
      this.fetchAllClients(this.currentPage,this.searchTerm,this.statusFilter,this.teamFilter)
          
      
    }else if (this.searchTerm.length == 0) {
      this.fetchAllClients(this.currentPage,this.searchTerm,this.statusFilter,this.teamFilter)

    }
  }

  onStatusChange(event:Event){
    this.selectedStatus = (event.target as HTMLSelectElement).value;
    if(this.selectedStatus === "All Status"){
      this.statusFilter = ""
      this.fetchAllClients(this.currentPage)
    }else{
      this.statusFilter = this.selectedStatus
      this.fetchAllClients(this.currentPage)
    }
  }

  onMainDateChange(event: Event) {
    this.mainSelectedDates = (event.target as HTMLInputElement).value
    if(this.mainSelectedDates){
      [this.fromDate,this.toDate]=this.mainSelectedDates.split(" to ")
      
    }
    console.log(this.mainSelectedDates)
// unsets fromDate and to Date when the date entered is cleared
    if(this.inputedDate.includes(" to ")){
        this.fromDate=""
        this.toDate=""
    }

    console.log(this.fromDate)
    console.log(this.toDate)
    console.log(this.inputedDate)

    this.fetchAllClients(this.currentPage,this.searchTerm,this.statusFilter,this.teamFilter)
  

    
  }
  onTableTeamChange(event:Event){
    this.selectedTeam = (event.target as HTMLSelectElement).value;
    console.log(this.teamFilter);
    if(this.selectedTeam === "All Teams"){
      this.teamFilter = ""
      this.fetchAllClients(this.currentPage)
    }else{
      this.teamFilter = this.selectedTeam
    this.fetchAllClients(this.currentPage)
    }
  }

}
