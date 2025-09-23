import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfigService } from '../../config.service';
import { RadioPlayerService } from '../../services/radio-player.service';

@Component({
  selector: 'app-radio-player',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './radio-player.html',
  styleUrls: ['./radio-player.scss'],
})
export class RadioPlayer implements OnInit, OnDestroy {
  playerState: 'stopped' | 'loading' | 'playing' = 'stopped';
  volume = 1;
  currentSong = 'Esperando transmisión...';

  private audio?: HTMLAudioElement;
  private eventSource?: EventSource;

  constructor(
    private config: ConfigService,
    private radioPlayer: RadioPlayerService
  ) {}

  ngOnInit() {
    const streamUrl = this.config.streamUrl;
    const metadataUrl = this.config.metadataUrl;

    this.audio = new Audio(streamUrl);
    this.audio.volume = this.volume;

    this.audio.addEventListener('playing', () => {
      this.playerState = 'playing';
      this.radioPlayer.setState('playing');
    });

    this.audio.addEventListener('pause', () => {
      if (this.playerState !== 'loading') {
        this.playerState = 'stopped';
        this.radioPlayer.setState('stopped');
      }
    });

    this.audio.addEventListener('error', () => {
      this.playerState = 'stopped';
      this.radioPlayer.setState('stopped');
      this.currentSong = 'Error al conectar';
      this.radioPlayer.setSong(this.currentSong);
    });

    try {
      this.eventSource = new EventSource(metadataUrl);
      this.eventSource.addEventListener('message', (event: any) => {
        try {
          const data = JSON.parse(event.data);
          if (data.streamTitle) {
            this.currentSong = data.streamTitle;
            this.radioPlayer.setSong(this.currentSong);
          }
        } catch {
          this.currentSong = 'Sin metadata disponible';
          this.radioPlayer.setSong(this.currentSong);
        }
      });
      this.eventSource.addEventListener('error', () => {
        this.currentSong = 'Conexión cerrada';
        this.radioPlayer.setSong(this.currentSong);
      });
    } catch (e) {
      console.warn('No se pudo crear EventSource:', e);
      this.currentSong = 'Metadata no disponible';
      this.radioPlayer.setSong(this.currentSong);
    }
  }

  togglePlay() {
    if (!this.audio) return;

    if (this.playerState === 'stopped') {
      this.playerState = 'loading';
      this.radioPlayer.setState('loading');

      this.audio.load();
      this.audio.play().catch(() => {
        this.playerState = 'stopped';
        this.radioPlayer.setState('stopped');
      });
    } else if (this.playerState === 'playing') {
      this.audio.pause();
      this.playerState = 'stopped';
      this.radioPlayer.setState('stopped');
    }
  }

  changeVolume(event: Event) {
    const input = event.target as HTMLInputElement;
    this.volume = Number(input.value);
    if (this.audio) this.audio.volume = this.volume;
  }

  ngOnDestroy() {
    this.audio?.pause();
    this.eventSource?.close();
  }
}
