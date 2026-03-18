import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

type AppConfig = Record<string, string>;

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private config: AppConfig = {};

  constructor(private http: HttpClient) {}

  load(): Promise<void> {
    // SSR cannot resolve browser asset URLs like /assets/config.json.
    if (typeof window === 'undefined') {
      return Promise.resolve();
    }

    return firstValueFrom(this.http.get<AppConfig>('/assets/config.json'))
      .then(cfg => {
        this.config = cfg;
      })
      .catch(error => {
        console.error('Unable to load runtime config from /assets/config.json', error);
        this.config = {};
      });
  }

  get(key: string): string {
    return this.config[key] ?? '';
  }

  get apiUrl(): string {
    return this.get('apiUrl');
  }
}
