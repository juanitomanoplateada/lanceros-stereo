import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioPlayerService } from '../../../core/services/radio-player.service';

@Component({
  selector: 'app-player-visualizer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-visualizer.component.html',
  styleUrls: ['./player-visualizer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerVisualizerComponent {
  private readonly radioPlayer = inject(RadioPlayerService);
  playerState$ = this.radioPlayer.playerState$;
}
