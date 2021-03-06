import { LibraryExample } from 'src/app/shared/models/library-example.model';
import { NgbDatepickerDocumentation } from './ngb-datepicker-dockumentation';

export const NgbDatepickerSelect: LibraryExample[] = [{
  title: 'Datepicker (select)',

  exampleMarkdown: `
<div class="fhi-datepicker" [ngClass]="{'fhi-datepicker--open': datepicker.isOpen()}">
  <label for="fra-dato" class="">Velg dato</label>
  <div class="input-group fhi-datepicker__input-group">
    <div class="input-group-prepend fhi-datepicker__input-group-prepend">
      <button class="btn fhi-datepicker__btn" type="button" (click)="datepicker.toggle()">
        <fa-icon [icon]="faCalendarAlt"></fa-icon>
      </button>
    </div>
    <input type="text" name="fra-dato" id="fra-dato" autocomplete="off"
           class="form-control fhi-datepicker__form-control" placeholder="dd.mm.åååå"
           ngbDatepicker #datepicker="ngbDatepicker" [minDate]="minDate"
           [maxDate]="maxDate" [navigation]="navigation" [outsideDays]="outsideDays">
  </div>
</div>`,

  documentationMarkdown: NgbDatepickerDocumentation
}];
