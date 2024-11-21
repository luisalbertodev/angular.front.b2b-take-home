import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Operation } from '../../domain/entities/operation';
import { HistoryRepository } from '../../domain/repositories/history.repository';

@Injectable({
  providedIn: 'root',
})
export class HistoryRepositoryJSON extends HistoryRepository {
  private readonly dbUrl = 'assets/infra/db.json';

  constructor(private readonly httpClient: HttpClient) {
    super();
  }

  getAllOperations(): Observable<Operation[]> {
    return this.httpClient.get<Operation[]>(this.dbUrl);
  }
}
