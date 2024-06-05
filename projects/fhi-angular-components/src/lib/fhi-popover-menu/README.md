# FHI Popover menu

## API

### Input

| Input         | Type                    | Default               | Required | Description                                                        |
|---------------|-------------------------|-----------------------|----------|--------------------------------------------------------------------|
| `items`       | `Array<FhiPopoverItem>` | -                     | yes      | Array of menu items.                                               |
| `triggerIcon` | `string`                | `three-dots-vertical` | no       | Name of an icon available in @folkehelseinstituttet/style icon-set |

### Output

| Output        | Type     | Description                              |
|---------------|----------|------------------------------------------|
| `actionEvent` | `string` | Emits the FhiPopoverItem.action if used. |

### Type FhiPopoverItem

| Property       | Type                                   | Default | Required | Description                                                                                                      |
|----------------|----------------------------------------|---------|----------|------------------------------------------------------------------------------------------------------------------|
| `action`       | `string`                               | -       | no       | String to identify the wanted action                                                                             |
| `link`         | `{ href: string; download?: boolean }` | -       | no       | Url and indication if it's a file download link                                                                  |
| `icon`         | `string`                               | -       | no       | Icon name from [FHI Designsystem icon set](https://designsystem.fhi.no/developer/visual-identity/icons#icon-set) |
| `name`         | `string`                               | -       | yes      | Name on item for display                                                                                         |
| `routerLink`   | `string`                               | -       | no       | String for routing                                                                                               |
