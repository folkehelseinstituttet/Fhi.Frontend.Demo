# FHI Time

A set of components for time related user interactions.

## How to add i18n to your Angular app

In app.module.ts or another "core module" for your app, import and register:

```ts
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeNb from '@angular/common/locales/nb';
import localeNbExtra from '@angular/common/locales/extra/nb';
registerLocaleData(localeNb, 'nb', localeNbExtra);
```

and add a provider:

```ts
@NgModule({
  providers: [
    { provide: LOCALE_ID, useValue: 'nb' }
  ]
})
```
