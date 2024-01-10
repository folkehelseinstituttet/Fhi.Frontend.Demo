# FHI Popover menu

## API

### Input

| Input          | Type                    | Default               | Required | Description |
| -------------- | ----------------------- | --------------------- | -------- | ----------- |
| `items`        | `Array<FhiPopoverItem>` | -                     | yes      | Array of menu items. |
| `triggerIcon`  | `string`                | `three-dots-vertical` | yes      | Name of an icon available in @folkehelseinstituttet/style icon-set. |

### Output

| Output        | Type     | Description |
| ------------- | -------- | ----------- |
| `actionEvent` | `string` | Emits the FhiPopoverItem.action if used. |
