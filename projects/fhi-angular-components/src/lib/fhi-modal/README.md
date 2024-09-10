# FHI Modal

## API

### Input

| Input                   | Type                     | Default        | Required | Description |
| ----------------------- | ------------------------ | -------------- | -------- | ----------- |
| `[actionButtons]`       | `FhiModalActionButton[]` | -              | no       | Object defining the buttons in the modal. |
| `modalTitle`            | `string`                 | -              | no       | Title at the top of the modal. |
| `openModalButtonClass`  | `string`                 | `fhi-btn-link` | no       | Button class on the button that opens the modal. The button can also be modified with markup inside the button. |
| `[openModalFromParent]` | `boolean`                | `false`        | no       | When set to `true` the method `FhiModalComponent.modal.open()` will be triggered. To be able to trigger change detection more than once, parent component is responsible for toggeling the value. |
| `[scrollable]`          | `boolean`                | `true`         | no       | Same as NgbModal |
| `size`                  | `string`                 | `md`           | no       | Same as NgbModal |

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
| `primary`  | `boolean` | -       | no       | Whether the button calls the primary action or not. |
