import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // available everywhere without extra imports
})
export class ProgressService {

  setProgressColors(member: any) {
    if (member.progressPercentage >= 80) {

      member.progressColor = 'progress-green';
      member.progressTextColor = 'text-green';
      member.progressOutlineColor = 'green-outline';

    } else if (member.progressPercentage >= 50) {

      member.progressColor = 'progress-yellow';
      member.progressTextColor = 'text-yellow';
      member.progressOutlineColor = 'yellow-outline';

    } else {

      member.progressColor = 'progress-red';
      member.progressTextColor = 'text-red';
      member.progressOutlineColor = 'red-outline';
      
    }
  }
}
