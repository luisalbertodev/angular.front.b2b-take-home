import { Injectable } from '@angular/core';
import { StorageHandler } from '../interfaces/storage-handler.interface';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService implements StorageHandler {
  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
