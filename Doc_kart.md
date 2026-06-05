# Undersøkelse av drilldown-kart i FHI Angular Highcharts

## Formål

Formålet med undersøkelsen er å finne ut hvordan drilldown kan implementeres i kartvisninger i FHI Angular Highcharts-prosjektet.

Undersøkelsen skal dekke to mulige tekniske løsninger:

- `preloaded drilldown`
- `async drilldown`

## Hvordan Highcharts håndterer drilldown i kart

Highcharts Maps støtter drilldown ved at et point i parent series kobles til en child series.

Koblingen skjer med:

- `point.drilldown`

- `drilldown.series[].id`

Verdien i `point.drilldown` må matche `id` på child series [Highchart Drilldown.](https://www.highcharts.com/docs/chart-concepts/drilldown)

**Eksempel:**

_Forenklet prinsipp_

```ts
{
  name: 'Rogaland',
  'hc-key': 'no-ro',
  value: 78.1,
  drilldown: 'rogaland-kommuner-drilldown'
}
drilldown: {
  series: [
    {
      id: 'rogaland-kommuner-drilldown',
      name: 'Rogaland kommuner',
      type: 'map',
      data: kommuneData,
      mapData: kommuneTopology
    }
  ]
}
```

Når brukeren klikker på parent point, sjekker Highcharts om punktet har en `drilldown` verdi.

Dersom verdien matcher en child series i `drilldown.series`, bytter Highcharts fra parent series til child series.

For flere nivåer brukes samme prinsipp videre. Et child point kan også ha en egen `drilldown` verdi som peker til en ny child series. På den måten kan Highcharts bygge flere drilldown-nivåer.

[Highcharts Drildown](https://www.highcharts.com/docs/chart-concepts/drilldown) Beskriver at en drilldown series kobles til parent point ved hjelp av `id` i `drilldown.series`.

- https://www.highcharts.com/docs/chart-concepts/drilldown
- https://www.highcharts.com/docs/maps/map-drill-down
- https://api.highcharts.com/highmaps/drilldown.series

## Preloaded drilldown

Ved preloaded drilldown legges child series inn i `options.drilldown.series` når chart options bygges.

Dette betyr at child data og child map geometry må være tilgjengelig før brukeren klikker i kartet [Highcharts Map drilldown.](https://www.highcharts.com/docs/maps/map-drill-down)

### Preloaded drilldown krever:

- parent map series

- parent point med `drilldown`

- child map series med matchende `id`

- child data

- child map geometry, for eksempel `mapData` eller topology

- `highcharts/modules/drilldown`

### Fordel:

- Enkel teknisk

- Ingen async loading ved klikk

- God løsning for å bekrefte grunnmekanismen i Highcharts Maps

### Begrensninger

- Kan gi store chart options dersom alle kommunekart lastes inn samtidig

- Mindre egnet dersom mange nivåer eller store map files skal støttes

- Krever at child data og child map geometry er tilgjengelig når options bygges

## Async drilldown

Ved async drilldown lastes child series først når brukeren klikker på et parent point.

Dette gjøres med:

- `chart.events.drilldown`

- `chart.addSeriesAsDrilldown(point, childSeriesOptions)`

Async drilldown må undersøkes videre fordi fylke-til-kommune kan kreve at kommune-data og kommune-map geometry lastes dynamisk basert på valgt fylke.

[Highcharts JS API Reference](https://api.highcharts.com/highmaps/chart.events.drilldown)

[Highcharts Map Drilldown](https://www.highcharts.com/docs/maps/map-drill-down)

## Nødvendige Highcharts-moduler

For denne POC-en var disse modulene relevante:

`highcharts/highmaps`

Brukes for kartvisning.

`highcharts/modules/drilldown`

Brukes for:

- `point.drilldown`

- `drilldown.series`

- `chart.events.drilldown`

- `drillupall`

- drill-up navigation

- breadcrumbs

**Begrunnelse:**

- `highcharts/highmaps` brukes fordi chart type er map.

- `highcharts/modules/drilldown` må registreres for at Highcharts skal tolke `point.drilldown` som en drilldown-kobling.

- Uten drilldown-modulen blir ikke parent point koblet til child series.

## Registrering av drilldown-modulen

Drilldown-modulen ble registrert i `fhi-angular-highcharts.component.ts`.

```ts
import DrilldownModule from 'highcharts/modules/drilldown';
```

```ts
HighchartsAccessibility(Highmaps);
HighchartsExporting(Highmaps);
HighchartsOfflineExporting(Highmaps);
DrilldownModule(Highmaps);
```

- `Highmaps` brukes for kartvisning.
- `DrilldownModule(Highmaps)` må registreres for at Highcharts Maps skal støtte `point.drilldown`, `drilldown.series`, `chart.events.drilldown` og drill-up.
- Modulen ble registrert på `Highmaps`, ikke bare `Highcharts`, fordi testen gjelder kart

## Dagens løsning

Dagens kartløsning er laget for visning på ett geografisk nivå.

`FhiAngularHighchartsComponent` har ansvar for å laste inn kart og oppdatere visningen.

`OptionsService` bygger opp `Highcharts.Options` for kart og diagrammer.

`TopoJsonService` henter `topojson`-filer og kobler innkommende datapunkter til riktig `hc-key` (map geometry).

Dagens løsning støtter fylkeskart, men har ikke ferdig støtte for flere geografiske nivåer i samme kartflyt.

Det finnes foreløpig ikke generell støtte for:

- child series for drilldown

- child map geometry for neste nivå

- mapping mellom parent fylke og child kommuner

- generell drilldown-navigation mellom nivåer

- fallback dersom child data mangler

Dagens kobling mellom data og kart skjer også på litt ulik måte avhengig av karttype.

**Eksempler på identifikatorer som brukes:**

- `hc-key`
- `dataPointId`
- `name`

Dette er viktig fordi drilldown krever en stabil kobling mellom:

- parent point
- child series
- child data
- child map geometry

## Foreløpig vurdering av datastruktur

POC-en viser at dagens parent map data kan brukes til å starte drilldown dersom hvert parent point har en stabil key.

I testen ble `hc-key` brukt som den.

**Eksempel:**

```ts
point['hc-key'] === 'no-ro';
```

Dette identifiserer Rogaland i parent map series.

For en full løsning fra fylke til kommune må datastrukturen også støtte child level.

**Det betyr at løsningen trenger:**

- parent fylke med stabil key, for eksempel hc-key

- child kommune data

- kommune key som matcher kommune map geometry, for eksempel `no-ro-1101`

- child map geometry for kommunenivå

- mapping mellom valgt fylke og riktig child series

Dersom innkommende data kun inneholder fylkesnivå, er ikke dagens datastruktur alene nok for en full fylke-til-kommune drilldown.

Da må løsningen enten:

- utvide datastrukturen med child data

- hente child data fra en egen kilde

- ha en mapping mellom fylke og kommunedata

- ha en mapping mellom fylke og kommune map geometry

## Endringer i TopoJsonService for kommune-data

`TopoJsonService` ble endret slik at samme service kan lage map series for flere map types.

```ts
getHighmapsSerieForMapType(
  seriesName: string,
  seriesData: FhiDiagramSerieData[],
  mapTypeId: string,
): SeriesMapOptions {
  const mapSerieData = seriesData
    .map((dataPoint) => this.createMapDataPointForMapType(dataPoint, mapTypeId))
    .filter((dataPoint): dataPoint is [string, number] => dataPoint !== null);

  return {
    data: mapSerieData,
    name: seriesName,
    type: 'map',
  };
}
```

**Begrunnelser**

- Parent level bruker `mapFylker`.

- Child level bruker `mapKommuner`.

- POC-en trenger derfor en måte å lage map series for et annet map type enn aktiv parent map.

### Mapping for kommune-data

```ts
private createKommuneMapDataPoint(
  dataPoint: FhiDiagramSerieData,
  geometries: TopoJsonMapGeometry[],
): [string, number] | null {
  const dataPointId = this.getTextValueOrNull(dataPoint.dataPointId);

  if (dataPointId === null || dataPointId.length !== 4) {
    return null;
  }

  const matchingGeometry =
    geometries.find((geometry) => geometry.properties['hc-key']?.endsWith(dataPointId)) ?? null;

  return this.createMapDataPointFromGeometry(matchingGeometry, dataPoint);
}
```

**Begrunnelse:**

- Kommune-testdata bruker `dataPointId`, for eksempel `1101`.
- Kommune-geometrien bruker hc-key, for eksempel `no-ro-1101`.
- `endsWith(dataPointId)` gjør at `1101` kan matches mot `no-ro-1101`
- `dataPointId.length !== 4` hindrer at ugyldige kommune-id-er brukes i kommune-mappingen.

## Hente child map geometry

```ts
getMapDataForMapType(mapTypeId: string): object {
  const loadedMap = this.topoJsonMaps[mapTypeId];

  if (loadedMap) {
    return loadedMap;
  }

  const staticMaps = {
    [MapTypeIdValues.mapFylker]: noFylker2024,
    [MapTypeIdValues.mapFylker2023]: noFylker2023,
    [MapTypeIdValues.mapFylker2019]: noFylker2019,
    [MapTypeIdValues.mapKommuner]: noKommuner2025,
  };

  const staticMap = staticMaps[mapTypeId];

  if (staticMap) {
    return staticMap as object;
  }

  throw new Error(`No supported map matches given mapTypeId: "${mapTypeId}".`);
}
```

**Begrunnelse:**

- Preloaded child series trenger kommune-geometri før klikk.
- `getMapDataForMapType(MapTypeIdValues.mapKommuner)` gjør at child series kan bruke kommune-kartet selv om parent chart viser fylkeskart.

## Relevante filer

Filer som var relevante for POC-en:

- `fhi-angular-highcharts.component.ts`
- `options.service.ts`
- `topo-json.service.ts`
- `highcharts.component.ts`

**Begrunnelse:**

- `fhi-angular-highcharts.component.ts` registrerer `highcharts/modules/drilldown` på `Highmaps`.

- `options.service.ts` bygger `Highcharts.Options` og legger inn POC-oppsettet for preloaded drilldown.

- `topo-json.service.ts` ble utvidet for å kunne lage map series for et annet map type enn aktiv parent map.

- `highcharts.component.ts` i demoen ble brukt til å teste POC-en med `activeDiagramType: 'mapFylker'`.

`highcharts.component.html` ble bare brukt til midlertidig debug-visning og er derfor ikke relevant for selve drilldown-implementeringen.

## Navigasjon

Highcharts støtter drill-up navigasjon når drilldown-modulen er aktiv.

Anbefalt navigasjon er:

```js
drilldown: {
  breadcrumbs: {
    showFullPath: false,
  },
}
```

`breadcrumbs` bør brukes i stedet for `drillUpButton`, siden `drillUpButton` er deprecated.

For kartløsningen anbefales enkel navigasjon i første versjon:

- bruk `breadcrumbs` som back-knapp

- vis kun aktivt nivå i kartet

- unngå søkefelt i første implementering

- vurder søkefelt senere dersom kommune-nivået blir vanskelig å navigere

[Highcharts Breadcrumbs](https://www.highcharts.com/docs/advanced-chart-features/breadcrumbs)

# Preloaded drilldown test i kart

## Formål med testen

Formålet med testen var å undersøke om Highcharts Maps kan støtte drilldown i dagens Angular Highcharts-oppsett ved bruk av `preloaded drilldown.series`.

Testen skulle bekrefte:

- at `highcharts/modules/drilldown` fungerer sammen med Highmaps
- at et fylke i parent map series kan kobles til en child map series
- at koblingen mellom `point.drilldown` og `drilldown.series[].id` fungerer
- at Highcharts sin innebygde `drilldown` event fires ved klikk
- at child map series vises visuelt etter klikk
- at parent map series kommer tilbake ved drill-up
- at farger på parent map series fortsatt vises riktig etter drill-up

Testen ble gjort som en POC i `options.service.ts`.

Denne testen dekker kun `preloaded drilldown`.

### Testoppsett

Testen ble gjort med Rogaland som parent point.

**Testverdier:**

| Del               | Verdi                         |
| ----------------- | ----------------------------- |
| Parent fylke      | Rogaland                      |
| Parent map key    | `no-ro`                       |
| Drilldown `id`    | `rogaland-kommuner-drilldown` |
| Child series name | `Rogaland kommuner`           |
| Child level       | Kommuner                      |

### Demo-oppsett brukt for testen

POC-en ble testet i demoen gjennom `getData__example_4a()`. Demoen brukte `activeDiagramType: 'mapFylker'` som parent level.

```ts
const diagramOptionsWithDrilldown: DiagramOptionsWithDrilldown = {
  series: [
    {
      name: dataset.name,
      data: selectedElectionTypeData,
    },
  ],
  activeDiagramType: 'mapFylker',
  title: `${this.titles.title_4a} - ${this.selectedYear}`,

  drilldown: {
    breadcrumbs: {
      floating: true,
      position: {
        align: 'left',
      },
    },
  },

  controls: {
    navigation: {
      items: {
        chartTypes: ['bar', 'column', 'line', 'pie'],
        mapTypes: ['mapFylker'],
      },
      show: true,
    },
  },
};
```

Breadcrumbs ble lagt inn for å teste drill-up navigation. Testen ble kjørt på eksisterende demo-data med valgt år og valgt valgtype.

### Testkonfigurasjon

Dette er en hardkodet testkonfigurasjon for Rogaland.

```ts
private readonly preloadedMapDrilldownTestConfig: MapDrilldownTestConfig = {
  parentMapKey: 'no-ro',
  parentName: 'Rogaland',
  drilldownSeriesId: 'rogaland-kommuner-drilldown',
  childMapTypeId: MapTypeIdValues.mapKommuner,
  childSeriesName: 'Rogaland kommuner',
  childSeriesData: [
    { name: 'Eigersund', dataPointId: '1101', y: 2882 },
    { name: 'Stavanger', dataPointId: '1103', y: 2143 },
    { name: 'Haugesund', dataPointId: '1106', y: 1818 },
    { name: 'Sandnes', dataPointId: '1108', y: 1527 },
  ],
};
```

- `parentMapKey: 'no-ro'` brukes for å finne Rogaland i parent map series.

- `drilldownSeriesId` er koblingen mellom parent point og child series.

- `childMapTypeId: MapTypeIdValues.mapKommuner` gjør at child series bruker kommune-kartet.

- `childSeriesData` er testdata for kommuner i Rogaland.

## Teknisk prinsipp

Highcharts kobler parent point og child series sammen med to verdier:

`point.drilldown` og `drilldown.series[].id`

Verdien i `point.drilldown` må være lik `id` på child series.

**eksempel:**

```ts
{
  name: 'Rogaland',
  'hc-key': 'no-ro',
  value: 78.1,
  drilldown: 'rogaland-kommuner-drilldown'
}
{
  id: 'rogaland-kommuner-drilldown',
  name: 'Rogaland kommuner',
  type: 'map',
  data: kommuneData,
  mapData: kommuneTopology
}
```

Når brukeren klikker på rogaland, finner Highcharts child series med sammen id som `point.drilldown`. Deretter bytter Highcharts fra parent map series til child map series.

## Hvor testen ble lagt inn

Testen ble lagt inn i `options.service.ts`, fordi denne filen bygger `Highcharts.Options` for kartsvisningen.

Det var viktig sted for POC-en fordi drilldown-oppsettet må legges inn mens chart options bygges.

## Hvor POC-en kobles inn i options-flyten

Testen ble koblet inn i `updateMapOptions()` etter at map options og `colorAxis` var satt.

```ts
this.setActiveMapType(options);

return this.addPreloadedMapDrilldownTest(options, this.preloadedMapDrilldownTestConfig);
```

**begrunnelse**

- `updateMapOptions()` kjøres når aktiv diagramtype er et kart.

- `setActiveMapType()` setter riktig parent map type, for eksempel mapFylker.

- `addPreloadedMapDrilldownTest()` legger deretter drilldown-oppsettet inn i samme `Highcharts.Options` objekt.

## Relevant flyt:

`fhiAngularHighchartsComponent`

- `updateMap()`

- `loadMap()`

- `OptionsService.updateOptions()`

- `OptionsService.updateMapOptions()`

- `addPreloadedMapDrilldownTest()`

Dette betyr at drilldown må settes opp etter at map series finnes i options.

## Problem som måtte håndteres

`updateMapOptions()` kan kjøre før map series har ferdig data.

Derfor måtte POC-en ha guard clauses før drilldown ble satt opp.

```ts
private addPreloadedMapDrilldownTest(
  options: Options,
  drilldownConfig: MapDrilldownTestConfig,
): Options {
  const mapSerie = this.createMapSeriesFromFirstOptionsSeries(options);

  if (mapSerie === null) {
    this.logSkippedPreloadedMapDrilldownTest('No map series was found in options.series.', {
      activeDiagramType: this.diagramOptions.activeDiagramType,
    });

    return options;
  }

  const mapSerieData = this.getMapSeriesData(mapSerie);

  if (mapSerieData === null || mapSerieData.length === 0) {
    this.logSkippedPreloadedMapDrilldownTest('Map series has no data yet.', {
      activeDiagramType: this.diagramOptions.activeDiagramType,
      mapSerie,
    });

    this.setMapSeries(options, mapSerie);
    return options;
  }

  const parentDataPoint = this.findParentDataPoint(mapSerieData, drilldownConfig);

  if (parentDataPoint === null) {
    this.logSkippedPreloadedMapDrilldownTest('Parent point was not found in the map series.', {
      expectedParentMapKey: drilldownConfig.parentMapKey,
      expectedParentName: drilldownConfig.parentName,
      availableMapPoints: this.getAvailableMapPointIdentities(mapSerieData),
    });

    this.setMapSeries(options, mapSerie);
    return options;
  }

  mapSerie.data = this.addDrilldownToParentPoint(mapSerieData, drilldownConfig);

  this.setMapSeries(options, mapSerie);
  this.setPreloadedChildMapDrilldownSeries(options, drilldownConfig);
  this.addMapDrilldownDebugEvents(options, mapSerie);

  return options;
}
```

**Begrunnelse:**

- Drilldown kan ikke settes opp før parent map series finnes.

- Parent map series må ha data.

- Parent point må finnes før `point.drilldown` kan legges til.

- Logging ble brukt for å skille mellom faktisk feil og forventet venting på map data.

- `setMapSeries()` blir kjørt før return slik at kartet fortsatt kan vises selv om POC-en stopper tidlig.

_Console Log_

```ConsoleLog
Skipping preloaded map drilldown test. Map series has no data yet.
```

Denne loggen betyr ikke at drilldown feilet. Den betyr at POC-en stoppet fordi map data ikke var tilgjengelig ennå.

## Finne parent map series og parent point

POC-en lager først en map series fra første series i `options.series`.

```ts
private createMapSeriesFromFirstOptionsSeries(options: Options): SeriesMapOptions | null {
  const firstSeries = options.series?.[0];

  if (!firstSeries) {
    return null;
  }

  return this.topoJsonService.getHighmapsSerie(firstSeries as FhiDiagramSerie);
}
```

Deretter hentes data fra map series.

```ts
private getMapSeriesData(mapSerie: SeriesMapOptions): MapSeriesDataPoint[] | null {
  const mapSerieData = mapSerie.data ?? null;

  if (!Array.isArray(mapSerieData)) {
    return null;
  }

  return mapSerieData;
}
```

Parent point blir funnet ved å sjekke om datapunktet matcher `parentMapKey` eller `parentName`.

```ts
private findParentDataPoint(
  mapSerieData: MapSeriesDataPoint[],
  drilldownConfig: MapDrilldownTestConfig,
): MapSeriesDataPoint | null {
  return (
    mapSerieData.find((dataPoint) => this.isParentMapPoint(dataPoint, drilldownConfig)) ?? null
  );
}
```

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

**Begrunnelse:**

- `createMapSeriesFromFirstOptionsSeries()` gjør om vanlig series-data til Highmaps map series.

- `getMapSeriesData()` sikrer at map series faktisk har array-data.

- `findParentDataPoint()` finner Rogaland i parent map.

- `isParentMapPoint()` gjør at POC-en kan finne parent point med enten `hc-key` eller `name`.

- I testen brukes `parentMapKey: 'no-ro'` for Rogaland.

Dette er mer stabilt enn å bare søke på navn, fordi `hc-key` kobler data mot map geometry.

## Legge drilldown-id på parent point

Når Rogaland ble funnet, ble det lagt til en `drilldown` property på punktet.

```ts
private addDrilldownToParentPoint(
  mapSerieData: MapSeriesDataPoint[],
  drilldownConfig: MapDrilldownTestConfig,
): MapSeriesDataPoint[] {
  return mapSerieData.map((dataPoint) => {
    if (!this.isParentMapPoint(dataPoint, drilldownConfig)) {
      return dataPoint;
    }

    return this.createParentPointWithDrilldown(dataPoint, drilldownConfig);
  });
}
```

For `array-basert` map data ble parent point gjort om til object-format slik at `drilldown` og `events` kunne legges til.

```ts
return {
  'hc-key': mapKeyText,
  value,
  drilldown: drilldownConfig.drilldownSeriesId,
  events: this.createParentPointDebugEvents(),
} as SeriesMapDataOptions;
```

**Begrunnelse:**

- `Array-format` som `['no-ro', 78.1]` har ikke plass til drilldown. Derfor må Rogaland-pointet gjøres om til object-format.

- drilldown får verdien `rogaland-kommuner-drilldown.` Denne verdien matcher `id` på child series.

## Opprette child map series for Rogaland kommuner

```ts
private createChildMapDrilldownSeries(drilldownConfig: MapDrilldownTestConfig): SeriesMapOptions {
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
    mapData: this.topoJsonService.getMapDataForMapType(drilldownConfig.childMapTypeId),
    joinBy: 'hc-key',
    allAreas: true,
  };
}

```

**Begrunnelse:**

- `getHighmapsSerieForMapType()` lager kommune-data i Highmaps-format.

- `id` matcher point.drilldown på Rogaland.

- `mapData` gir Highcharts kommune-geometrien.

- `joinBy: 'hc-key'` kobler kommune-data til kommune-geometri.

- `allAreas:` true gjør at kommuneområder kan vises selv om ikke alle har verdi i testdata.

## Legge child series inn i `options.drilldown.series`

Child series ble lagt inn i `options.drilldown.series` med `setPreloadedChildMapDrilldownSeries()`.

```ts
private setPreloadedChildMapDrilldownSeries(
  options: Options,
  drilldownConfig: MapDrilldownTestConfig,
): void {
  const existingDrilldownSeries = options.drilldown?.series ?? [];

  const drilldownSeriesWithoutCurrentTest = existingDrilldownSeries.filter(
    (series) => !this.isSameDrilldownSeries(series, drilldownConfig.drilldownSeriesId),
  );

  options.drilldown = {
    ...options.drilldown,
    series: [
      ...drilldownSeriesWithoutCurrentTest,
      this.createChildMapDrilldownSeries(drilldownConfig) as SeriesOptionsType,
    ],
  };
}
```

Child series blir opprettet med kommune-data og kommune-map geometry.

```ts
private createChildMapDrilldownSeries(drilldownConfig: MapDrilldownTestConfig): SeriesMapOptions {
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
    mapData: this.topoJsonService.getMapDataForMapType(drilldownConfig.childMapTypeId),
    joinBy: 'hc-key',
    allAreas: true,
  };
}
```

```ts
private isSameDrilldownSeries(series: SeriesOptionsType, drilldownSeriesId: string): boolean {
  return this.getTextValueOrNull(series.id) === drilldownSeriesId;
}
```

**Begrunnelse:**

- Preloaded drilldown krever at child series finnes i `options.drilldown.series` før brukeren klikker.

- `drilldownSeriesWithoutCurrentTest` hindrer at samme test series legges inn flere ganger.

- `id` på child series matcher `point.drilldown` på Rogaland.

- `mapData` gir Highcharts kommune-geometrien.

- `joinBy: 'hc-key'` kobler kommune-data til kommune-geometri.

- `allAreas: true` gjør at kommuneområder kan vises selv om ikke alle har verdi i testdata.

## Legge til breadcrumbs

Navigasjon tilbake ble testet med Highcharts sin innebygde drilldown-navigation.

I demo-oppsettet ble breadcrumbs lagt inn i `diagramOptions`.

```ts
drilldown: {
  breadcrumbs: {
    floating: true,
    position: {
      align: 'left',
    },
  },
},
```

- `breadcrumbs` gir brukeren en tilbake-knapp etter drilldown.
- `floating: true` gjør at breadcrumbs kan vises over chartområdet.
- `position.align: 'left'` plasserer breadcrumbs til venstre.

Dette ble brukt for å teste drill-up navigation i POC-en.

## Legge til chart events for verifisering

For å bekrefte at Highcharts faktisk kjørte drilldown-flowen, ble det lagt til logging på chart events.

```ts
private addMapDrilldownDebugEvents(options: Options, parentMapSerie: SeriesMapOptions): void {
  const parentMapTypeId = this.diagramOptions.activeDiagramType;
  const parentColorAxis = cloneDeep(options.colorAxis);
  const parentDrilldownOptions = cloneDeep(options.drilldown);
  const parentMapSerieForDrillUp = cloneDeep(parentMapSerie);

  options.chart = {
    ...options.chart,
    events: {
      ...options.chart?.events,

      drilldown: (event) => {
        console.log(' Highcharts map drilldown event fired', event);
      },

      drillupall: (event) => {
        console.log('Highcharts map drillupall event fired');

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
    },
  };
}
```

**Begrunnelse:**

- `drilldown` bekrefter at klikk på parent point starter Highcharts sin drilldown-flow.

- `drillupall` bekrefter at brukeren har navigert tilbake til parent level.

- `parentMapSerie`, `colorAxis` og `drilldown` options blir lagret før drilldown.

- Etter drill-up blir parent map series satt tilbake med `event.target.update()`.

- Dette løste problemet der parent fylkeskart kom tilbake uten riktig fargevisning.

- `window.setTimeout()` gjør at restore skjer etter at Highcharts er ferdig med sin egen drill-up-prosess.

## Full POC-struktur

POC-en ble delt i små funksjoner for å gjøre testen lettere å lese og feilsøke.

```ts
private addPreloadedMapDrilldownTest(
  options: Options,
  drilldownConfig: MapDrilldownTestConfig,
): Options {
  const mapSerie = this.createMapSeriesFromFirstOptionsSeries(options);

  if (mapSerie === null) {
    this.logSkippedPreloadedMapDrilldownTest('No map series was found in options.series.', {
      activeDiagramType: this.diagramOptions.activeDiagramType,
    });

    return options;
  }

  const mapSerieData = this.getMapSeriesData(mapSerie);

  if (mapSerieData === null || mapSerieData.length === 0) {
    this.logSkippedPreloadedMapDrilldownTest('Map series has no data yet.', {
      activeDiagramType: this.diagramOptions.activeDiagramType,
      mapSerie,
    });

    this.setMapSeries(options, mapSerie);
    return options;
  }

  const parentDataPoint = this.findParentDataPoint(mapSerieData, drilldownConfig);

  if (parentDataPoint === null) {
    this.logSkippedPreloadedMapDrilldownTest('Parent point was not found in the map series.', {
      expectedParentMapKey: drilldownConfig.parentMapKey,
      expectedParentName: drilldownConfig.parentName,
      availableMapPoints: this.getAvailableMapPointIdentities(mapSerieData),
    });

    this.setMapSeries(options, mapSerie);
    return options;
  }

  mapSerie.data = this.addDrilldownToParentPoint(mapSerieData, drilldownConfig);

  this.setMapSeries(options, mapSerie);
  this.setPreloadedChildMapDrilldownSeries(options, drilldownConfig);
  this.addMapDrilldownDebugEvents(options, mapSerie);

  return options;
}
```

**Funksjonsansvar:**

- `createMapSeriesFromFirstOptionsSeries()` lager parent map series fra første series i options.

- `getMapSeriesData()` henter data fra parent map series.

- `findParentDataPoint()` finner Rogaland i parent map series.

- `addDrilldownToParentPoint()` legger `drilldown` på parent point.

- `setMapSeries()` setter oppdatert parent map series tilbake i options.

- `setPreloadedChildMapDrilldownSeries()` legger child series inn i `options.drilldown.series`.

- `createChildMapDrilldownSeries()` lager child map series for Rogaland kommuner.

- `addMapDrilldownDebugEvents()` legger til logging og restore av parent map etter drill-up.

**Teknisk resultat:**

- Parent map er `mapFylker`.

- Parent point er Rogaland.

- Parent key er `no-ro`.

- Child map type er `mapKommuner`.

- Child series bruker kommune-data og kommune-map geometry.

- Koblingen mellom parent og child skjer med `point.drilldown` og `drilldown.series[].id`.

## Testresultat

POC-en bekreftet at preloaded drilldown fungerer teknisk i prosjektet.

**Visuell verifisering:**

- Parent map ble vist som fylkeskart.

- Rogaland kunne klikkes.

- Child map series ble vist etter klikk.

- Drill-up/back navigation fungerte.

- Parent map kom tilbake etter drill-up.

- Farger på parent map ble vist riktig etter drill-up.

## Observasjoner

Det ble observert at POC-en kunne kjøre før map data var klar. Dette ble håndtert med guard clause i `addPreloadedMapDrilldownTest().`

Det ble også observert en browser warning relatert til `aria-hidden` etter drill-up:

_Blocked aria-hidden_ on an element because its descendant retained focus.

Dette stoppet ikke drilldown-funksjonaliteten, men bør vurderes videre dersom accessibility skal dokumenteres eller testes mer.

## Foreløpig konklusjon av Preload drilldown

Testen bekrefter at Highcharts Maps kan koble et fylke til et child map level ved hjelp av:

- `point.drilldown`
- `drilldown.series[].id`
- child map series
- child map geometry
- `highcharts/modules/drilldown`

Dagens datastruktur kan brukes for parent level dersom hvert fylke har en stabil key, for eksempel `hc-key`.

For full fylke-til-kommune drilldown må løsningen i tillegg ha:

- child data for kommunenivå
- child map geometry for kommunenivå
- mapping mellom fylke og kommuner
- fallback dersom child data mangler
- generell løsning for alle fylker

Denne POC-en dekker ikke hele research-oppgaven alene.

Den dekker første del av undersøkelsen: å verifisere at Highcharts drilldown-mekanismen fungerer i prosjektet med preloaded child series.

---

## Kilder

_Alle kilder brukt så langt_

- Highcharts Maps: Map drill down
  https://www.highcharts.com/docs/maps/map-drill-down

- Highcharts: Drill down concept
  https://www.highcharts.com/docs/chart-concepts/drilldown

- Highcharts Maps API: `drilldown`
  https://api.highcharts.com/highmaps/drilldown

- Highcharts Maps API: `drilldown.series`
  https://api.highcharts.com/highmaps/drilldown.series

- Highcharts Maps API: `chart.events.drilldown`
  https://api.highcharts.com/highmaps/chart.events.drilldown

- Highcharts Maps API: `drilldown.breadcrumbs`
  https://api.highcharts.com/highmaps/drilldown.breadcrumbs

- Highcharts: Breadcrumbs
  https://www.highcharts.com/docs/advanced-chart-features/breadcrumbs

- Highcharts Maps API: `drilldown.drillUpButton`
  https://api.highcharts.com/highmaps/drilldown.drillUpButton - Brukt for å dokumentere at `drillUpButton` er deprecated og at `breadcrumbs` bør brukes i stedet.
