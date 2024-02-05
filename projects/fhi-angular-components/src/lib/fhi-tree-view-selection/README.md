# FHI Tree view checkbox and FHI Tree view radio

## FHI Tree view checkbox

### API

#### Input

| Input             | Type                               | Default | Required | Description |
| ----------------- | ---------------------------------- | ------- | -------- | ----------- |
| `enableCheckAll`  | `boolean`                          | false   | no       | Trigger to select/deselect all siblings, only if `singleSelection === false`. |
| `items`           | `Array<FhiTreeViewSelectionItem>`  | -       | yes      | Array of all items in selection tree. |

#### Output

| Output        | Type                              | Description |
| ------------- | --------------------------------- | ----------- |
| `itemsChange` | `Array<FhiTreeViewSelectionItem>` | An output event for accessing the state of all items in your checkbox tree. |

## FHI Tree view radio

### API

#### Input

| Input             | Type                               | Default | Required | Description |
| ----------------- | ---------------------------------- | ------- | -------- | ----------- |
| `items`           | `Array<FhiTreeViewSelectionItem>`  | -       | yes      | Array of all items in selection tree. |
| `name`            | `string`                           | -       | yes      | Naming the radio button group. |

#### Output

| Output        | Type                              | Description |
| ------------- | --------------------------------- | ----------- |
| `itemsChange` | `Array<FhiTreeViewSelectionItem>` | An output event for accessing the state of all items in your radio tree. |
