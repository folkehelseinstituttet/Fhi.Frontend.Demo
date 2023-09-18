# New library items

- [Folder structure and file naming](#folder-structure-and-file-naming)
  - [Library item group](#library-item-group)
  - [Library item with "dynamic example"](#library-item-with-dynamic-example)
- [HOWTO's](#howtos)
  - [How to create a new library item group](#how-to-create-a-new-library-item-group)
  - [How to create a new library item in an exsisting mock-db data file](#how-to-create-a-new-library-item-in-an-exsisting-mock-db-data-file)

## Folder structure and file naming

### Library item group

Using Accordions to show naming convention:

```bash
library-items/
  accordions/ # Always plural, even if Bootstrap doesn't use plural in their documentation
    _accordions.data.ts # Always "_[folder-name].data.ts" 
    _accordions.intro.ts # Always "_[folder-name].intro.ts"
    accordion.ts # Always "[folder-name (singular)].ts" OR "[folder-name (singular)]-[suffix].ts" if first item (eg. suffix is optional)
    accordion-flush.ts # Always "[folder-name (singular)]-[suffix].ts" if item nr. 2 or higher
    etc.
```

### Library item with "dynamic example"

If a library item in a group needs Angular code to work the code goes into folder: `app/views/shared/dynamic-library-examples/all-example-components/`

NB! Only one component pr. item group.

Using Accordions to show naming convention:

```bash
example-components/
  accordions/ # Always same name as the corresponding library item group
    accordions.component.html 
    accordions.component.ts
```

## HOWTO's

### How to create a new library item group

1. Copy the folder `./.TEMPLATE/items` and paste it in under `./`
2. Rename new folder, files as described under [Folder structure and file naming](#folder-structure-and-file-naming)
3. Rename `ItemOne` -> `YourNewItem` in `./your-new-items/your-new-item.ts`
4. Rename `ItemsIntro` -> `YourNewItemsIntro` in `./your-new-items/_your-new-items.intro.ts` (keep suffix `Intro`)
5. In `./your-new-items/_your-new-items.data.ts`
   1. Update import `ItemsIntro` to `./_your-new-items.intro.ts`
   2. Update import `ItemsOne` to `./_your-new-item.ts`
   3. Rename `Items` -> `YourNewItems`
   4. Rename `ItemsData` -> `YourNewItemsData` (keep suffix `Data`)
   5. Rename `GROUPS.Items` -> `GROUPS.YourNewItems`
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
