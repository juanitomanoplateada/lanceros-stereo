import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioPlayerService } from '../../../../core/services/radio-player.service';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player.html',
  styleUrls: ['./player.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Player {
  private radioPlayer = inject(RadioPlayerService);
  playerState$ = this.radioPlayer.playerState$;
}
