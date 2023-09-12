# New library items

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
2. Rename new folder and files (keep prefix `_` and suffix `.data`, and `.intro`)
3. Rename `const Items` and `const Data` in `./your-new-items/_your-new-items.data.ts` (keep suffix `Data`)
4. Rename `const ItemsIntro` in `./your-new-items/_your-new-items.intro.ts` (keep suffix `Intro`)
5. Rename `const ItemOne` in `./your-new-items/your-new-item.ts`
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
