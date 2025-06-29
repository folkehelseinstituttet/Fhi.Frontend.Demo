# 6.2.0

> Jun 24, 2025

* :tada: **Enhancement** Remove `!important` from `white-space: nowrap` on `tbody th`, so that consumers can overwrite this property [(#850)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/850)
* :tada: **Enhancement** Make `FhiDiagramFooter.credits.href` optional [(#831)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/831)

## 6.1.0

> Mai 8, 2025

* :tada: **Enhancement** Add support for title, description and credits in svg download [(#831)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/831)

## 6.0.1

> Apr 10, 2025

* :bug: **Bugfix** Reset a click event in a template which had been nuked by mistake [(#826)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/826)

## 6.0.0

> Mar 06, 2025

* :tada: **Enhancement** Update to new control flow syntax in templates [(#782)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/782)
* :boom: **Breaking** Update to Angular v19 [(#800)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/800)
* :bug: **Bugfix** Make SVG-download work also for maps [(#803)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/803)
* :bug: **Bugfix** Make sure navigation group id can't become undefined [(#804)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/804)
* :boom: **Breaking** Improve decimal handling. NB! Remove support for `unit.decimals = null`, since the type has always just been `number`  [(#814)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/814)

## 5.3.0

> Jan 22, 2025

* :tada: **Enhancement** Add option `categoryAxis` to `FhiDiagramOptions`, and add support for setting the category axis title [(#763)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/763)
* :tada: **Enhancement** Update qualitative color series [(#771)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/771)
* :tada: **Enhancement** Use cloneDeep() to make diagramOptions immutable [(#765)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/765)
* :tada: **Enhancement** Rewrite decimals once instead of formatting decimals in table template and tooltip [(#773)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/773)
* :tada: **Enhancement** Add test for illegal diagram type, and for multiple equal diagram types [(#776)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/776)
* :tada: **Enhancement** Update styling of diagram type line to mark all line points [(#779)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/779)
* :tada: **Enhancement** Show footer if only units are set, and also show footer if flags, but no flagged data [(#780)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/780)
* :tada: **Enhancement** Update styling of `fhi-diagram-controls` to make diagram type navigation horizontal on most mobile phones [(#781)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/781)

## 5.2.0

> Nov 27, 2024

* :tada: **Enhancement** Add test for disabling all other diagram types except `columnAndLine` (and `table`) if 2 units or more are defined in the diagram options. Also clean up existing tests for disabling diagram types [(#761)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/761)
* :bug: **Bugfix** Make tooltip show zero decimals when `unit.decimals` set to `0`. Also fix inconsisten values for max decimals [(#744)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/744)

## 5.1.0

> Oct 17, 2024

* :tada: **Enhancement** Changes from @folkehelseinstituttet/angular-highcharts/v/4.6.0 [(#729)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/729)
* :tada: **Enhancement** Changes from @folkehelseinstituttet/angular-highcharts/v/4.5.0 [(#726)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/726)
* :tada: **Enhancement** Add description also in full screen view [(#710)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/710)
* :bug: **Bugfix** Changes from @folkehelseinstituttet/angular-highcharts/v/4.4.1 [(#704)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/704)
* :bug: **Bugfix** Remove deprecated property DiagramTypeIds.map which should have been removed in [(#693)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/693)

## 4.6.0

> Oct 16, 2024

* :tada: **Enhancement** Add zIndex to series if diagram type is `columnAndLine`, add a better test for disabling diagram type `columnAndLine`, and add better documentation for using two units [(#727)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/727)

## 4.5.0

> Oct 14, 2024

* :tada: **Enhancement** Add a custom version of the diagram type class and expose it in the public API Surface [(#720)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/720)

## 4.4.1

> Sep 24, 2024

* :bug: **Bugfix** Fix so that table don't break if flagged data in the data set. [(#702)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/702)

## 5.0.2

> Sep 20, 2024

* :bug: **Bugfix** Less specific version for @angular [(#697)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/697)

## 5.0.1

> Sep 20, 2024

* :bug: **Bugfix** Bump peerDependency @folkehelseinstituttet/angular-components to v5 [(#695)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/695)

## 5.0.0

> Sep 20, 2024

* :boom: **Breaking** Update to Angular 18, and remove deprecated properties from `FhiDiagramOptions`. [(#691)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/691)
* :boom: **Breaking** Only populate the the `fhi-diagram-type-nav-default` with diagram type `table` if no diagram types defined options (`navigation.items.chartTypes` or `navigation.items.mapTypes`). [(#688)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/688)

## 4.4.0

> Sep 17, 2024

* :tada: **Enhancement** Add support for showing a description below the title. [(#673)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/673)
* :tada: **Enhancement** Update documentation for Interface FhiDiagramUnit (about decimal count limited to 9 etc.). [(#670)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/670)
* :tada: **Enhancement**  Add support for showing diagram type line with multiple series even if flagged. This will also affect diagram type line with single series: data points will no longer be removed, instead the line will be broken. [(#664)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/664)
* :bug: **Bugfix** Make it possible to dynamically add diagram types to the diagram type navigation. [(#665)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/665)
* :bug: **Bugfix** Adjust allowed max widths on the Highcharts container element. [(#672)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/672)
* :bug: **Bugfix** Reduce max decimal places to 9 (because Highcharts tooltips fails if 10 decimals or more). [(#669)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/669)
* :bug: **Bugfix** Don't remove decimals if they end with zero (only applies to diagram type table). [(#668)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/668)
* :bug: **Bugfix** Add null check for unit.decimals. [(#667)](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/pull/667)

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
