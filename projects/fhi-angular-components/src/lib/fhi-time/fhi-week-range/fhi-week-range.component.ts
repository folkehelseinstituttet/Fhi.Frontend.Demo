import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FhiWeekpickerComponent } from '../fhi-weekpicker/fhi-weekpicker.component';

@Component({
  selector: 'fhi-week-range',
  standalone: true,
  imports: [ CommonModule, FhiWeekpickerComponent ],
  templateUrl: './fhi-week-range.component.html'
})
export class FhiWeekRangeComponent {
  @Input() weekFrom: string | null = null;
  @Input() weekTo: string | null = null;
  @Input() fromWeekLabel: string = 'Fra uke';
  @Input() toWeekLabel: string = 'Til uke';
  @Input() maxWeekFrom: string = '2050-52';
  @Input() maxWeekTo: string = '2050-52';
  @Input() minWeekFrom: string = '1900-1';
  @Input() minWeekTo: string = '1900-1';

  fromWeekId: string = 'from-week_' + Math.random().toString(36).substring(2, 20);
  toWeekId: string = 'to-week_' + Math.random().toString(36).substring(2, 20);
  fromWeek: string;
  toWeek: string;

  getFromWeek(event: string) {
    this.fromWeek = event;
  }
  getToWeek(event: string) {
    this.toWeek = event;
  }
}
