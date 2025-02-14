# FHI Autosuggest

## API

| Input              | Type                        | Default | Required | Description |
| ------------------ | --------------------------- | ------- | -------- | ----------- |
| `[items]`          | `Array<FhiAutosuggestItem>` | -       | yes      | Items array (same as in ng-select except for item type `FhiAutosuggestItem`). |
| `labelForId`       | `string`                    | -       | no       | Id to associate control with label (same as in ng-select). |
| `placeholder`      | `string`                    | -       | no       | Placeholder text (same as in ng-select). |
| `description`      | `string`                    | -       | no       | Description below the label (custom for FHI Autosuggest). |
| `label`            | `string`                    | -       | yes      | Label above the ng-select field (custom for FHI Autosuggest). |
| `notFoundText`     | `string`                    | `Ingen resultater funnet` | no       | Set custom text when filter returns empty result (same as in ng-select). |
| `[(selectedItem)]` | `number`                    | -       | yes      | A two way binding to access ng-select's `ngModel`. The $event value returned is always item.id |
