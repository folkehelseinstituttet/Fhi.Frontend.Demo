# FHI Page templates

## Concept

There is one component for page layouts, having inputs for layoutType and backgroundColor (on/off)

### Header, footer and main content area

The header and footer are global elements in app.component, and the page templates are defined as the main content area in the router-outlet.

## API

| Input           | Type    | Default | Required | Description |
| --------------- | ------- | ------- | -------- | ----------- |
| backgroundColor | boolean | false   | no       | setting (a defined) background color on the main content area |
| layoutType      | string  | -       | yes      |  |

### Usage of page layout types:

#### `layoutType='a'`
`<ng-container layout.title>`
`<ng-container layout.main>`

Main content is stretching over the full width of the page on all screen sizes.

---

#### `layoutType='b'`
`<ng-container layout.title>`
`<ng-container layout.main>`

Main content is stretching over two thirds width, leaving the last third blank on xxl screens sizes.

---

#### `layoutType='c'`
`<ng-container layout.title>`
`<ng-container layout.beforemain>`
`<ng-container layout.main>`

Some content is placed between **title** and **main** aligned to the right
Main content is stretching over two thirds width, leaving the last third blank on xxl screens sizes.

---

#### `layoutType='d'`
`<ng-container layout.title>`
`<ng-container layout.main>`
`<ng-container layout.aside2>`

Title and main content is 

---
