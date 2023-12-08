import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'fhi-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fhi-layout.component.html',
})
export class FhiLayoutComponent {
  @Input() layoutType: string;
}
