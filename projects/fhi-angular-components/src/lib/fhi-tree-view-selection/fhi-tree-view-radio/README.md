# FHI Tree view radio

## API

### Input

| Input          | Type                              | Default          | Required | Description                                          |
|----------------|-----------------------------------|------------------|----------|------------------------------------------------------|
| `enableFilter` | `boolean`                         | false            | no       | Enable a text input for filtering the checkbox tree. |
| `filterLabel`  | `string`                          | `Filtrer listen` | no       | Label for the checkbox tree filter.                  |
| `items`        | `Array<FhiTreeViewSelectionItem>` | -                | yes      | Array of all items in radio tree.                    |
| `name`         | `string`                          | -                | yes      | Naming the radio button group.                       |

### Output

| Output        | Type                              | Description                                                              |
|---------------|-----------------------------------|--------------------------------------------------------------------------|
| `itemsChange` | `Array<FhiTreeViewSelectionItem>` | An output event for accessing the state of all items in your radio tree. |

### FhiTreeViewSelectionItem

[FhiTreeViewSelectionItem](../README.md#fhitreeviewselectionitem)
