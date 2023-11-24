import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-header-example',
  templateUrl: './layout-header-example.component.html',
  imports: [CommonModule],
})
export class LayoutHeaderExampleComponent {
  menuIsOpen = false;

  toggleMenu() {
    this.menuIsOpen = !this.menuIsOpen;
  }
}
