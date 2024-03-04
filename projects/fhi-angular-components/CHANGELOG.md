# Unreleased

> Mar 4, 2024

* :bug* **Bugfix** Reset font family on `FhiTreeViewNavigation`

## 3.1.0

> Mar 4, 2024

* :bug: **Bugfix** Weekpicker fails with `date-fns@3.3.0`. See [date-fns CHANGELOG](https://github.com/date-fns/date-fns/blob/main/CHANGELOG.md#v331---2024-01-22)
* :tada: **Enhancement** Adjustments to accommodate for new Lato font
* :gift: **New** `FhiTreeViewRadio` and `FhiTreeViewCheckbox` replaces `FhiTreeViewSelection`
* :gift: **New** Add modal

## 3.0.0

> Jan 23, 2024

* :boom: **Breaking** Update to Angular 17
* :boom: **Breaking** Update to NgBootstrap 16. See their [CHANGELOG](https://github.com/ng-bootstrap/ng-bootstrap/blob/master/CHANGELOG.md)
* :gift: **New** Add Popover menu

## 2.0.0

> Des 6, 2023

* :boom: **Breaking** Update to Angular 16
* :gift: **New** Add Datepicker
* :gift: **New** Add Date time selector
* :gift: **New** Add Weekpicker
* :gift: **New** Add Month selector
* :gift: **New** Add Month Range selector
* :gift: **New** Add Year selector
* :gift: **New** Add Year Range selector
* :tada: **Enhancement** Change `fhi-btn-flat` -> `fhi-btn-link` to reflect changes in `@folkehelseinstituttet/style`
* :tada: **Enhancement** Update peerDependencies
* :tada: **Enhancement** Add class `form-label` in `fhi-autosuggest.template.ts`, and a new test before emitting selected item
* :tada: **Enhancement** Now possible to disable tags on `FhiMultiselect`
* :bug: **Bugfix** Update deprecated icon class in `fhi-multiselect.component.html`: `icon-xmark` -> `icon-x`

## 1.1.1

> Aug 18, 2023

* :bug: **Bugfix** Core variables change in @folkehelseinstituttet/style@5.5.0

## 1.1.0

> Jun 28, 2023

* :gift: **New** (Beta) `FhiTable`

## 1.0.1

> Jun 21, 2023

* :bug: **Bugfix** Set correct `hasCheckedDescendant`-state also when only one `FhiTreeViewSelectionItem` on any given level in a `FhiTreeViewSelectionItem[]`
* :bug: **Bugfix** Add name input to Tree view selection

## 1.0.0

> Jun 1, 2023

* :gift: **New** `FhiTreeViewSelectionComponent`
* :boom: **Breaking** removed `FhiTreeViewCheckboxComponent`

## 0.5.0

> May 15, 2023

* :tada: **Enhancement** Update API-doc for `FhiTreeViewCheckboxComponent`
* :tada: **Enhancement** Add support for "Check all" `FhiTreeViewCheckboxComponent`

## 0.4.0

> Mar 29, 2023

* :tada: **Enhancement** Support @folkehelseinstituttet/style v5
* :gift: **New** Add `FhiTreeViewCheckboxModule`
* :bug: **Bugfix** Change peerDependencies so they match the dependency matrix

## 0.3.0

> Mar 14, 2023

* :gift: **New** Add `FhiTreeViewNavigationModule`
* :tada: **Enhancement** Add support for Angular 15

## 0.2.0

> Feb 15, 2023

* :tada: **Enhancement** Support @folkehelseinstituttet/style v4

## 0.1.1

> Feb 1, 2023

* :bug: **Bugfix** Add correct icons in old version log
* :bug: **Bugfix** INFO: Current version is bumped to 0.1.1 since first version should have been 0.1.0

## 0.0.1

> Des 2, 2022

* :gift: **New** Add `FhiAutosuggestModule`
* :gift: **New** Add `FhiMultiselectModule`
* :gift: **New** Create `@folkehelseinstituttet/angular-components`

## Examples

* :gift: **New**
* :tada: **Enhancement**
* :bug: **Bugfix**
* :boom: **Breaking**
