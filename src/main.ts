import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

import localeEsMx from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeEsMx, 'es-MX');

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
