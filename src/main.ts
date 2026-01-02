import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { APP_INITIALIZER } from '@angular/core';
import { App } from './app/app';
import { ConfigService } from './app/core/services/config.service';

export function initializeConfig(config: ConfigService) {
  return () => config.loadConfig();
}

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeConfig,
      deps: [ConfigService],
      multi: true,
    },
  ],
}).catch((err) => console.error(err));
