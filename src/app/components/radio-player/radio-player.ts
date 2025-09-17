import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-radio-player',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './radio-player.html',
  styleUrls: ['./radio-player.scss'],
})
export class RadioPlayer implements OnDestroy {
  streamUrl = 'http://link.zeno.fm:80/jz1bfxan45kuv';
  metadataUrl = 'https://api.zeno.fm/mounts/metadata/subscribe/jz1bfxan45kuv';

  playerState: 'stopped' | 'loading' | 'playing' = 'stopped';
  volume = 1;
  currentSong = 'Esperando transmisión...';

  private audio = new Audio(this.streamUrl);
  private eventSource?: EventSource;

  constructor() {
    this.audio.volume = this.volume;

    // Estado de audio
    this.audio.addEventListener('playing', () => {
      this.playerState = 'playing';
    });

    this.audio.addEventListener('error', () => {
      this.playerState = 'stopped';
      this.currentSong = 'Error al conectar';
    });

    this.audio.addEventListener('pause', () => {
      if (this.playerState !== 'loading') {
        this.playerState = 'stopped';
      }
    });

    // 🔊 Suscribirse al endpoint de metadata vía SSE
    this.eventSource = new EventSource(this.metadataUrl);

    this.eventSource.addEventListener('message', (event: any) => {
      try {
        const data = JSON.parse(event.data);
        if (data.streamTitle) {
          this.currentSong = data.streamTitle;
        }
      } catch {
        this.currentSong = 'Sin metadata disponible';
      }
    });

    this.eventSource.addEventListener('error', () => {
      this.currentSong = 'Conexión cerrada';
    });
  }

  togglePlay() {
    if (this.playerState === 'stopped') {
      this.playerState = 'loading';
      this.audio.load();
      this.audio.play().catch(() => {
        this.playerState = 'stopped';
      });
    } else if (this.playerState === 'playing') {
      this.audio.pause();
      this.playerState = 'stopped';
    }
  }

  changeVolume(event: Event) {
    const input = event.target as HTMLInputElement;
    this.volume = Number(input.value);
    this.audio.volume = this.volume;
  }

  ngOnDestroy() {
    this.audio.pause();
    this.eventSource?.close();
  }
}
