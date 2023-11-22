# FHI Year

## API

### Input

| Input     | Type            | Default     | Required | Description |
| --------- | --------------- | ----------- | -------- | ----------- |
| `id`      | `string`        | -           | no       | Id to associate control with label. |
| `label`   | `string`        | `Velg år`   | no       | Label above the input field. |
| `minYear` | `number`        | Curren year | no       | Maximum year in the list to select from. |
| `maxYear` | `number`        | 1900        | no       | Minimum year in the list to select from. |
| `[years]` | `Array<number>` | `[]`        | no       | Array or years as numbers, but currently only support for one year. |

### Output

| Output          | Type            | Default | Required | Description |
| --------------- | --------------- | ------- | -------- | ----------- |
| `(yearsSelect)` | `Array<number>` | -       | no       | The $event value returned is array or years as numbers, but but currently only support for one year. |
