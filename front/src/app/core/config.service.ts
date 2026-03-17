// src/app/core/config.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  get apiUrl(): string {
    return (window as any).__env?.apiUrl;
  }
}
