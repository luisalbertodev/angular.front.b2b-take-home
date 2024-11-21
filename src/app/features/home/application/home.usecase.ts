import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HomeRepository } from '../domain/repositories/home.repository';

@Injectable({
  providedIn: 'root',
})
export class HomeUseCase {
  readonly #homeRepository = inject(HomeRepository);

  getSummary(): Observable<{
    totalSales: number;
    orderCount: number;
    averageTicket: number;
  }> {
    return this.#homeRepository.getAllOperations().pipe(
      map((operations) => {
        const totalSales = operations.reduce((sum, op) => sum + op.price, 0);
        const orderCount = operations.length;
        const averageTicket = orderCount > 0 ? totalSales / orderCount : 0;

        return { totalSales, orderCount, averageTicket };
      })
    );
  }
}
