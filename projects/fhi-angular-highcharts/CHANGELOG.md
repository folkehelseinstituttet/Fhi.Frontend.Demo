# 2.0.0

> Jan 22, 2024

* :boom: **Breaking** Update to Angular 17
* :boom: **Breaking** Update to NgBootstrap 16. See their [CHANGELOG](https://github.com/ng-bootstrap/ng-bootstrap/blob/master/CHANGELOG.md)
* :tada: **Enhancement** Add a full screen button.
* :tada: **Enhancement** Add support for transposing the table by setting the new option `tableOrientation`.

## 1.0.0

> Des 11, 2023

* :boom: **Breaking** Add suport for TopoJson maps, and remove support for GeoJson maps since Highcharts >= v10 gives a consol warning if GeoJson map is used.
* :boom: **Breaking** Update peerDependencies.
* :tada: **Enhancement** Add copyright for map in diagram footer.
* :bug: **Bugfix** Allow dependency `date-fns` to be installed with latest version.

## 0.7.0

> Aug 31, 2023

* :tada: **Enhancement** Update dependencies: highcharts, highcharts-angular
* :tada: **Enhancement** Add support for two maps: "mapFylker2019" and "mapFylker"
* :tada: **Enhancement** Visual improvements for diagramtype pie
* :tada: **Enhancement** Make it possible to cherry pick diagram types (eg. exclude map) in the diagram type menu
* :bug: **Bugfix** Reintroduce property "stack" in interface FhiDiagramSerie since it was removed by mistake in a previous release

## 0.6.1

> Aug 10, 2023

* :bug: **Bugfix**
  * Fix problem with diagramTypeNav not updating when only number of series change and not the diagram type.
  * Change number of series to < two for pie
  * Change number of datapoint pr series to > 1 for line

## 0.6.0

> Jun 28, 2023

* :tada: **Enhancement** Add support for negiativ numbers and descimals
* :tada: **Enhancement** Change seperator in `serie.name` to `|`
* :tada: **Enhancement** Add support for type `Array<string>` in `serie.name`
* :tada: **Enhancement** Update documentation

## 0.5.0

> Jun 15, 2023

* :tada: **Enhancement** Update documentation of API
* :boom: **Breaking** Change input property `FhiDiagramOptions.data` -> `FhiDiagramOptions.series`
* :boom: **Breaking** Change input property `FhiDiagramOptions.diagramType` -> `FhiDiagramOptions.diagramTypeId`
* :boom: **Breaking** Change input property `FhiDiagramOptions.diagramTypeNav` -> `FhiDiagramOptions.diagramTypeNavId`
* :tada: **Enhancement** Add support for ngBootstrap
* :tada: **Enhancement** Add input property for flags
* :tada: **Enhancement** Add optional footer to diagram
* :tada: **Enhancement** Move diagram title above diagram nav and use it for both table and charts/maps

## 0.4.0

> Apr 26, 2023

* :tada: **Enhancement** Add support for more than one heading row in table
* :tada: **Enhancement** Add support for string values in table
* :tada: **Enhancement** Add HighchartsAccessibility module

## 0.3.0

> Mar 29, 2023

* :tada: **Enhancement** Support @folkehelseinstituttet/style v5
* :bug: **Bugfix** Change wrong @import path for css in README
* :bug: **Bugfix** Change peerDependencies so they match the dependency matrix

## 0.2.0

> Mar 14, 2023

* :tada: **Enhancement** Update README
* :tada: **Enhancement** Add support for Angular 15
* :tada: **Enhancement** Upgrade Highcharts and "Highcharts Angular" to latest

## 0.1.0

> Mar 07, 2023

* :gift: **New** Create `@folkehelseinstituttet/angular-highcharts`

## Examples

* :gift: **New**
* :tada: **Enhancement**
* :bug: **Bugfix**
* :boom: **Breaking**
