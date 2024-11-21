import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Operation } from '../domain/entities/operation';
import { HistoryRepository } from '../domain/repositories/history.repository';

@Injectable({
  providedIn: 'root',
})
export class HistoryUseCase {
  readonly #homeRepository = inject(HistoryRepository);

  getAllOperations(): Observable<Operation[]> {
    return this.#homeRepository.getAllOperations();
  }
}
