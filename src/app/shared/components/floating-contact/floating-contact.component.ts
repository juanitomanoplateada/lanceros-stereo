import { Component } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-floating-contact',
  templateUrl: './floating-contact.html',
  styleUrls: ['./floating-contact.scss'],
  imports: [NgIf],
})
export class FloatingContactComponent {
  isOpen = false;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
}
