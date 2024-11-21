import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ROUTE_CONFIG } from '../config/routes.config';

export const guestGuard: CanActivateFn = (): boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return !authService.isAuthenticated()
    ? true
    : router.parseUrl(`/${ROUTE_CONFIG.app}/${ROUTE_CONFIG.home}`);
};
