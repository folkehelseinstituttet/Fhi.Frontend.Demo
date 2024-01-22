# FHI Angular Components

_Contains Angular components used by Folkehelseinstituttet, which are based on [Fhi.Frontend.Style (@folkehelseinstituttet/style)](https://www.npmjs.com/package/@folkehelseinstituttet/style), [Bootstrap widgets (@ng-bootstrap)](https://ng-bootstrap.github.io) and some other third-party NPM packages._

- [Dependencies](#dependencies)
- [Get started](#get-started)
  - [Install](#install)
  - [Use in your app](#use-in-your-app)
- [Changelog](#changelog)
- [Contribute](#contribute)
- [Demo](#demo)

## Dependencies

| FHI Angular Components | FHI Style | Bootstrap | NgSelect | NgBootstrap | Angular | Node/NPM |
| ---------------------- | --------- | --------- | -------- | ----------- | ------- | -------- |
| 3.x.x                  | 5.9       | 5.3.2     | 12       | 16          | 17      | 18/9 *   |
| 2.x.x                  | 5         | 5         | 11       | 15          | 16      | 18/9 *   |
| 1.x.x                  | 5         | 5         | 10       | 14          | 15      | 18/9 *   |
| 0.5.x                  | 5         | 5         | 10       | 14          | 15      | 18/9 *   |
| 0.4.x                  | 5         | 5         | 10       | 14          | 15      | 18/9 *   |
| 0.3.0                  | 4         | 5         | 10       | 14          | 15      | 18/9 *   |
| 0.2.0                  | 4         | 5         | 9        | 13          | 14      | 16/8 *   |

For more dependencies see `peerDependencies` in [package.json](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/blob/dev/projects/fhi-angular-components/package.json)
_* [designsystem.fhi.no](https://designsystem.fhi.no) uses these Node/NPM versions, older versions may work, but then you're on your own_ :wink:

## Get started

### Install

Install with [npm](https://www.npmjs.com): `npm install @folkehelseinstituttet/angular-components`

### Use in your app

After installing the package and all dependencies, add the following code to your app:

```scss
// In global css-file (usually style.scss)
@import "./node_modules/@folkehelseinstituttet/angular-components/styles/import/all";
```

```ts
// In a standalone component or a shared module (it's possible to only import components you need)
import { FhiAngularComponentsModule } from '@folkehelseinstituttet/angular-components';
...
  imports: [FhiAngularComponentsModule]
...
```

```html
<!-- In a template -->
<!-- <fhi-[name-of-component]></fhi-[name-of-component]> -->
<fhi-tree-view-navigation [items]="items"></fhi-tree-view-navigation>
```

## Changelog

You find the [changelog here](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/blob/dev/projects/fhi-angular-components/CHANGELOG.md).

## Contribute

Read about how to contribute [here](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/blob/dev/CONTRIBUTING.md)

## Demo

- Live examples in our demo app: [https://designsystem.fhi.no](https://designsystem.fhi.no)
- Repo for demo app: [https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo)
