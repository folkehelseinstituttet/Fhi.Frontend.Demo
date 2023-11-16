# FHI WeekRange

## API

| Input              | Type           | Default    | Required | Description |
| ------------------ | ---------      | ---------- | -------- | ----------- |
| `id`               | `string`       | -          | no       | Id to associate control with label. *** Hva skal denne brukes til ? *** |
| `minWeek`          | `FhiWeek`      | -          | no       | Object containing year and week numbers for the first possible week to select. |
| `maxWeek`          | `FhiWeek`      | -          | no       | Object containing year and week numbers for the last possible week to select. |
| `weekFrom`         | `FhiWeek`      | -          | no       | Object containing year and week numbers for the from element |
| `weekTo`           | `FhiWeek`      | -          | no       | Object containing year and week numbers for the to element |

---

| Output            | Type           | Description |
| -----------       | -------------- | ----------- |
| `weekRangeSelect` | `FhiWeekRange` | Object containing range from: year and week, to: year and week. |
