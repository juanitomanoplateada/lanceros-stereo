import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerVisualizerComponent } from '../../shared/components/player-visualizer/player-visualizer.component';
import { RadioPlayerComponent } from '../../shared/components/player-controls/radio-player.component';

@Component({
  selector: 'app-radio',
  standalone: true,
  imports: [CommonModule, PlayerVisualizerComponent, RadioPlayerComponent],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class RadioComponent {}
