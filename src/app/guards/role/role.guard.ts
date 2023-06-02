import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getRole() === "Administrator") {
    return true;
  }

  // Redirect to the login page
  return router.parseUrl('user/dashboard');
};
