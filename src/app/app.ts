import { Component } from '@angular/core';

import { Header } from './components/header/header';
import { Player } from './components/player/player';
import { Footer } from './components/footer/footer';
import { RadioPlayer } from './components/radio-player/radio-player';
import { Meta, Title } from '@angular/platform-browser';
import { FloatingContactComponent } from './components/floating-contact/floating-contact';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, Player, Footer, RadioPlayer, FloatingContactComponent],
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
