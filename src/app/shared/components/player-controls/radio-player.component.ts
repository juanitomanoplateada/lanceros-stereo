import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RadioPlayerService } from '../../../../core/services/radio-player.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-radio-player',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './radio-player.html',
  styleUrls: ['./radio-player.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioPlayer {
  private radioPlayer = inject(RadioPlayerService);

  volume = 1;
  playerState$ = this.radioPlayer.playerState$;
  currentSong$ = this.radioPlayer.currentSong$;

  metadataParts$ = this.currentSong$.pipe(
    map(song => {
      const parts = song.split(' - ');
      if (parts.length >= 2) {
        const artist = parts[0];
        const title = parts.slice(1).join(' - ');
        return { artist, title, isSplit: true };
      }
      return { artist: '', title: song, isSplit: false };
    })
  );

  togglePlay() {
    this.radioPlayer.toggle();
  }

  changeVolume(event: Event) {
    const input = event.target as HTMLInputElement;
    this.volume = Number(input.value);
    this.radioPlayer.setVolume(this.volume);
  }
}
