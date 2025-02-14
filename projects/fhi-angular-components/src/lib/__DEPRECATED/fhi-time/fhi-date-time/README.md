# FHI DateTime

## API

### Input

| Input      | Type          | Default                  | Required | Description |
| ---------- | ------------- | ------------------------ | -------- | ----------- |
| `label`    | `string`      | `Velg dato og tidspunkt` | no       | Label above the ng-datepicker input. |
| `dateTime` | `FhiDateTime` | -                        | no       | Object containing date as `FhiDate` and time as `FhiTime`. |
| `maxDate`  | `FhiDate`     | -                        | no       | Object containing date as `FhiDate` for the earliest selectable date. |
| `minDate`  | `FhiDate`     | -                        | no       | Object containing date as `FhiDate` for the latest selectable date. |

### Output

| Output           | Type          | Description |
| ---------------- | ------------- | ----------- |
| `dateTimeSelect` | `FhiDateTime` | Object containing date as `FhiDate` and time as `FhiTime`. |
