# New library items

## File structure

If more than one variation of component i needed, the file structure will be:

```bash
library-items/
    foo/
        _foo.data.ts
        foo-bar.data.ts
        foo-baz.data.ts
        etc.
```

## HOW TO

### How to create a new mock-db data file with a library item

1. Copy/paste the folder `./.TEMPLATE`
2. Rename new folder and files (keep prefix `_` and postfix `.data`)
3. Rename `const Template` in `./your-new-items/your-new-item.ts`
4. Rename `const TemplateData` in `./your-new-items/_your-new-items.data.ts` (keep postfix `Data`)
5. Add a new property in object `libraryItemIds`, in `src/app/views/shared/library-item-ids.ts`
6. Add a constant in `src/app/segment-paths.ts`, under `Library second level menu`
7. Add a new menu item to one of the methodes called within `getSecondLevelMenuItems()` in the root component in one, or more, of the lazy loaded views, eg. `src/app/views/developer/developer.component.ts`
8. Add `YourNewItemsData` to the return object in `src/app/core/mock-db.service.ts`

### How to create a new library item in an exsisting mock-db data file

1. Copy/paste `./existing-items/existing-item.ts`
2. Rename new file: `./existing-items/your-new-item.ts`
3. Rename the exported constant in `./existing-items/your-new-item.ts`
4. Add a new property in object `libraryItemIds`, in `src/app/views/shared/library-item-ids.ts`
5. Update all data in the `LibraryItem`-object
6. Add your new item to exported constant in `./existing-items/existing-items.data.ts`

## NB! An important relation between two constants

Following the first "how to" result in two constant which has a strong coupling to each other. Not optimal, but a way to make this simple app work ;)

```ts
static foo = 'foo';
```

in `src/app/segment-paths.ts` corresponds to

```ts
export const FooData: LibraryItem[] = [{...}];
```

in file `src/MOCK_DB_DATA/library-items/foo/_foo.data.ts`.

The last segment in the links in "Library second level menu" is used to call `getLibraryItems()` in `ListOfVariationsDataService`.
