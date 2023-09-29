# FHI Multiselect

## API

| Input               | Type                        | Default | Required | Description |
| ------------------- | --------------------------- | ------- | -------- | ----------- |
| `[items]`           | `Array<FhiMultiselectItem>` | -       | yes      | Items array (same as in ng-select except for item type FhiMultiselectItem). |
| `labelForId`        | `string`                    | -       | no       | Id to associate control with label (same as in ng-select). |
| `placeholder`       | `string`                    | -       | no       | Placeholder text (same as in ng-select). |
| `description`       | `string`                    | -       | no       | Description below the label (custom for FhiMultiselect). |
| `label`             | `string`                    | -       | yes      | Label above the ng-select field (custom for FhiMultiselect). |
| `notFoundText`      | `string`                    | -       | no       | Set custom text when filter returns empty result (same as in ng-select). |
| `[(selectedItems)]` | `Array<any>`                | -       | yes      | A two way binding to access ng-select's `ngModel`. |
