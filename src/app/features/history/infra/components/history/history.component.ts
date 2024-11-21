import { inject } from '@angular/core';
import { NgIf, NgClass, DatePipe, AsyncPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MxCurrencyPipe } from '@apz/shared-ui';
import { HistoryUseCase } from '../../../application/history.usecase';
import { OperationStatus } from '../../../domain/entities/operation-status.enum';

@Component({
  selector: 'app-historial',
  standalone: true,
  templateUrl: './history.component.html',
  imports: [NgIf, NgClass, NgFor, MxCurrencyPipe, DatePipe, AsyncPipe],
})
export class HistorialComponent {
  readonly #historyUseCase = inject(HistoryUseCase);
  history$ = this.#historyUseCase.getAllOperations();

  getStatusClass(status: string): string {
    const statusMap: Record<string, string> = {
      [OperationStatus.Active]: 'bg-special-success text-green-600',
    };

    return statusMap[status] || 'bg-gray-300 text-gray-600';
  }

  getStatusText(status: string): string {
    const statusMap: Record<string, string> = {
      [OperationStatus.Active]: 'APROBADO',
    };

    return statusMap[status] || '-';
  }
}
