# Implementeringsguide

Denne guiden viser hvordan async kart-drilldown kan legges inn i Angular Highcharts-prosjektet.

Løsningen bygger på:

- `async drilldown`
- filtrert child map geometry
- `drilldown.breadcrumbs` for drill-up navigation

### Før du starter

POC-en ble testet med Rogaland:

```text
Rogaland → Rogaland kommuner
```

I en full løsning må samme prinsipp kunne brukes for alle fylker som har child data.

Løsningen bør derfor støtte:

- flere parent points
- mapping mellom fylker og kommuner
- child data per fylke
- fallback dersom child data eller child geometry mangler

---

### 1. Registrer drilldown-modulen

**Plassering:** `fhi-angular-highcharts.component.ts`

```ts
import DrilldownModule from 'highcharts/modules/drilldown';
```

```ts
HighchartsAccessibility(Highmaps);
HighchartsExporting(Highmaps);
HighchartsOfflineExporting(Highmaps);
DrilldownModule(Highmaps);
```

`DrilldownModule(Highmaps)` må registreres for at kartet skal støtte `point.drilldown`, `chart.events.drilldown` og drill-up navigation. [Highcharts: Drilldown concept](https://www.highcharts.com/docs/chart-concepts/drilldown).

---

### 2. Koble async drilldown inn i map options

**Plassering:** `options.service.ts`

Async drilldown kobles inn når map options bygges.

```ts
this.setActiveMapType(options);

return this.addAsyncMapDrilldownTest(options, this.asyncMapDrilldownTestConfig);
```

Dette legges etter at parent map type og `colorAxis` er satt.

---

### 3. Finn parent point

**Plassering:** `options.service.ts`

Parent point må finnes før `drilldown` kan legges til.

I POC-en ble Rogaland funnet med `parentMapKey` eller `parentName`.

```ts
private isParentMapPoint(
  dataPoint: MapSeriesDataPoint,
  drilldownConfig: MapDrilldownTestConfig,
): boolean {
  const mapPointIdentity = this.getMapPointIdentity(dataPoint);

  return (
    mapPointIdentity.mapKey === drilldownConfig.parentMapKey ||
    mapPointIdentity.name === drilldownConfig.parentName
  );
}
```

I testen var `parentMapKey`:

```ts
parentMapKey: 'no-ro';
```

I en full løsning bør alle fylker med child data kunne få drilldown, ikke bare Rogaland.

---

### 4. Legg `drilldown` på parent point

**Plassering:** `options.service.ts`

Parent point må få en `drilldown` verdi.

```ts
private addAsyncDrilldownToParentPoint(
  mapSerieData: MapSeriesDataPoint[],
  drilldownConfig: MapDrilldownTestConfig,
): MapSeriesDataPoint[] {
  return mapSerieData.map((dataPoint) => {
    if (!this.isParentMapPoint(dataPoint, drilldownConfig)) {
      return dataPoint;
    }

    return this.createParentPointWithAsyncDrilldown(dataPoint, drilldownConfig);
  });
}
```

Dersom map data er array-basert, må punktet gjøres om til object-format.

```ts
return {
  'hc-key': mapKeyText,
  value,
  drilldown: drilldownConfig.drilldownSeriesId,
  events: this.createParentPointDebugEvents(),
} as SeriesMapDataOptions;
```

Dette trengs fordi array-format ikke kan ha ekstra properties som `drilldown` og `events`.

---

### 5. Legg til `chart.events.drilldown`

**Plassering:** `options.service.ts`

Async drilldown skjer i `chart.events.drilldown`.

```ts
drilldown: (event) => {
  console.log('Highcharts async map drilldown event fired', event);

  if (event.seriesOptions) {
    return;
  }

  const childSeries = this.createChildMapDrilldownSeries(drilldownConfig);

  event.target.addSeriesAsDrilldown(event.point, childSeries as SeriesOptionsType);
},
```

`event.seriesOptions` er `undefined` når child series ikke ligger i `options.drilldown.series`.

Da bygges child series i eventen og legges til med `addSeriesAsDrilldown()`. [Highcharts API: chart.events.drilldown](https://api.highcharts.com/highcharts/chart.events.drilldown), [Highcharts API: addSeriesAsDrilldown](https://api.highcharts.com/class-reference/Highcharts.Chart#addSeriesAsDrilldown).

---

### 6. Bygg child series

**Plassering:** `options.service.ts`

Child series bygges når brukeren klikker på parent point.

```ts
private createChildMapDrilldownSeries(
  drilldownConfig: MapDrilldownTestConfig,
): SeriesMapOptions {
  const childMapSeries = this.topoJsonService.getHighmapsSerieForMapType(
    drilldownConfig.childSeriesName,
    drilldownConfig.childSeriesData,
    drilldownConfig.childMapTypeId,
  );

  return {
    ...childMapSeries,
    id: drilldownConfig.drilldownSeriesId,
    name: drilldownConfig.childSeriesName,
    type: 'map',
    mapData: this.topoJsonService.getMapDataForMapTypeAndParentMapKey(
      drilldownConfig.childMapTypeId,
      drilldownConfig.parentMapKey,
    ),
    joinBy: 'hc-key',
    allAreas: true,
  };
}
```

`id` kobler child series til parent point.

`mapData` henter child map geometry.

`joinBy: 'hc-key'` kobler kommune-data til kommune-geometri. [Highcharts Maps API: joinBy](https://api.highcharts.com/highmaps/series.map.joinBy).

---

### 7. Filtrer child map geometry

**Plassering:** `topo-json.service.ts`

Child map geometry bør filtreres til valgt fylke.

```ts
getMapDataForMapTypeAndParentMapKey(
  mapTypeId: string,
  parentMapKey: string,
): object {
  const mapData = this.getStoredOrStaticMap(mapTypeId);

  const childGeometries = this.getGeometriesForParentMapKey(
    mapData.objects.default.geometries,
    parentMapKey,
  );

  if (childGeometries.length === 0) {
    console.warn(
      `No child map geometries found for parentMapKey "${parentMapKey}". Using full mapData as fallback.`,
    );

    return mapData as object;
  }

  return {
    ...mapData,
    objects: {
      ...mapData.objects,
      default: {
        ...mapData.objects.default,
        geometries: childGeometries,
      },
    },
  } as object;
}
```

Filtreringen bruker parent key som prefix.

```ts
private getGeometriesForParentMapKey(
  geometries: TopoJsonMapGeometry[],
  parentMapKey: string,
): TopoJsonMapGeometry[] {
  const childMapKeyPrefix = `${parentMapKey}-`;

  return geometries.filter((geometry) =>
    this.geometryBelongsToParentMapKey(geometry, childMapKeyPrefix),
  );
}
```

For Rogaland blir prefixen:

```text
no-ro-
```

Da blir kommuner som `no-ro-1101` og `no-ro-1103` med i child mapData.

Denne løsningen forutsetter at kommune `hc-key` følger samme struktur som i testen. Dersom key-strukturen endres, bør det brukes en tydelig mapping mellom fylke og kommuner. [Highcharts Maps: Getting started](https://www.highcharts.com/docs/maps/getting-started).

---

### 8. Legg child series til chartet

**Plassering:** `options.service.ts`

Når child series er bygget, legges den til med `addSeriesAsDrilldown()`.

```ts
event.target.addSeriesAsDrilldown(event.point, childSeries as SeriesOptionsType);
```

`event.point` er fylket brukeren klikket på.

`childSeries` er kommune-kartet som skal vises. [Highcharts API: addSeriesAsDrilldown](https://api.highcharts.com/class-reference/Highcharts.Chart#addSeriesAsDrilldown).

---

### 9. Gjenopprett parent map etter drill-up

**Plassering:** `options.service.ts`

Parent map state lagres før drilldown.

```ts
const parentMapTypeId = this.diagramOptions.activeDiagramType;
const parentColorAxis = cloneDeep(options.colorAxis);
const parentDrilldownOptions = cloneDeep(options.drilldown);
const parentMapSerieForDrillUp = cloneDeep(parentMapSerie);
```

Restore gjøres i `drillupall`.

```ts
drillupall: (event) => {
  console.log('Highcharts async map drillupall event fired');

  window.setTimeout(() => {
    event.target.update(
      {
        chart: {
          map: parentMapTypeId,
        },
        colorAxis: parentColorAxis,
        drilldown: parentDrilldownOptions,
        series: [cloneDeep(parentMapSerieForDrillUp) as SeriesOptionsType],
      },
      true,
      true,
    );
  });
},
```

Dette sørger for at fylkeskartet kommer tilbake med riktig map type, series og fargevisning.

`window.setTimeout()` brukes slik at restore skjer etter Highcharts sin egen drill-up-prosess.

---

### 10. Legg til breadcrumbs

**Plassering:** `options.service.ts` eller der siste `Highcharts.Options` bygges

Breadcrumbs brukes for drill-up navigation.

Breadcrumbs må ligge i final `Highcharts.Options`.

```ts
options.drilldown = {
  ...options.drilldown,
  breadcrumbs: {
    position: {
      align: 'left',
    },
  },
};
```

Breadcrumbs lar brukeren gå tilbake fra child level til parent level.

`drillUpButton` bør ikke brukes som hovedløsning, siden Highcharts markerer den som deprecated.

Kilder

- [Highcharts: Breadcrumbs](https://www.highcharts.com/docs/advanced-chart-features/breadcrumbs)
- [Highcharts Maps API: drilldown.breadcrumbs](https://api.highcharts.com/highmaps/drilldown.breadcrumbs)
- [Highcharts Maps API: drillUpButton](https://api.highcharts.com/highmaps/drilldown.drillUpButton)

---

# Kilder liste

- [Highcharts: Chart concepts - Drilldown](https://www.highcharts.com/docs/chart-concepts/drilldown)
  Brukt for å forklare hvordan Highcharts håndterer drilldown og async drilldown.

- [Highcharts Maps API: drilldown.series](https://api.highcharts.com/highmaps/drilldown.series)
  Brukt for å forklare forskjellen mellom preloaded child series og async child series.

- [Highcharts API: chart.events.drilldown](https://api.highcharts.com/highcharts/chart.events.drilldown)
  Brukt for å forklare hvordan async drilldown håndteres i `chart.events.drilldown`.

- [Highcharts API: Highcharts.Chart.addSeriesAsDrilldown()](https://api.highcharts.com/class-reference/Highcharts.Chart#addSeriesAsDrilldown)
  Brukt for å forklare hvordan child series legges til ved async drilldown.

- [Highcharts Maps API: series.map.joinBy](https://api.highcharts.com/highmaps/series.map.joinBy)
  Brukt for å forklare hvordan child data kobles til child map geometry med `hc-key`.

- [Highcharts Maps: Getting started](https://www.highcharts.com/docs/maps/getting-started)
  Brukt for å forklare bruk av map geometry, TopoJSON/GeoJSON og `mapData`.

- [Highcharts: Breadcrumbs](https://www.highcharts.com/docs/advanced-chart-features/breadcrumbs)
  Brukt for å forklare breadcrumbs som drill-up navigation.

- [Highcharts Maps API: drilldown.breadcrumbs](https://api.highcharts.com/highmaps/drilldown.breadcrumbs)
  Brukt for å vise hvilke breadcrumbs-options Highcharts støtter.

- [Highcharts Maps API: drilldown.drillUpButton](https://api.highcharts.com/highmaps/drilldown.drillUpButton)
  Brukt for å dokumentere at `drillUpButton` er deprecated og at breadcrumbs bør brukes i stedet.
