# FHI YearMonthRange

## API

### Input

| Input        | Type       | Default | Required | Description |
| ------------ | ---------- | ------- | -------- | ----------- |
| `[minMonth]` | `FhiMonth` | -       | no       | Object with properties year and month, used to restrict the range back in time. |
| `[maxMonth]` | `FhiMonth` | -       | no       | Object with properties year and month, used to restrict the range forward in time. |

### Output

| Output               | Type            | Default | Required | Description |
| -------------------- | --------------- | ------- | -------- | ----------- |
| `(monthRangeSelect)` | `FhiMonthRange` | -       | no       | The $event value returned is a FhiMonthRange object. |
