# FHI AngularComponents

Contains frontend Angular components used by FHI, based on [Bootstrap widgets (@ng-bootstrap)](https://ng-bootstrap.github.io) and [Fhi.Frontend.Style (@folkehelseinstituttet/style)](https://www.npmjs.com/package/@folkehelseinstituttet/style)

## Dependencies

| FHI AngularComponents | FHI Style | Bootstrap | NgSelect | NgBootstrap | Angular | Node/NPM |
| --------------------- | --------- | --------- | -------- | ----------- | ------- | -------- |
| Unreleased            | 5         | 5         | 10       | 14          | 15      | 18/9 *   |
| 0.3.0                 | 4         | 5         | 10       | 14          | 15      | 18/9 *   |
| 0.2.0                 | 4         | 5         | 9        | 13          | 14      | 16/8 *   |

For more dependencies see `peerDependencies` in [package.json](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/blob/dev/projects/fhi-angular-components/package.json)
_* [designsystem.fhi.no](https://designsystem.fhi.no) uses these Node/NPM versions, older versions may work, but then you're on your own_ :wink:

## Changelog

You find the [changelog here](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/blob/dev/projects/fhi-angular-components/CHANGELOG.md).

## Contribute

Read about how to contribute [here](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/blob/dev/CONTRIBUTING.md)

## Demo and documentation

Live examples in our demo app: [https://designsystem.fhi.no](https://designsystem.fhi.no)

Repo for demo app: [Fhi.Frontend.Demo](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo)

## Get started

### Install

Install with [npm](https://www.npmjs.com): `npm install @folkehelseinstituttet/angular-components`

### Add to app

After installing the package and all dependencies add the following code to you're app:

```ts
// In a module
import { FhiAngularComponentsModule } from '@folkehelseinstituttet/angular-components';

...
  imports: [FhiAngularComponentsModule]
...
```

```html
<!-- In a component (.html) -->

<!-- FhiAutosuggest is just one of the available components, and if 
     only one is needed it is possible to only import that one instead
     of FhiAngularComponents -->
<fhi-autosuggest
  description="Velg/søk etter bilmerke"
  [items]="cars"
  label="Biler"
  labelForId="biler-1"
  notFoundText="Ingen treff"
  placeholder="Søk"
  [(selectedItem)]="selectedCar">
</fhi-autosuggest>
```

```scss
// In global css-file (usually style.scss)
@import "./node_modules/@folkehelseinstituttet/angular-components/styles/import/all";
```
