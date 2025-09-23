import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfigService } from '../../config.service';

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

  constructor(private config: ConfigService) {}

  ngOnInit() {
    const streamUrl = this.config.streamUrl;
    const metadataUrl = this.config.metadataUrl;

    this.audio = new Audio(streamUrl);
    this.audio.volume = this.volume;

    this.audio.addEventListener(
      'playing',
      () => (this.playerState = 'playing')
    );
    this.audio.addEventListener('error', () => {
      this.playerState = 'stopped';
      this.currentSong = 'Error al conectar';
    });
    this.audio.addEventListener('pause', () => {
      if (this.playerState !== 'loading') this.playerState = 'stopped';
    });

    try {
      this.eventSource = new EventSource(metadataUrl);
      this.eventSource.addEventListener('message', (event: any) => {
        try {
          const data = JSON.parse(event.data);
          if (data.streamTitle) this.currentSong = data.streamTitle;
        } catch {
          this.currentSong = 'Sin metadata disponible';
        }
      });
      this.eventSource.addEventListener('error', () => {
        this.currentSong = 'Conexión cerrada';
      });
    } catch (e) {
      console.warn('No se pudo crear EventSource:', e);
      this.currentSong = 'Metadata no disponible';
    }
  }

  togglePlay() {
    if (!this.audio) return;

    if (this.playerState === 'stopped') {
      this.playerState = 'loading';
      this.audio.load();
      this.audio.play().catch(() => (this.playerState = 'stopped'));
    } else if (this.playerState === 'playing') {
      this.audio.pause();
      this.playerState = 'stopped';
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
