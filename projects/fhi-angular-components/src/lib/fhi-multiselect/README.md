# FHI Multiselect

## API

| Input               | Type                        | Default | Required | Description |
| ------------------- | --------------------------- | ------- | -------- | ----------- |
| `[items]`           | `Array<FhiMultiselectItem>` | `[]`    | yes      | Items array (same as in ng-select except for item type `FhiMultiselectItem`). |
| `labelForId`        | `string`                    | -       | no       | Id to associate control with label (same as in ng-select). |
| `placeholder`       | `string`                    | -       | no       | Placeholder text (same as in ng-select). |
| `description`       | `string`                    | -       | no       | Description below the label (custom for FHI Multiselect). |
| `label`             | `string`                    | `Label` | yes      | Label above the ng-select field (custom for FHI Multiselect). |
| `notFoundText`      | `string`                    | `Ingen resultater funnet` | no       | Set custom text when filter returns empty result (same as in ng-select). |
| `tagsEnabled`       | `boolean`                   | true    | no       | Listing of tags below multiselect as a second way of viewing and removing selections. |
| `[(selectedItems)]` | `Array<any>`                | `[]`    | yes      | A two way binding to access ng-select's `ngModel`. |
