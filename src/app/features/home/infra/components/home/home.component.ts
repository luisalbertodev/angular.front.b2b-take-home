import { inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { HomeUseCase } from '../../../application/home.usecase';
import { MxCurrencyPipe } from '@apz/shared-ui';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [MxCurrencyPipe, AsyncPipe, NgIf],
})
export class HomeComponent {
  readonly #homeUseCase = inject(HomeUseCase);
  summary$ = this.#homeUseCase.getSummary();
}
