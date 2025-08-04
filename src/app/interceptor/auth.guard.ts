import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {

  const routes = inject(Router)

   const token = localStorage.getItem('token')
    if(token===token){
      return true
    }
    else{
      routes.navigateByUrl('/authentication/login')
      return false
    }
  
};


