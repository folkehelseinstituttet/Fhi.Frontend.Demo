# FHI Weekpicker

## API

| Input              | Type      | Default    | Required | Description |
| ------------------ | --------- | ---------- | -------- | ----------- |
| `id`               | `string`  | -          | no       | Id to associate control with label. |
| `week`             | `FhiWeek` | -          | no       | Object containing year and week numbers. |
| `minWeek`          | `FhiWeek` | -          | no       | Object containing year and week numbers for the first possible week to select. |
| `maxWeek`          | `FhiWeek` | -          | no       | Object containing year and week numbers for the last possible week to select. |
| `label`            | `string`  | `Velg uke` | no       | Label above the ng-datepicker input. |

---

| Output       | Type      | Description |
| ------------ | --------- | ----------- |
| `weekSelect` | `FhiWeek` | Object containing year and week numbers |
