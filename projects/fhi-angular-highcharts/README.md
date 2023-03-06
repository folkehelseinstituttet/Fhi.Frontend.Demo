# FHI AngularHighcharts

An opinionated wrapper to the official minimal [Highcharts wrapper for Angular](https://github.com/highcharts/highcharts-angular)

## Dependencies

| FHI AngularHighcharts | FHI Style | Bootstrap | Highcharts | HighchartsAngular | Angular | Node/NPM |
| --------------------- | --------- | --------- | ---------- | ----------------- | ------- | -------- |
| 0.1.0                 | 4         | 5         | 10.3.0     | 3                 | 14      | 16/8 *   |

For more dependencies see `peerDependencies` in [package.json](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/blob/dev/projects/fhi-angular-highcharts/package.json)
_* [designsystem.fhi.no](https://designsystem.fhi.no) uses these Node/NPM versions, older versions may work, but then you're on your own_ :wink:

## Changelog

You find the [changelog here](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/blob/dev/projects/fhi-angular-highcharts/CHANGELOG.md).

## Install

Install with [npm](https://www.npmjs.com): `npm install @folkehelseinstituttet/angular-highcharts`

## Contribute

Read about how to contribute [here](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/blob/dev/CONTRIBUTING.md)

## Demo and documentation

Live example in our demo app: [https://designsystem.fhi.no](https://designsystem.fhi.no/developer/modules/Highcharts)

Repo for demo app: [Fhi.Frontend.Demo](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo)

### Get started

After installing package and all dependencies add the following to you're code:

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
