import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface AppConfig {
  streamUrl: string;
  metadataUrl: string;
}

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private config: AppConfig = {
    streamUrl: environment.streamUrl,
    metadataUrl: environment.metadataUrl,
  };

  constructor(private http: HttpClient) { }

  loadConfig(): Promise<void> {
    // Si estamos en desarrollo y apuntando a local, evitamos el error de consola innecesario
    // a menos que realmente tengamos un backend corriendo.
    if (!environment.production && environment.apiUrl === '/api') {
      console.log('Modo desarrollo: Usando configuración local (saltando fetch remoto)');
      return Promise.resolve();
    }

    // Intentamos cargar la configuración remota (si existe endpoint),
    // si falla, mantenemos la configuración de entorno (environment)
    return firstValueFrom(this.http.get<AppConfig>(`${environment.apiUrl}/config`))
      .then((cfg) => {
        if (cfg) {
          this.config = { ...this.config, ...cfg };
        }
      })
      .catch((err) => {
        console.warn(
          'No se pudo cargar config remota, usando valores de entorno locales.',
          err.message || 'Error desconocido'
        );
        // NO HACER NADA AQUÍ para no sobrescribir con null o secretos hardcodeados
      });
  }

  get streamUrl(): string {
    return this.config.streamUrl;
  }

  get metadataUrl(): string {
    return this.config.metadataUrl;
  }
}
