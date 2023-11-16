# FHI YearRange

## API

### Input

| Input     | Type            | Default     | Required | Description |
| --------- | --------------- | ----------- | -------- | ----------- |
| `minYear` | `number`        | Curren year | no       | Maximum year in the list to select from. |
| `maxYear` | `number`        | 1900        | no       | Minimum year in the list to select from. |

### Output

| Output              | Type           | Default | Required | Description |
| ------------------- | -------------- | ------- | -------- | ----------- |
| `(yearRangeSelect)` | `FhiYearRange` | -       | no       | The $event value returned is a FhiYearRange object. |
