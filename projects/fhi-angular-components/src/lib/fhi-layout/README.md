# FHI Page templates

## Concept

There is one component for page layouts, having inputs for layoutType and backgroundColor (on/off)

### Header, footer and main content area

The header and footer are global elements in app.component, and the page templates are defined as the main content area in the router-outlet.

## API

| Input           | Type    | Default | Required | Description |
| --------------- | ------- | ------- | -------- | ----------- |
| layoutType      | string  | -       | yes      | The different types of page layouts. |

### Usage of page layout types:

```
<fhi-layout layoutType="layoutType">
</fhi-layout>
```

#### a
```
<ng-container layout.header>
    Page title
</ng-container>

<ng-container layout.main>
    Main content area that utilizes the full width on all screen sizes
</ng-container>
```

---

#### b

```
<ng-container layout.header>
    Page title
</ng-container>

<ng-container layout.main>
    Main content area that leaves some space to the right on large screens
</ng-container>
```

---

#### c
```
<ng-container layout.header>
    Page title
</ng-container>

<ng-container layout.main>
    Main content
</ng-container>

<ng-container layout.aside2>
    Right column on larger screens
</ng-container>
```

---
