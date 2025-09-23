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
          streamUrl: 'http://link.zeno.fm:80/jz1bfxan45kuv',
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
