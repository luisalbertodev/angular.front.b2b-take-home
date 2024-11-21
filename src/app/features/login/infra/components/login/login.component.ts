import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AplazoButtonComponent } from '@apz/shared-ui/button';
import { AplazoLogoComponent } from '@apz/shared-ui/logo';
import { OutlinedTextFieldComponent } from '@apz/shared-ui/text-field';
import {
  AplazoNoWhiteSpaceDirective,
  AplazoLowercaseDirective,
} from '@apz/shared-ui';

import { LoginUseCase } from '../../../application/login.usecase';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    ReactiveFormsModule,
    AplazoButtonComponent,
    AplazoLogoComponent,
    OutlinedTextFieldComponent,
    AplazoNoWhiteSpaceDirective,
    AplazoLowercaseDirective,
  ],
})
export class LoginComponent {
  readonly #loginUseCase = inject(LoginUseCase);

  readonly username = new FormControl<string>('');
  readonly password = new FormControl<string>('');

  readonly form = new FormGroup({
    username: this.username,
    password: this.password,
  });

  login(): void {
    this.#loginUseCase
      .execute({
        username: this.username.value ?? '',
        password: this.password.value ?? '',
      })
      .subscribe({
        next: () => {},
        error: (error) => this.handleError(error),
      });
  }

  private handleError(error: unknown): void {
    if (error instanceof Error) {
      if (error.message.includes('Username')) {
        this.username.setErrors({ custom: error.message });
      } else if (error.message.includes('Password')) {
        this.password.setErrors({ custom: error.message });
      }
    }
  }
}
