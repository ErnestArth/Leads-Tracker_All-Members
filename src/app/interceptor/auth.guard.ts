// authGuard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/AuthServices';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const path  = route.routeConfig?.path;
  const authPaths = ['otp-auth', 'reset-password','ResettingPasswordComponent'];

  // Route-specific guards
  if (path && authPaths.includes(path) ) {
    const loggedEmail = sessionStorage.getItem('login_email');
    if (loggedEmail)
      return true;
    alert('You are not authenticated. Please log in first.');
  } else {
    if (authService.isAuthenticated())
      return true;
    alert('You are not authorised. Please log in first.');
  }
    router.navigate(['/authentication/login']);
    return false;
};
