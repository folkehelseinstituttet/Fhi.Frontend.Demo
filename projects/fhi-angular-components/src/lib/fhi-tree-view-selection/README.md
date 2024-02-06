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

### FhiTreeViewSelectionItem

| Property                   | Type                         | Default | Required | Description |
| -------------------------- | ---------------------------- | ------- | -------- | ----------- |
| `children`                 | `FhiTreeViewSelectionItem[]` | -       | no       | Recursively add items to the tree. |
| `descendantStateConfirmed` | `boolean`                    | -       | no       | Only for internal use. |
| `id`                       | `number \| string`           | -       | no       | Custom id's. Id's are added automatically if not set in item. |
| `isChecked`                | `boolean`                    | -       | no       | Whether the item is checked or not. |
| `isExpanded`               | `boolean`                    | -       | no       | Whether the item is expanded or not. |
| `hasCheckedDescendant`     | `boolean`                    | -       | no       | Whether the item has checked descendant or not. |
| `name`                     | `string`                     | -       | yes      | Used as value in the form check label. |
