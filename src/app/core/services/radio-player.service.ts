import { Injectable, OnDestroy, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConfigService } from './config.service';
import { ToastService } from './toast.service';

export type PlayerState = 'stopped' | 'loading' | 'playing' | 'error';

@Injectable({
  providedIn: 'root',
})
export class RadioPlayerService implements OnDestroy {
  private config = inject(ConfigService);
  private toast = inject(ToastService);

  private playerStateSubject = new BehaviorSubject<PlayerState>('stopped');
  playerState$ = this.playerStateSubject.asObservable();

  private currentSongSubject = new BehaviorSubject<string>(
    'Presiona ▶ para sintonizar'
  );
  currentSong$ = this.currentSongSubject.asObservable();

  private audio?: HTMLAudioElement;
  private eventSource?: EventSource;

  play() {
    if (!this.audio) {
      this.initAudio();
    }

    if (this.audio) {
      this.setState('loading');
      this.audio.play().catch((error) => {
        console.error('Error al reproducir:', error);
        this.setState('stopped');
      });
    }
  }

  pause() {
    if (this.audio) {
      this.audio.pause();
      this.setState('stopped');
    }
  }

  toggle() {
    const currentState = this.playerStateSubject.value;
    if (currentState === 'playing') {
      this.pause();
    } else {
      this.play();
    }
  }

  setVolume(volume: number) {
    if (this.audio) {
      this.audio.volume = volume;
    }
  }

  private initAudio() {
    const streamUrl = this.config.streamUrl;
    if (!streamUrl) {
      console.error('Stream URL no configurada');
      this.setSong('Error: Sin configuración de stream');
      this.toast.show('Error: Configuración de stream no encontrada', 'error');
      return;
    }

    this.audio = new Audio(streamUrl);

    this.audio.addEventListener('playing', () => this.setState('playing'));
    this.audio.addEventListener('pause', () => {
      if (this.playerStateSubject.value !== 'loading') {
        this.setState('stopped');
      }
    });
    this.audio.addEventListener('waiting', () => this.setState('loading'));
    this.audio.addEventListener('error', () => {
      this.setState('error');
      this.setSong('Error en la conexión');
      this.toast.show('No se pudo conectar al stream. Intenta recargar.', 'error');
    });

    this.initMetadata();
  }

  private initMetadata() {
    const metadataUrl = this.config.metadataUrl;
    if (!metadataUrl) return;

    if (this.eventSource) this.eventSource.close();

    try {
      this.eventSource = new EventSource(metadataUrl);
      this.eventSource.addEventListener('message', (event: any) => {
        try {
          const data = JSON.parse(event.data);
          if (data.streamTitle) {
            this.setSong(data.streamTitle);
          }
        } catch {
          // Ignorar errores de parseo
        }
      });
      this.eventSource.addEventListener('error', () => {
        this.eventSource?.close();
      });
    } catch (e) {
      console.warn('Error iniciando metadata', e);
    }
  }

  setState(state: PlayerState) {
    this.playerStateSubject.next(state);
  }

  setSong(song: string) {
    this.currentSongSubject.next(song);
  }

  ngOnDestroy() {
    this.audio?.pause();
    this.eventSource?.close();
  }
}
