import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { HomeUseCase } from '../../application/home.usecase';
import { HomeRepository } from '../../domain/repositories/home.repository';
import { HomeRepositoryJSON } from '../repositories/json-home.repository';

export function provideHome(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: HomeRepository,
      useClass: HomeRepositoryJSON,
    },
    HomeUseCase,
  ]);
}
