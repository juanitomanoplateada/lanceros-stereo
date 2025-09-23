import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RadioPlayerService,
  PlayerState,
} from '../../services/radio-player.service';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player.html',
  styleUrls: ['./player.scss'],
})
export class Player {
  playerState: PlayerState = 'stopped';

  constructor(private radioPlayer: RadioPlayerService) {
    this.radioPlayer.playerState$.subscribe((state) => {
      this.playerState = state;
    });
  }
}
