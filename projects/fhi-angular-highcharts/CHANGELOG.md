# 4.6.0

> Oct 16, 2024

* :tada: **Enhancement** Add zIndex to series if diagram type is `columnAndLine`, add a better test for disabling diagram type `columnAndLine`, and add better documentation for using two units [(#727)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/727)

## 4.5.0

> Oct 14, 2024

* :tada: **Enhancement** Add a custom version of the diagram type class and expose it in the public API Surface [(#720)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/720)

## 4.4.1

> Sep 24, 2024

* :bug: **Bugfix** Fix so that table don't break if flagged data in the data set. [(#702)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/702)

## 4.4.0

> Sep 13, 2024

* :bug: **Bugfix** Make it possible to dynamically add diagram types to the diagram type navigation. [(#665)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/665)
* :tada: **Enhancement** Add support for showing a description below the title. [(#673)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/673)
* :bug: **Bugfix** Adjust allowed max widths on the Highcharts container element. [(#672)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/672)
* :tada: **Enhancement** Update documentation for Interface FhiDiagramUnit (about decimal count limited to 9 etc.). [(#670)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/670)
* :bug: **Bugfix** Reduce max decimal places to 9 (because Highcharts tooltips fails if 10 decimals or more). [(#669)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/669)
* :bug: **Bugfix** Don't remove decimals if they end with zero (only applies to diagram type table). [(#668)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/668)
* :bug: **Bugfix** Add null check for unit.decimals. [(#667)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/667)
* :tada: **Enhancement**  Add support for showing diagram type line with multiple series even if flagged. This will also affect diagram type line with single series: data points will no longer be removed, instead the line will be broken. [(#664)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/664)
  
## 4.3.0

> Sep 9, 2024

* :tada: **Enhancement** Give the diagrams better aspect ratios on differnt screen widths
* :bug: **Bugfix** Remove diagram type navigation from fullscreen view since the navigation fails if diagram type is disabled, and since it doesn't add that much value for the end user.

## 4.2.0

> Sep 3, 2024

* :tada: **Enhancement** Add console warning if a diagram type can't be rendered.
* :tada: **Enhancement** Enable line diagram with only one data point pr series.
* :tada: **Enhancement** Remove 0 as default value on y-axis in diagram type line when no unit is defined.
* :tada: **Enhancement** Add new color palette, extend the color count to 20, and add support for negative values in map gradient (red to blue)
* :tada: **Enhancement** Add support for SVG export

## 4.1.0

> Jun 27, 2024

* :tada: **Enhancement** Add support for user defined max/min y-axis value

## 4.0.0

> Jun 13, 2024

* :bug: **Bugfix** Isolate diagram type group state to each instance of `FhiAngularHighchartsComponent`
* :tada: **Enhancement** Add support for showing units in the footer
* :tada: **Enhancement** Add support for a new diagram type: "Dobbel akse, linje og søyle" (`columnAndLine`)
* :boom: **Breaking** Rename `FhiDiagramOptions.unit` to `FhiDiagramOptions.units` since it's an array
* :boom: **Breaking** Diagram type ids for maps is changed to be in sync with maps from [code.highcharts.com](https://code.highcharts.com/mapdata/)
  * `mapFylker` -> "Norway 2024" (was "Norway 2023" in v3.3.0)
  * `mapFylker2023` -> "Norway 2023" (new)
  * `mapFylker2019` -> "Norway 2019" (unchanged)

## 3.3.0

> May 31, 2024

* :tada: **Enhancement** Update README for `@folkehelseinstituttet/angular-highcharts` to reflect changes in `@folkehelseinstituttet/style`, and fix import path accordingly
* :tada: **Enhancement** Container on map and charts that provides better aspect ratios in different viewports
* :tada: **Enhancement** Update model `FhiDiagramOptions`: add more grouping of properties, rename some properties and remove some properties. The old properties still works, but will be deprecated in v5.
* :bug: **Bugfix** Remove compact date formatting on chart diagrams
* :bug: **Bugfix** Remove confusing menu item disabling if diagramtype is impossible to show. New solution: no items disabled, only a warning is given when diagramtype is impossible to show.

## 3.2.0

> May 6, 2024

* :bug: **Bugfix** Add null check for `FhiDiagramOptions.decimals` and `FhiDiagramOptions.unit.decimals`
* :tada: **Enhancement** Set `minFractionDigits` in `digitsInfo` to `0` (DecimalPipe), since padding the number with extra zeros actually changes the number.

## 3.1.0

> Apr 22, 2024

* :bug: **Bugfix** Fix bug: _"footer doesn't always show when map"_
* :tada: **Enhancement** Better support for decimals, both in table and in tooltip
* :tada: **Enhancement** Add support for one unit at the time on yAxis
* :tada: **Enhancement** Add support for unit i tooltip
* :tada: **Enhancement** Diagram navigation with split button on chart selector
* :tada: **Enhancement** Alert on disabled diagram type changed to warning type

## 3.0.0

> Mar 18, 2024

* :boom: **Breaking** Support for `@folkehelseinstituttet/style` v.6 and `@folkehelseinstituttet/angular-components` v.4
* :tada: **Enhancement** Add new property `decimals` on `FhiDiagramOptions`; user can now specify max number of decimal places in diagram type table.
* :tada: **Enhancement** Add info to user about diagram types that can't be rendered based on the current data

## 2.1.1

> Mar 04, 2024

* :bug: **Bugfix** Fix peerDependency `@folkehelseinstituttet/angular-components`

## 2.1.0

> Mar 01, 2024

* :bug: **Bugfix** Fix chart background color in dark mode
* :tada: **Enhancement** Add link to metadata
* :tada: **Enhancement** Change modal implementation from local component to a component in @folkehelseinstituttet/angular-components
* :tada: **Enhancement** Removed table specific CSS classes, being replaced by general rules in @folkehelseinstituttet/style

## 1.1.2

> Feb 09, 2024

* :bug: **Bugfix** Further improvements to the the colspan/rowspan calculation to make col/row headers correct in tables with multiple dimentions.

## 1.1.1

> Feb 08, 2024

* :bug: **Bugfix** Make the colspan/rowspan calculation for col/row headers correct in tables with multiple dimentions.

## 2.0.0

> Jan 24, 2024

* :tada: **Enhancement** Update chart colors
* :boom: **Breaking** Update to Angular 17
* :boom: **Breaking** Update to NgBootstrap 16. See their [CHANGELOG](https://github.com/ng-bootstrap/ng-bootstrap/blob/master/CHANGELOG.md)

## 1.1.0

> Jan 23, 2024

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
