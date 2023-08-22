# New library items

## File structure

If more than one variation of component is needed, the file structure will be:

```bash
library-items/
  foo/
    _foo.data.ts
    _foo.intro.ts
    foo-bar.ts
    foo-baz.ts
    etc.
```

## HOW TO

### How to create a new mock-db data file with a library item

1. Copy the folder `./.TEMPLATE/foo` and paste it in under `./`
2. 
3. Rename new folder and files (keep prefix `_` and suffix `.data`, and `.intro`)
4. Rename `const Template1` in `./your-new-items/your-new-item.ts`
5. Rename `const TemplateData` in `./your-new-items/_your-new-items.data.ts` (keep suffix `Data`)
6. Rename `const TemplateIds` in `./your-new-items/_your-new-items.ids.ts` (keep suffix `Ids`)
7. Add a new import and add imported object to `libraryItemIds` in `../library-item-ids.ts`
8. Add a new import and constant in `../library-item-segment-paths.ts`
9. Add `YourNewItemsData` to `AllData` in `../library-items.data.ts`
10. Add `YourNewItemsData` to the return object in `src/app/core/mock-db.service.ts`
11. Add a new menu item to one of the methodes called within `getSecondLevelMenuItems()` in `src/app/shared/services/library-menu.service.ts`

### How to create a new library item in an exsisting mock-db data file

1. Copy/paste `./existing-items/existing-item.ts`
2. Rename new file: `./existing-items/your-new-item.ts`
3. Rename the exported constant in `./existing-items/your-new-item.ts`
4. Add a new property in object `ExistingItemsIds`, in `./existing-items.ids.ts`
5. Add your new item to exported constant in `./existing-items/existing-items.data.ts`
6. Update all data in the `YourNewItem`-object in `./existing-items/your-new-item.ts`
