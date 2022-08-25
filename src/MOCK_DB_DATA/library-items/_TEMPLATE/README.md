# Template

This is just boiler plate code for a library item, including its mock-db data file.

## When creating new mock-db data file

Remember to create a constant in `src/app/segment-paths.ts`, under `Library second level menu` for every new mock db data file.

**NB!** These constants has a coupling to the mock-db data file.

```ts
static nameOfConstant = 'nameOfConstant';
```

in `src/app/segment-paths.ts` corresponds to

```ts
export const NameOfConstantData: LibraryItem[] = [{...}];
```

in file `src/MOCK_DB_DATA/library-items/foo/_foo.data.ts`.

## File structure

I more than one variation of component i needed, the file structure will be:

```bash
library-items/
    foo/
        _foo.data.ts
        foo-bar.data.ts
        foo-baz.data.ts
        etc.
```

