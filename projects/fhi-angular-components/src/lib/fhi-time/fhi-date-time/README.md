# FHI DateTime

## API

### Input

| Input              | Type          | Default                  | Required | Description |
| ------------------ | ------------- | ------------------------ | -------- | ----------- |
| `id`               | `string`      | random                   | no       | Id to associate control with label. |
| `label`            | `string`      | `Velg dato og tidspunkt` | no       | Label above the ng-datepicker input. |
| `dateTime`         | `FhiDateTime` | -                        | no       | Object containing date as `FhiDate` and time as `FhiTime`. |

### Output

| Output           | Type          | Description |
| ---------------- | ------------- | ----------- |
| `dateTimeSelect` | `FhiDateTime` | Object containing date as `FhiDate` and time as `FhiTime`. |
