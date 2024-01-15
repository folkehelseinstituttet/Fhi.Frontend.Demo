# FHI Tree view selection

## API

### Input

| Input             | Type                               | Default | Required | Description |
| ----------------- | ---------------------------------- | ------- | -------- | ----------- |
| `enableCheckAll`  | `boolean`                          | false   | no       | Trigger to select/deselect all siblings, only if `singleSelection === false`. |
| `items`           | `Array<FhiTreeViewSelectionItem>`  | -       | yes      | Array of all items in selection tree. |
| `name`            | `string`                           | -       | no/yes   | Naming the radio button group. Required if `singleSelection === true`. |
| `singleSelection` | `boolean`                          | false   | no       | Radio buttons or checkboxes. |

### Output

| Output        | Type                              | Description |
| ------------- | --------------------------------- | ----------- |
| `itemsChange` | `Array<FhiTreeViewSelectionItem>` | An output event for accessing the state of all items in your checkbox tree. |
