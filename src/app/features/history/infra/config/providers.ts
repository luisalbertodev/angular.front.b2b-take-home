import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { HistoryUseCase } from '../../application/history.usecase';
import { HistoryRepository } from '../../domain/repositories/history.repository';
import { HistoryRepositoryJSON } from '../repositories/json-history.repository';

export function provideHistory(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: HistoryRepository,
      useClass: HistoryRepositoryJSON,
    },
    HistoryUseCase,
  ]);
}
