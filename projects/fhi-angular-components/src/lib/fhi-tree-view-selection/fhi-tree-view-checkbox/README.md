# FHI Tree view checkbox

## API

### Input

| Input             | Type                               | Default | Required | Description |
| ----------------- | ---------------------------------- | ------- | -------- | ----------- |
| `enableCheckAll`  | `boolean`                          | false   | no       | Enable a button with text "Velg alle" above each level of checkboxes. |
| `items`           | `Array<FhiTreeViewSelectionItem>`  | -       | yes      | Array of all items in checkbox tree. |

### Output

| Output        | Type                              | Description |
| ------------- | --------------------------------- | ----------- |
| `itemsChange` | `Array<FhiTreeViewSelectionItem>` | An output event for accessing the state of all items in your checkbox tree. |

### FhiTreeViewSelectionItem

[FhiTreeViewSelectionItem](../README.md#fhitreeviewselectionitem)
