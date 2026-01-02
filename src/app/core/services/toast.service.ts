import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastData {
    message: string;
    type: 'success' | 'error' | 'info';
    visible: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    private stateSubject = new BehaviorSubject<ToastData>({
        message: '',
        type: 'info',
        visible: false,
    });
    state$ = this.stateSubject.asObservable();

    show(message: string, type: 'success' | 'error' | 'info' = 'info') {
        this.stateSubject.next({ message, type, visible: true });

        // Auto-hide after 4 seconds
        setTimeout(() => {
            this.hide();
        }, 4000);
    }

    hide() {
        const current = this.stateSubject.value;
        this.stateSubject.next({ ...current, visible: false });
    }
}
