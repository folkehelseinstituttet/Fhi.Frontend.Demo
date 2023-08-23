# New library items

## File and folder structure

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
2. Rename new folder and files (keep prefix `_` and suffix `.data`, and `.intro`)
3. Rename `const FooItems` and `const FooData` in `./your-new-items/_your-new-items.data.ts` (keep suffix `Data`)
4. Rename `const FooIntro` in `./your-new-items/_your-new-items.intro.ts` (keep suffix `Intro`)
5. Rename `const FooBar` in `./your-new-items/your-new-item.ts`
6. Add the following to `./library-item-groups-shared-data.ts`:

    ```ts
    YourNewItems: {
      id: 'yournewitems', // must be uniqe
      title: 'Title for your new item group'
      apiEndPoint: 'YourNewItemsData', // must be identical to exported constant in ./your-new-items/_your-new-items.data.ts
      parentUrlSegment: UrlSegment.components
    },
    ```

7. Add the following to `./library-items-shared-data.ts`:

    ```ts
    YourNewItem: {
      id: 'yournewitem', // must be uniqe
      title: 'Title for your new item'
    },
    ```

8. Add `YourNewItemsData` to the return object in `src/app/core/mock-db.service.ts`

### How to create a new library item in an exsisting mock-db data file

1. Copy/paste `./existing-items/existing-item.ts`
2. Rename new file: `./existing-items/your-new-item.ts`
3. Rename the exported constant in `./existing-items/your-new-item.ts`
4. Add your new item to library items constant in `./existing-items/existing-items.data.ts`
5. Add the following to `./library-items-shared-data.ts`:

    ```ts
    YourNewItem: {
      id: 'yournewitem', // must be uniqe
      title: 'Title for your new item'
    },
    ```

6. Update all data in the `YourNewItem`-object in `./existing-items/your-new-item.ts`
