import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface AppConfig {
  streamUrl: string;
  metadataUrl: string;
}

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private config?: AppConfig;

  constructor(private http: HttpClient) {}

  loadConfig(): Promise<void> {
    return firstValueFrom(this.http.get<AppConfig>('/api/config'))
      .then((cfg) => {
        this.config = cfg;
      })
      .catch((err) => {
        console.error(
          'No se pudo cargar config, usando valores por defecto',
          err
        );
        this.config = {
          streamUrl: 'https://stream-178.zeno.fm/jz1bfxan45kuv?zt=eyJhbGciOiJIUzI1NiJ9.eyJzdHJlYW0iOiJqejFiZnhhbjQ1a3V2IiwiaG9zdCI6InN0cmVhbS0xNzguemVuby5mbSIsInRtIjpmYWxzZSwicnR0bCI6NSwianRpIjoiaXExcG1zdEZUbEtvQXo0R2ZPaG5MZyIsImlhdCI6MTc1ODY0NDIxMiwiZXhwIjoxNzU4NjQ0MjcyfQ.edIDbQdW5ZgPGtOe2REF1Y9ZoUa8bej2TLClbESQYG4',
          metadataUrl:
            'https://api.zeno.fm/mounts/metadata/subscribe/jz1bfxan45kuv',
        };
      });
  }

  get streamUrl(): string {
    return this.config?.streamUrl ?? '';
  }

  get metadataUrl(): string {
    return this.config?.metadataUrl ?? '';
  }
}
