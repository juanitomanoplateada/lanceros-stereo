import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-floating-contact',
  standalone: true,
  templateUrl: './floating-contact.html',
  styleUrls: ['./floating-contact.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [],
})
export class FloatingContactComponent {
  isOpen = false;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
}
