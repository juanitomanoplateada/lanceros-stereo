import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RadioPlayerService } from '../../../../core/services/radio-player.service';

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

  // Expose observables directly for async pipe in template
  playerState$ = this.radioPlayer.playerState$;
  currentSong$ = this.radioPlayer.currentSong$;

  togglePlay() {
    this.radioPlayer.toggle();
  }

  changeVolume(event: Event) {
    const input = event.target as HTMLInputElement;
    this.volume = Number(input.value);
    this.radioPlayer.setVolume(this.volume);
  }
}
