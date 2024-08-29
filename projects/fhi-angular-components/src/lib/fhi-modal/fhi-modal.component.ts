import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { cloneDeep } from 'lodash-es';
import { FhiModalActionButton } from './fhi-modal-action-button.model';

@Component({
  selector: 'fhi-modal',
  templateUrl: './fhi-modal.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule],
  providers: [NgbModal],
})
export class FhiModalComponent implements OnChanges {
  @Input() actionButtons: FhiModalActionButton[];
  @Input() modalTitle!: string;
  @Input() openModalButtonClass = 'fhi-btn-link';
  @Input() scrollable = true;
  @Input() size = 'md';
  @Input() parentAction!: string; // TODO: typing

  @Output() dismissModal = new EventEmitter();
  @Output() modalAction = new EventEmitter<string | undefined>();
  @Output() openModal = new EventEmitter();

  @ViewChild('modalContent') modalContentRef: ElementRef;

  buttons!: FhiModalActionButton[];

  constructor(private modal: NgbModal) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['actionButtons']) {
      this.buttons = cloneDeep(this.actionButtons);
      this.buttons[this.buttons.length - 1].primary = true;
    }
    if (changes['parentAction']?.currentValue === 'openModal') {
      this.modalOpen(this.modalContentRef);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClickOpenModal(modalContent: any) {
    this.modalOpen(modalContent);
  }

  onModalAction(button: FhiModalActionButton) {
    this.modalAction.emit(button.name);
    this.modal.dismissAll();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private modalOpen(modalContent: any) {
    this.openModal.emit();
    this.modal.open(modalContent, {
      backdropClass: 'fhi-modal-backdrop',
      windowClass: 'fhi-modal',
      scrollable: this.scrollable,
      size: this.size,
      beforeDismiss: () => {
        this.dismissModal.emit();
        return true;
      },
    });
  }
}
