import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take, tap, throwError } from 'rxjs';
import { ROUTE_CONFIG } from '../../../core/infra/config/routes.config';
import { AuthService } from '../../../core/services/auth.service';
import { Credentials } from '../domain/entities/credentials';
import { LoginRepository } from '../domain/repositories/login.repository';
import { Username } from '../domain/value-objects/username';
import { Password } from '../domain/value-objects/password';

@Injectable({
  providedIn: 'root',
})
export class LoginUseCase {
  readonly #router = inject(Router);
  readonly #repository = inject(LoginRepository);
  readonly #authService = inject(AuthService);

  execute(credentials: Credentials): Observable<string> {
    let observableInstance: Observable<string>;

    try {
      const username = Username.create(credentials.username);
      const password = Password.create(credentials.password);

      observableInstance = this.#repository
        .authenticate({
          username: username.getValue(),
          password: password.getValue(),
        })
        .pipe(
          tap((token) => {
            this.#authService.setToken(token);
            this.#router.navigate([ROUTE_CONFIG.app, ROUTE_CONFIG.home]);
          }),

          take(1)
        );
    } catch (error) {
      observableInstance = throwError(() => error);
    }

    return observableInstance;
  }
}
