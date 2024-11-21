import { Observable } from 'rxjs';
import { Operation } from '../entities/operation';

export abstract class HomeRepository {
  abstract getAllOperations(): Observable<Operation[]>;
}
