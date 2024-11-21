import { Routes } from '@angular/router';
import { ROUTE_CONFIG } from './core/infra/config/routes.config';
import { authGuard } from './core/infra/guards/auth.guard';
import { guestGuard } from './core/infra/guards/guest.guard';
import { HistorialComponent } from './features/history/infra/components/history/history.component';
import { HomeComponent } from './features/home/infra/components/home/home.component';
import { LayoutComponent } from './features/layout/layout.component';
import { LoginComponent } from './features/login/infra/components/login/login.component';
import { provideHome } from './features/home/infra/config/providers';
import { provideLogin } from './features/login/infra/config/providers';
import { provideHistory } from './features/history/infra/config/providers';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ROUTE_CONFIG.login,
  },
  {
    path: ROUTE_CONFIG.login,
    component: LoginComponent,
    providers: [provideLogin()],
    canActivate: [guestGuard],
  },
  {
    path: ROUTE_CONFIG.app,
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: ROUTE_CONFIG.home,
      },
      {
        path: ROUTE_CONFIG.home,
        component: HomeComponent,
        providers: [provideHome()],
      },
      {
        path: ROUTE_CONFIG.historial,
        component: HistorialComponent,
        providers: [provideHistory()],
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ROUTE_CONFIG.login,
  },
];
