# FHI AngularHighcharts

An opinionated wrapper to the official minimal [Highcharts wrapper for Angular](https://github.com/highcharts/highcharts-angular)

## Dependencies

| FHI AngularHighcharts | FHI Style | Bootstrap | NgBootstrap | Highcharts | HighchartsAngular | Angular | Node/NPM |
| --------------------- | --------- | --------- | ----------- | ---------- | ----------------- | ------- | -------- |
| Unreleased            | 5         | 5         | 14.x.x      | 10.3.3     | 3.1.0             | 15      | 18/9 *   |
| 0.4.x                 | 5         | 5         |             | 10.3.3     | 3.1.0             | 15      | 18/9 *   |
| 0.3.x                 | 5         | 5         |             | 10.3.3     | 3.1.0             | 15      | 18/9 *   |
| 0.2.0                 | 4         | 5         |             | 10.3.3     | 3.1.0             | 15      | 18/9 *   |
| 0.1.0                 | 4         | 5         |             | 10.3.0     | 3                 | 14      | 16/8 *   |

For more dependencies see `peerDependencies` in [package.json](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/blob/dev/projects/fhi-angular-highcharts/package.json)
_* [designsystem.fhi.no](https://designsystem.fhi.no) uses these Node/NPM versions, older versions may work, but then you're on your own_ :wink:

## Changelog

You find the [changelog here](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/blob/dev/projects/fhi-angular-highcharts/CHANGELOG.md).

## Contribute

Read about how to contribute [here](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/blob/dev/CONTRIBUTING.md)

## Demo and documentation

Live example in our demo app: [https://designsystem.fhi.no](https://designsystem.fhi.no/developer/modules/Highcharts)

Repo for demo app: [Fhi.Frontend.Demo](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo)

## Get started

### Install

Install with [npm](https://www.npmjs.com): `npm install @folkehelseinstituttet/angular-highcharts`

### Add to app

After installing the package and all dependencies add the following code to you're app:

```ts
// In a module
import { FhiAngularHighchartsModule } from '@folkehelseinstituttet/angular-highcharts';
...
  imports: [FhiAngularHighchartsModule]
...
```

```ts
// In a component (.ts)
import { FhiDiagramOptions, FhiDiagramSerie, FhiDiagramTypes } from '@folkehelseinstituttet/angular-highcharts';
...
  data: FhiDiagramSerie[] = [...];
  diagramOptions: FhiDiagramOptions = {
    title: 'Diagram title',
    data: data,
    diagramType: FhiDiagramTypes.column
  };
...
```

```html
<!-- In a component (.html) -->
<fhi-angular-highcharts [diagramOptions]="diagramOptions"></fhi-angular-highcharts>
```

```scss
// In global css-file (usually style.scss)
@import "./node_modules/@folkehelseinstituttet/angular-highcharts/styles/import/all";
```

### Remove warnings

Highcharts gives some warnings due to the use of CommonJs as described here:
[https://github.com/highcharts/highcharts/issues/14183](https://github.com/highcharts/highcharts/issues/14183)

From one of the comments:

_Highcharts uses the UMD pattern which includes AMD, and it is probably detected by angular. On the other hand, I don't think that using an ES6 module pattern will change anything in the performance matters, you would have to import the entire highcharts core anyway, so technically it will be the same package - I would suggest ignoring the warning by adding Highcharts to the allowedCommonJsDependencies property in the angular.json file._

This is where `allowedCommonJsDependencies` i located in `angular.json`

```js
...
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "allowedCommonJsDependencies": ["highcharts"],
...
```
