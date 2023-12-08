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
