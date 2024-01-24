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
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface ActionButton {
  name: string;
  enabled: boolean;
  primary?: boolean;
}

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
  @Input() actionButtons = [{ name: 'Lukk', enabled: true }];
  @Input() modalTitle!: string;
  @Input() openModalButtonClass = 'fhi-btn-link';
  @Input() scrollable = false;
  @Input() size = 'sm';

  @Output() dismissModal = new EventEmitter();
  @Output() modalAction = new EventEmitter<string | undefined>();
  @Output() openModal = new EventEmitter();

  buttonType = 'primary';
  buttons!: ActionButton[];

  constructor(private modal: NgbModal) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['actionButtons']) {
      const buttons = this.actionButtons as ActionButton[];
      buttons[buttons.length - 1].primary = true;
      this.buttons = buttons;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClickOpenModal(modalContent: any) {
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

  onModalAction(actionButton: ActionButton) {
    if (!actionButton.enabled) {
      this.modalAction.emit();
      return;
    }
    this.modalAction.emit(actionButton.name);
    this.modal.dismissAll();
  }
}
