# FHI Angular Highcharts

_An opinionated wrapper to the official minimal [Highcharts wrapper for Angular](https://github.com/highcharts/highcharts-angular)_

- [FHI Angular Highcharts](#fhi-angular-highcharts)
  - [Dependencies](#dependencies)
  - [Get started](#get-started)
    - [Install](#install)
    - [Add to app](#add-to-app)
    - [Remove warnings](#remove-warnings)
  - [API](#api)
    - [Inputs](#inputs)
    - [Outputs](#outputs)
    - [Type FhiDiagramOptions](#type-fhidiagramoptions)
    - [Type FhiDiagramSerie](#type-fhidiagramserie)
    - [Type FhiDiagramSerieData](#type-fhidiagramseriedata)
    - [Type FhiDiagramFlag](#type-fhidiagramflag)
  - [Changelog](#changelog)
  - [Contribute](#contribute)
  - [Demo](#demo)

## Dependencies

| FHI Angular Highcharts | FHI Angular Componets | FHI Style | Bootstrap | NgBootstrap | Highcharts | Highcharts Angular | Angular | Node/NPM |
| ---------------------- | --------------------- | --------- | --------- | ----------- | ---------- | ------------------ | ------- | -------- |
| Unreleased             | Unreleased            | 5.9       | 5.3.2     | 16          | 11.1.0     | 4.0.0              | 17      | 18/9 *   |
| 2.0.x                  | -                     | 5.9       | 5.3.2     | 16          | 11.1.0     | 4.0.0              | 17      | 18/9 *   |
| 1.x.x                  | -                     | 5         | 5         | 15          | 11.1.0     | 4.0.0              | 16      | 18/9 *   |
| 0.7.0                  | -                     | 5         | 5         | 14          | 11.1.0     | 3.1.2              | 15      | 18/9 *   |
| 0.6.x                  | -                     | 5         | 5         | 14          | 10.3.3     | 3.1.0              | 15      | 18/9 *   |
| 0.5.x                  | -                     | 5         | 5         | 14          | 10.3.3     | 3.1.0              | 15      | 18/9 *   |
| 0.4.x                  | -                     | 5         | 5         |             | 10.3.3     | 3.1.0              | 15      | 18/9 *   |
| 0.3.x                  | -                     | 5         | 5         |             | 10.3.3     | 3.1.0              | 15      | 18/9 *   |
| 0.2.0                  | -                     | 4         | 5         |             | 10.3.3     | 3.1.0              | 15      | 18/9 *   |
| 0.1.0                  | -                     | 4         | 5         |             | 10.3.0     | 3                  | 14      | 16/8 *   |

For more dependencies see `peerDependencies` in [package.json](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/blob/dev/projects/fhi-angular-highcharts/package.json)
_* [designsystem.fhi.no](https://designsystem.fhi.no) uses these Node/NPM versions, older versions may work, but then you're on your own_ :wink:

## Get started

### Install

Install with [npm](https://www.npmjs.com): `npm install @folkehelseinstituttet/angular-highcharts`

### Add to app

After installing the package and all dependencies, add the following code to your app:

```scss
// In global css-file (usually style.scss)
@import "./node_modules/@folkehelseinstituttet/angular-highcharts/styles/import/all";
```

```ts
// In a standalone component or a shared module
import { FhiAngularHighchartsModule } from '@folkehelseinstituttet/angular-highcharts';
...
  imports: [FhiAngularHighchartsModule]
...
```

```ts
// In a component (.ts)
import { FhiDiagramOptions, FhiDiagramSerie, FhiDiagramTypeIds } from '@folkehelseinstituttet/angular-highcharts';
...
  data: FhiDiagramSerie[] = [...];
  diagramOptions: FhiDiagramOptions = {
    title: 'Diagram title',
    data: data,
    diagramTypeId: 'line'
  };
...
```

```html
<!-- In a template -->
<fhi-angular-highcharts [diagramOptions]="diagramOptions"></fhi-angular-highcharts>
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

## API

### Inputs

| Input | Type | Default | Required | Description |
| ----- | ---- | ------- | -------- | ----------- |
| `[diagramOptions]` | `FhiDiagramOptions` | - | yes | All properties used to configure the diagram. See [FhiDiagramOptions](#type-fhidiagramoptions) for details. |

### Outputs

| Output                     | Event type          | Description |
| -------------------------- | ------------------- | ----------- |
| `(diagramTypeNavigation)`  | `FhiDiagramTypeIds` | If diagram type navigation i visible, this event will fire on every navigation. Outputs an existing diagram type id. |
| `(metadataButtonClick)`    | `void`              | When link to "Om dataene" is clicked. |

### Type FhiDiagramOptions

| Property              | Type                     | Default   | Required | Description |
| --------------------- | ------------------------ | --------- | -------- | ----------- |
| `creditsHref`         | `string`                 | -         | no       | Link to source ref. in footer. |
| `creditsText`         | `string`                 | -         | no       | Text to source ref. in footer. |
| `diagramTypeId`       | `string`                 | `table`   | no       | ID to specify default diagram type. Values defined by enum `FhiDiagramTypeIds` |
| `diagramTypeNavId`    | `string`                 | -         | no       | ID to specify which type of navigation to use. If omitted, no navigation will be rendered. Values defined by enum `DiagramTypeNavIds` |
| `[diagramTypeSubset]` | `Array<string>`          | -         | no       | ID's for diagram types available in navigation, in addition to `table`. If omitted, all diagram types that are possible for the given series will show in the navigation. Values for each array item defined by enum `FhiDiagramTypeIds` |
| `disclaimer`          | `string`                 | -         | no       | Text at the bootom of the footer used to say something about uncertainty in the data shown in a diagram. |
| `[flags]`             | `Array<FhiDiagramFlag>`  | -         | no       | List of all flags used in `FhiDiagramSerie[]`. |
| `metadataButton`      | `boolean`                | `false`   | no       | Possible to activate a button to trigger or navigate to metadata information in a way you desire. |
| `lastUpdated`         | `string`                 | -         | no       | Text after label _Sist oppdatert_ in footer. Free format, but `dd.mm.yyyy` is the most common one. |
| `mapTypeId`           | `MapTypeIds`             | -         | no       | ID to specify map type. If omitted, map will not be available in the diagram navigation. |
| `[openSource]`        | `boolean`                | `true`    | no       | If `false`; the link to Highcharts.com disappears, **AND LICENSE IS REQUIRED!** |
| `[series]`            | `Array<FhiDiagramSerie>` | -         | yes      | The data used to render a diagram. See [FhiDiagramSerie](#type-fhidiagramserie) for details. |
| `tableOrientation`    | `string`                 | -         | no       | Transpose table by setting preferd orientation. Values defined by enum `FhiTableOrientations` |
| `title`               | `string`                 | -         | yes      | The title above the diagram. |

### Type FhiDiagramSerie

| Property | Type                         | Default | Required | Description |
| -------- | ---------------------------- | ------- | -------- | ----------- |
| `data`   | `Array<FhiDiagramSerieData>` | -       | yes      | The individual data points in a serie. See [Data](#type-data) for details. |
| `name`   | `string \| Array<string>`    | -       | yes      | The name of the serie as shown in the legend. **NB!** The type `string` is an formatted string; pipe (`\|`) is beeing used as seperator between category names if more than one category name is concatenated to one single serie name. To avoid dependency on a given separator, use an array of category names instead. |
| `stack`  | `string`                     | -       | yes      | This option allows for grouping series in a stacked chart. Only applies to diagramTypeId `barStacked` and `columnStacked`. |

### Type FhiDiagramSerieData

FhiDiagramSerieData is a custum type for FHI Angular Highcharts, but it is based on the smallest possible subset of the `chart.series.[chart type].data` object [as described under nr 3. here](https://api.highcharts.com/highcharts/series.line.data) (line chart used as example).

| Property | Type                 | Default | Required | Description |
| -------- | -------------------- | ------- | -------- | ----------- |
| `name`   | `string`             | -       | yes      | The name of the data point as shown in the tooltip.
| `y`      | `number \| string`   | -       | yes      | The value of the data point. If type is `string` the data point is treated as a flagged value. |

### Type FhiDiagramFlag

| Property | Type     | Default | Required | Description |
| -------- | -------- | ------- | -------- | ----------- |
| `label`  | `string` | -       | yes      | Description of the flag, ie. _Anonymized_ |
| `symbol` | `string` | -       | yes      | Symbol representing the flag, ie. `:`.

## Changelog

You find the [changelog here](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/blob/dev/projects/fhi-angular-highcharts/CHANGELOG.md).

## Contribute

Read about how to contribute [here](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/blob/dev/CONTRIBUTING.md)

## Demo

- Live example in our demo app: [https://designsystem.fhi.no](https://designsystem.fhi.no/developer/modules/Highcharts)
- Repo for demo app: [https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo)
