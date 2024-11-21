import { filter, Subject, takeUntil } from 'rxjs';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import {
  Router,
  RouterLink,
  RouterOutlet,
  NavigationEnd,
} from '@angular/router';
import { AplazoButtonComponent } from '@apz/shared-ui/button';
import { AplazoDashboardComponents } from '@apz/shared-ui/dashboard';
import { AplazoSidenavLinkComponent } from '../../../../projects/shared-ui/sidenav/src';
import { ROUTE_CONFIG } from '../../core/infra/config/routes.config';

@Component({
  standalone: true,
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  imports: [
    AplazoDashboardComponents,
    AplazoButtonComponent,
    AplazoSidenavLinkComponent,
    RouterOutlet,
    RouterLink,
  ],
})
export class LayoutComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  readonly #router = inject(Router);
  readonly #authService = inject(AuthService);

  readonly appRoutes = ROUTE_CONFIG;
  title = '';

  private readonly routeTitleMapping: Record<string, string> = {
    [this.appRoutes.home]: 'Inicio',
    [this.appRoutes.historial]: 'Historial',
  };

  ngOnInit(): void {
    // Call updateTitle initially to handle the current route when the component mounts
    this.title = this.getTitleFromRoute(this.#router.url);

    // Subscribe to route changes for subsequent updates

    this.#router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.title = this.getTitleFromRoute(this.#router.url);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getTitleFromRoute(route: string): string {
    for (const [key, title] of Object.entries(this.routeTitleMapping)) {
      if (route.includes(key)) {
        return title;
      }
    }
    return 'Layout Principal';
  }

  logout(): void {
    this.#authService.logout();
  }

  clickLogo(): void {
    this.#router.navigate([ROUTE_CONFIG.home]);
  }
}
