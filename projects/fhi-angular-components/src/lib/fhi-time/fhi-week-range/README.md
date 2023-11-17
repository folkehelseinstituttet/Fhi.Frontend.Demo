# FHI WeekRange

## API

| Input              | Type           | Default    | Required | Description |
| ------------------ | ---------      | ---------- | -------- | ----------- |
| `minWeek`          | `FhiWeek`      | -          | no       | Object containing year and week numbers for the first possible week to select. |
| `maxWeek`          | `FhiWeek`      | -          | no       | Object containing year and week numbers for the last possible week to select. |

---

| Output            | Type           | Description |
| -----------       | -------------- | ----------- |
| `weekRangeSelect` | `FhiWeekRange` | Object containing range from: year and week, to: year and week. |
