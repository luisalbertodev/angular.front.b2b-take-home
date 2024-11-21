import { Observable } from 'rxjs';
import { Operation } from '../entities/operation';

export abstract class HistoryRepository {
  abstract getAllOperations(): Observable<Operation[]>;
}
