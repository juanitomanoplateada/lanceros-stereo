import { Component } from '@angular/core';

import { Header } from './components/header/header';
import { Player } from './components/player/player';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Header,
    Player,
    Footer
],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'lanceros-stereo';
}
