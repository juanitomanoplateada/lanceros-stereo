import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { HeaderComponent } from './shared/components/header/header.component';
import { FloatingContactComponent } from './shared/components/floating-contact/floating-contact.component';
import { ToastComponent } from './shared/components/toast/toast.component';
import { RadioComponent } from './features/radio/radio.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    RadioComponent,
    FloatingContactComponent,
    ToastComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class AppComponent {
  constructor(private titleService: Title, private metaService: Meta) {
    this.titleService.setTitle(
      'Lanceros Stereo 94.1 FM | Música en vivo desde Tuta'
    );
    this.metaService.addTags([
      {
        name: 'description',
        content:
          'Sintoniza Lanceros Stereo 94.1 FM, tu emisora en vivo desde Tuta, Boyacá. Música, cultura y comunidad en un solo lugar.',
      },
      {
        name: 'keywords',
        content:
          'radio, música, emisora, Lanceros, Stereo, 94.1, FM, Tuta, Boyacá, online',
      },
      { name: 'author', content: 'Lanceros Stereo 94.1 FM' },
    ]);
  }
}
