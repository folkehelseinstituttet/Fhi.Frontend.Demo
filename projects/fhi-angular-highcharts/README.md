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
    - [Interface FhiDiagramOptions](#interface-fhidiagramoptions)
      - [Using two units](#using-two-units)
      - [Using more than two units](#using-more-than-two-units)
    - [Interface FhiDiagramCategoryAxis](#interface-fhidiagramcategoryaxis)
    - [Interface FhiDiagramControls](#interface-fhidiagramcontrols)
    - [Interface FhiDiagramFooter](#interface-fhidiagramfooter)
    - [Interface FhiDiagramSerie](#interface-fhidiagramserie)
    - [Interface FhiDiagramSerieData](#interface-fhidiagramseriedata)
    - [Interface FhiDiagramFlag](#interface-fhidiagramflag)
    - [Interface FhiDiagramUnit](#interface-fhidiagramunit)
  - [Changelog](#changelog)
  - [Contribute](#contribute)
  - [Demo](#demo)

## Dependencies

| FHI Angular Highcharts | FHI Angular Componets | Highcharts | Highcharts Angular |
| ---------------------- | --------------------- | ---------- | ------------------ |
| 6                      | 6                     | 11.4       | 4.0                |
| 5                      | 5                     | 11.4       | 4.0                |
| >4.1                   | 4                     | 11.4       | 4.0                |
| >=3.1 <=4.1            | 4                     | 11.4       | 4.0                |
| 3                      | 4.0                   | 11.1       | 4.0                |
| 2                      | 3.1                   | 11.1       | 4.0                |
| 1                      | -                     | 11.1       | 4.0                |
| 0.7                    | -                     | 11.1       | 3.1.2              |
| 0.6                    | -                     | 10.3.3     | 3.1                |
| 0.5                    | -                     | 10.3.3     | 3.1                |
| 0.4                    | -                     | 10.3.3     | 3.1                |
| 0.3                    | -                     | 10.3.3     | 3.1                |
| 0.2                    | -                     | 10.3.3     | 3.1                |
| 0.1                    | -                     | 10.3       | 3                  |

For more dependencies see `peerDependencies` in [fhi-angular-components/package.json](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/blob/dev/projects/fhi-angular-components/package.json)

## Get started

### Install

Install with [npm](https://www.npmjs.com): `npm install @folkehelseinstituttet/angular-highcharts`

### Add to app

After installing the package and all dependencies, add the following code to your app:

```scss
// In global css-file (usually style.scss)
@import "@folkehelseinstituttet/angular-highcharts/styles/import/all";
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

This is where `allowedCommonJsDependencies` is located in `angular.json`

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

| Input              | Type                | Default | Required | Description |
| ------------------ | ------------------- | ------- | -------- | ----------- |
| `[diagramOptions]` | `FhiDiagramOptions` | -       | yes      | All properties used to configure the diagram. See [FhiDiagramOptions](#interface-fhidiagramoptions) for details. **NB!** The object sent in to `@Input diagramOptions` needs to be reassigned for change detection to kick in. |

### Outputs

| Output                     | Event type          | Description |
| -------------------------- | ------------------- | ----------- |
| `(diagramTypeNavigation)`  | `FhiDiagramTypeIds` | If diagram type navigation i visible, this event will fire on every navigation. Outputs an existing diagram type id. |
| `(metadataButtonClick)`    | `void`              | When link to "Om dataene" is clicked. |

### Interface FhiDiagramOptions

| Property            | Type                 | Default   | Required | Description |
| ------------------- | -------------------- | --------- | -------- | ----------- |
| `activeDiagramType` | `string`             | -         | no       | ID to specify default diagram type. Values defined by enum `FhiDiagramTypeIds` |
| `categoryAxis`      | `FhiDiagramCategoryAxis` | -         | no       | Properties related to the categoryAxis (x-axis). See [FhiDiagramCategoryAxis](#interface-fhidiagramcategoryaxis) for details. |
| `controls`          | `FhiDiagramControls` | -         | no       | Properties related to controls like navigation. See [FhiDiagramControls](#interface-fhidiagramcontrols) for details. |
| `footer`            | `FhiDiagramFooter`   | -         | no       | Properties related to the footer below the diagram. See [FhiDiagramFooter](#interface-fhidiagramfooter) for details. |
| `[openSource]`      | `boolean`            | `true`    | no       | If `false`; the link to Highcharts.com disappears, **AND LICENSE IS REQUIRED!** |
| `[series]`          | `FhiDiagramSerie[]`  | -         | yes      | The data used to render a diagram. See [FhiDiagramSerie](#interface-fhidiagramserie) for details. |
| `tableOrientation`  | `string`             | -         | no       | Transpose table by setting preferd orientation. Values defined by enum `FhiTableOrientations` |
| `title`             | `string`             | -         | yes      | The title above the diagram. |
| `units`             | `FhiDiagramUnit[]`   | -         | no       | Decimal count, and metadata for y-axis and tooltip. See [FhiDiagramUnit](#interface-fhidiagramunit) for details. Currently only diagram type `table` and `columnAndLine` supports two units, and only `table` supports more than two units. All other diagram types supports max 1 unit. See below this table for more info about using two or more units. |

#### Using two units

Only diagram type `table` and `columnAndLine` supports two units, and to make it work:

1. Both units must have an id (see [FhiDiagramUnit](#interface-fhidiagramunit) for more info about unit id).
2. At least two series must have `unitId` (with two unique values), and those ids must be present in the units array.

If not both criteria is met, both units will be ignored.

Also nice to know:

- the first "unit" in "units" will always represent the left y-axis in the `columnAndLine`-chart
- and series associated with the first "unit" in "units" will always become columns in the `columnAndLine`-chart

#### Using more than two units

Only diagram type `table` supports two units, and to make it work:

1. All units must have an id (see [FhiDiagramUnit](#interface-fhidiagramunit) for more info about unit id).
2. If `n` units, at least `n` series must have `unitId` (with `n` unique values), and those ids must be present in the units array.

If not all criteria is met, all units will be ignored.

### Interface FhiDiagramCategoryAxis

| Property | Type     | Default | Required | Description |
| -------- | -------- | ------- | -------- | ----------- |
| `title`  | `string` | -       | no       | Custom title for the categoryAxis (x-axis). Has no effect on diagram types without a categoryAxis. |

### Interface FhiDiagramControls

| Property                      | Type       | Default | Required | Description |
| ----------------------------- | ---------- | ------- | -------- | ----------- |
| `fullScreenButton`            | `object`   | -       | no       | Properties related to fullScreenButton. |
| `fullScreenButton.show`       | `boolean`  | `false` | yes      | Whether to show a button which opens the diagram in full screen. |
| `metadataButton`              | `object`   | -       | no       | Properties related to metadata button. |
| `metadataButton.show`         | `boolean`  | `false` | yes      | Whether to show a button with an event for custom navigation to your metadata. |
| `navigation`                  | `object`   | -       | no       | Properties related to diagram type navigaton. PS. `navigation.items` will always contain table, therefore no `navigation.items.table` as part of the items interface. |
| `navigation.items.chartTypes` | `string[]` | -       | no       | Chart types to show in diagram type navigaton defined by enum ChartTypeIds. |
| `navigation.items.mapTypes`   | `string[]` | -       | no       | Map types to show in diagram type navigaton defined by enum MapTypeIds. |
| `navigation.show`             | `boolean`  | `false` | yes      | Whether to show diagram type navigaton. |
| `navigation.type`             | `string`   | -       | no       | ID to specify which type of navigation to use defined by enum DiagramTypeNavIds. |
| `tableOrientationButton`      | `object`   | -       | no       | Properties related to tableOrientationButton. |
| `tableOrientationButton.show` | `boolean`  | `false` | yes      | Whether to show a button which toggles rows/columns in the diagram type table. **Not implemented yet, so has no effect atm.** |

### Interface FhiDiagramFooter

| Property       | Type               | Default | Required | Description |
| -------------- | ------------------ | ------- | -------- | ----------- |
| `credits`      | `object`           | -       | no       | Properties related to source ref. |
| `credits.href` | `string`           | -       | yes      | Link to source ref. |
| `credits.text` | `string`           | -       | yes      | Text to source ref. |
| `disclaimer`   | `string`           | -       | no       | Text at the bottom of the footer used to say something about uncertainty in the data shown in a diagram. |
| `[flags]`      | `FhiDiagramFlag[]` | -       | no       | List of all flags used in `FhiDiagramSerie[]`. See [FhiDiagramFlag](#interface-fhidiagramflag) for details. |
| `lastUpdated`  | `string`           | -       | no       | Text after label _Sist oppdatert_ in footer. Free format, but `dd.mm.yyyy` is the most common one. |

### Interface FhiDiagramSerie

| Property | Type                    | Default | Required | Description |
| -------- | ------------------------| ------- | -------- | ----------- |
| `data`   | `FhiDiagramSerieData[]` | -       | yes      | The individual data points in a serie. See [FhiDiagramSerieData](#interface-fhidiagramseriedata) for details. |
| `name`   | `string \| string[]`    | -       | yes      | The name of the serie as shown in the legend. **NB!** The type `string` is an formatted string; pipe (`\|`) is beeing used as seperator between category names if more than one category name is concatenated to one single serie name. To avoid dependency on a given separator, use an array of category names instead. NB! `series` can not contain duplicate `serie.name` |
| `stack`  | `string`                | -       | yes      | This option allows for grouping series in a stacked chart. Only applies to diagramTypeId `barStacked` and `columnStacked`. |
| `unitId` | `number \| string`      | -       | no       | Used to associate the serie with a unit. This only works if `unit.id` ([FhiDiagramUnit](#interface-fhidiagramunit)) is set, and value is equal to `serie.unitId`. |

### Interface FhiDiagramSerieData

FhiDiagramSerieData is a custum type for FHI Angular Highcharts, but it is based on the smallest possible subset of the `chart.series.[chart type].data` object [as described under nr 3. here](https://api.highcharts.com/highcharts/series.line.data) (line chart used as example).

| Property | Type               | Default | Required | Description |
| -------- | ------------------ | ------- | -------- | ----------- |
| `name`   | `string`           | -       | yes      | The name of the data point as shown in the tooltip. |
| `y`      | `number \| string` | -       | yes      | The value of the data point. If type is `string` the data point is treated as a flagged value. |

### Interface FhiDiagramFlag

| Property | Type     | Default | Required | Description |
| -------- | -------- | ------- | -------- | ----------- |
| `label`  | `string` | -       | yes      | Description of the flag, ie. _Anonymized_ |
| `symbol` | `string` | -       | yes      | Symbol representing the flag, ie. `:`. |

### Interface FhiDiagramUnit

| Property   | Type               | Default | Required | Description |
| ---------- | ------------------ | ------- | -------- | ----------- |
| `id`       | `number \| string` | -       | no       | Used to associate the unit with a serie. This only works if a `serie.unitId` ([FhiDiagramSerie](#interface-fhidiagramserie)) is set, and value is equal to `unit.id`. |
| `decimals` | `number`           | -       | no       | The decimal count. If `undefined`: the decimal count is same as in the source data (**limited** to 9 decimals because Highcharts tooltips fails if 10 decimals or more). If `0`: no decimals. If `[1..9]`: max decimal count, but limited to the decimal count in the source data. If `10` or more, a warning will be given in the console, and `9` decimals will be used. |
| `label`    | `string`           | -       | yes      | The vertical y-axis label, showing next to the axis line. |
| `symbol`   | `string`           | -       | no       | Symbol before or after the value in both tooltip and y-axis. |
| `position` | `string`           | -       | no       | Wether the symbol i placed before or after the numbers in the diagram. Possible values: `'start' \| 'end'` |
| `yAxisMax` | `number`           | -       | no       | The maximum value of the y-axis. If not set, the max value is automatically calculated. NB! Highcharts may override the value in some edge cases. |
| `yAxisMin` | `number`           | -       | no       | The minimum value of the y-axis. If not set, the min value is automatically calculated. NB! Highcharts may override the value in some edge cases. |

## Changelog

You find the [changelog here](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/blob/dev/projects/fhi-angular-highcharts/CHANGELOG.md).

## Contribute

Read about how to contribute [here](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/blob/dev/CONTRIBUTING.md)

## Demo

- Live example in our demo app: [https://designsystem.fhi.no](https://designsystem.fhi.no/developer/modules/Highcharts)
- Repo for demo app: [https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo)
