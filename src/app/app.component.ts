import { Component } from '@angular/core';

import { Header } from './core/layout/header/header';
import { Player } from './features/radio/components/player-visualizer/player';
import { Footer } from './core/layout/footer/footer';
import { RadioPlayer } from './features/radio/components/player-controls/radio-player';
import { Meta, Title } from '@angular/platform-browser';
import { FloatingContactComponent } from './shared/components/floating-contact/floating-contact';
import { ToastComponent } from './shared/components/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, Player, Footer, RadioPlayer, FloatingContactComponent, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
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
