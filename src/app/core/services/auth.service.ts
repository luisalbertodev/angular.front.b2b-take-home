import { Injectable, inject } from '@angular/core';
import { ROUTE_CONFIG } from '../infra/config/routes.config';
import { Router } from '@angular/router';
import { StorageHandler } from '../interfaces/storage-handler.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'authToken';

  readonly #storage = inject(StorageHandler);

  constructor(private router: Router) {}

  isAuthenticated(): boolean {
    return !!this.#storage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return this.#storage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    this.#storage.setItem(this.tokenKey, token);
  }

  logout(): void {
    this.#storage.removeItem(this.tokenKey);
    this.router.navigate([`/${ROUTE_CONFIG.login}`]);
  }
}
