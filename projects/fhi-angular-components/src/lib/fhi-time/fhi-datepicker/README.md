# FHI Datepicker

## API

### Input

| Input              | Type      | Default    | Required | Description |
| ------------------ | --------- | ---------- | -------- | ----------- |
| `label`            | `string`  | `Velg uke` | no       | Label above the ng-datepicker input. |
| `date`             | `FhiDate` | -          | no       | Object containing year, month and day as numbers. |
| `minDate`          | `FhiDate` | -          | no       | Object containing year, month and day as numbers for the first possible date to select. |
| `maxDate`          | `FhiDate` | -          | no       | Object containing year, month and day as numbers for the last possible date to select. |

### Output

| Output       | Type      | Description |
| ------------ | --------- | ----------- |
| `dateSelect` | `FhiDate` | Object containing year, month and day as numbers. |
