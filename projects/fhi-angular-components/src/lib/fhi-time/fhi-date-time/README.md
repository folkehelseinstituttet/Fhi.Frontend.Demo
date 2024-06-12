# FHI DateTime

## API

### Input

| Input         | Type          | Default                  | Required | Description |
| ------------- | ------------- | ------------------------ | -------- | ----------- |
| `label`       | `string`      | `Velg dato og tidspunkt` | no       | Label above the ng-datepicker input. |
| `dateTime`    | `FhiDateTime` | -                        | no       | Object containing date as `FhiDate` and time as `FhiTime`. |
| `maxDateTime` | `FhiDateTime` | -                        | no       | Object containing date as `FhiDate` and time as `FhiTime` for the maximum selectable time stamp. |
| `minDateTime` | `FhiDateTime` | -                        | no       | Object containing date as `FhiDate` and time as `FhiTime` for the minimum selectable time stamp. |

### Output

| Output           | Type          | Description |
| ---------------- | ------------- | ----------- |
| `dateTimeSelect` | `FhiDateTime` | Object containing date as `FhiDate` and time as `FhiTime`. |
