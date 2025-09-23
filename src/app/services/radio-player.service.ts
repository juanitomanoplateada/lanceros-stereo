import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type PlayerState = 'stopped' | 'loading' | 'playing';

@Injectable({
  providedIn: 'root',
})
export class RadioPlayerService {
  private playerStateSubject = new BehaviorSubject<PlayerState>('stopped');
  playerState$ = this.playerStateSubject.asObservable();

  private currentSongSubject = new BehaviorSubject<string>(
    'Esperando transmisión...'
  );
  currentSong$ = this.currentSongSubject.asObservable();

  setState(state: PlayerState) {
    this.playerStateSubject.next(state);
  }

  getState(): PlayerState {
    return this.playerStateSubject.value;
  }

  setSong(song: string) {
    this.currentSongSubject.next(song);
  }

  getSong(): string {
    return this.currentSongSubject.value;
  }
}
