import { ChangeDetectionStrategy, Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RadioPlayerService } from '../../../core/services/radio-player.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-radio-player',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './radio-player.component.html',
  styleUrls: ['./radio-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioPlayerComponent {
  private readonly radioPlayer = inject(RadioPlayerService);

  volume = 1;
  previousVolume = 1;
  showVolumeSlider = false;
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
    if (this.volume > 0) {
      this.previousVolume = this.volume;
    }
  }

  toggleMute() {
    if (this.volume > 0) {
      this.previousVolume = this.volume;
      this.volume = 0;
    } else {
      this.volume = this.previousVolume || 0.8;
    }
    this.radioPlayer.setVolume(this.volume);
  }

  onVolumeButtonClick() {
    if (window.innerWidth <= 768) {
      if (this.showVolumeSlider) {
        this.toggleMute();
      } else {
        this.showVolumeSlider = true;
      }
    } else {
      this.toggleMute();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.volume-control')) {
      this.showVolumeSlider = false;
    }
  }
}
