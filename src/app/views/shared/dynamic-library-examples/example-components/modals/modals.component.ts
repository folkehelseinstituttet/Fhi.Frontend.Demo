import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';

import { LibraryItemsShared } from '../../../models/library-item.model';
import { FhiModalActionButton } from '@folkehelseinstituttet/angular-components';

interface FormValues {
  firstName: string | null;
  lastName: string | null;
  serverRespons: string | null;
}

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
})
export class ModalsComponent {
  @Input() itemId!: string;
  @Input() items!: LibraryItemsShared;

  actionButtons: FhiModalActionButton[] = [
    { name: 'Handling x', disabled: true },
    { name: 'Handling 2' },
    { name: 'Handling 1' },
  ];
  openModal = false;

  example5 = {
    closeModal: false,
    waitingForServer: false,
    serverError: false,
    waitingForAsyncValidation: false,
    form: undefined as FormGroup,
  };

  constructor() {
    this.example5.form = new FormGroup({
      firstName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(4), Validators.maxLength(4)],
        asyncValidators: [this.nameValidator('first')],
      }),
      lastName: new FormControl(null, {
        validators: [Validators.minLength(8), Validators.maxLength(8)],
        asyncValidators: [this.nameValidator('last')],
      }),
      serverRespons: new FormControl('OK'),
    });
  }

  onModalAction(action: string) {
    console.info('onModalAction:', action);
  }

  onPopoverActionOpenModalFromParent(action: string) {
    if (action === 'openModal') {
      this.openModal = true;
    }
  }

  onDismissModal() {
    this.openModal = false;
  }

  //
  //  Eks. 5
  //

  get firstName(): AbstractControl {
    return this.example5.form.get('firstName');
  }

  get lastName(): AbstractControl {
    return this.example5.form.get('lastName');
  }

  onModalActionExample5(action: string) {
    if (action === 'Send') {
      this.submit();
    }
  }

  onEnterExample5() {
    this.submit();
  }

  private submit() {
    const value = this.example5.form.value;

    if (this.example5.form.pending) {
      this.example5.waitingForAsyncValidation = true;
      return;
    }
    if (this.example5.form.invalid) {
      return;
    }

    this.example5.waitingForServer = true;
    this.example5.serverError = false;
    this.example5.closeModal = false;

    handleFormMockApiCall(value).subscribe({
      next: (value) => {
        console.log(value);
        this.example5.closeModal = true;
        this.example5.waitingForServer = false;
      },
      error: (error) => {
        console.error(error);
        this.example5.waitingForServer = false;
        this.example5.serverError = true;
      },
    });
  }

  private nameValidator(nameType: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return isNameValidMockAsyncValidation(control.value, nameType).pipe(
        map((valid) => (!valid ? { nameError: { value: control.value } } : null)),
        tap(() => (this.example5.waitingForAsyncValidation = false)),
        catchError(() => of(null)),
      );
    };
  }
}

//
// The following functions will typically be methods in services.
//

function isNameValidMockAsyncValidation(value: string, nameType: string): Observable<boolean> {
  return of(value).pipe(
    delay(2000),
    map((value) => {
      let valid = false;

      if (nameType === 'first') {
        valid = value === 'Guri';
      } else if (nameType === 'last') {
        valid = !value ? true : value === 'Rørtveit';
      }
      return valid;
    }),
  );
}

function handleFormMockApiCall(value: FormValues): Observable<FormValues> {
  return of(value).pipe(
    delay(2000),
    map((value) => {
      if (value.serverRespons === 'error') {
        throw '"Error!"';
      }
      return value;
    }),
    catchError((error) => {
      throw `Server respons: ${error}`;
    }),
  );
}
