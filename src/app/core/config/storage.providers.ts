import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';
import { StorageHandler } from '../interfaces/storage-handler.interface';

export function provideStorage(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: StorageHandler,
      useClass: LocalStorageService,
    },
    AuthService,
  ]);
}
