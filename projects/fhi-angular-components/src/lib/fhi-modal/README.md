# FHI Modal <!-- omit from toc -->

- [API](#api)
  - [Input](#input)
  - [Output](#output)
  - [FhiModalActionButton](#fhimodalactionbutton)
- [How To](#how-to)
  - [Keep modal open while waiting for server](#keep-modal-open-while-waiting-for-server)
  - [Destroy services or reset forms when closing modal](#destroy-services-or-reset-forms-when-closing-modal)

## API

### Input

| Input                    | Type                     | Default        | Required | Description |
| ------------------------ | ------------------------ | -------------- | -------- | ----------- |
| `[actionButtons]`        | `FhiModalActionButton[]` | -              | no       | Object defining the buttons in the modal. |
| `modalTitle`             | `string`                 | -              | no       | Title at the top of the modal. |
| `openModalButtonClass`   | `string`                 | `fhi-btn-link` | no       | Button class on the button that opens the modal. The button can also be modified with markup inside the button. |
| `[openModalFromParent]`  | `boolean`                | `false`        | no       | When set to `true`* the method `FhiModalComponent.modal.open()` will be called. |
| `[closeModalFromParent]` | `boolean`                | `false`        | no       | When set to `true`* the method `FhiModalComponent.modal.dismissAll()` will be called. |
| `[disableCloseOnAction]` | `boolean`                | `false`        | no       | When set to `true`* the method `FhiModalComponent.modal.dismissAll()` will NOT be called when `FhiModalComponent.onModalAction()` is called. |
| `[scrollable]`           | `boolean`                | `true`         | no       | Same as NgbModal |
| `size`                   | `string`                 | `md`           | no       | Same as NgbModal |

*\* To be able to trigger change detection more than once, parent component is responsible for toggeling the value.*

### Output

| Output           | Type     | Description |
| ---------------- | -------- | ----------- |
| `(dismissModal)` | `void`   | Same as NgbModal. |
| `(modalAction)`  | `string` | Name of the button calling the action. Use this to respond the action in the parent component. |
| `(openModal)`    | `void`   | Same as NgbModal. |

### FhiModalActionButton

| Property   | Type      | Default | Required | Description |
| ---------- | --------- | ------- | -------- | ----------- |
| `name`     | `string`  | -       | yes      | Name of the button calling the action. |
| `disabled` | `boolean` | -       | no       | Whether the button is disabled or not. |
| `primary`*  | `boolean` | -       | no       | Whether the button calls the primary action or not. |

\* **NB!** Property `primary` will be deprecated in v6.0.0 of [@folkehelseinstituttet/angular-components](https://www.npmjs.com/package/@folkehelseinstituttet/angular-components).

## How To

Code demonstrating the use cases below is located [here](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/tree/dev/src/app/views/shared/dynamic-library-examples/example-components/modals) (see example 5).

### Keep modal open while waiting for server

If the modal should be kept open while waiting for a server response, the input `disableCloseOnAction` must be set to `true`. The parent component must then take responsebility for closing the modal. This is done by setting input `closeModalFromParent` to `true`.

**NB!** To trigger change detection every time input `closeModalFromParent` is set to `true`, it must be set to `false` in between, so the parent component will have to do some state management. The same logic applies to inputs `openModalFromParent` btw.

### Destroy services or reset forms when closing modal

If the template content inside `<ng-container fhi-modal.body></ng-container>` contains a child component, a form or some service logic, and it's necessary to destroy component, reset form or do some other clean up when the modal is closed, this is the responsibility of the parent component. In example 5 this is demonstrated by a form reset (see method `onDismissModalExample5()`).
