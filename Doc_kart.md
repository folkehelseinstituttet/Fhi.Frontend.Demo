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

Denne testen dekker kun `preloaded drilldown` og brukes som en teknisk POC.

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
| Child map type    | `mapKommuner`                 |

### Demo-oppsett brukt for testen

POC-en ble testet i demoen gjennom `getData__example_4a()`. Demoen brukte `activeDiagramType: 'mapFylker'` som parent level.

```ts
activeDiagramType: 'mapFylker',

drilldown: {
  breadcrumbs: {
    floating: true,
    position: {
      align: 'left',
    },
  },
},
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

Preloaded drilldown krever at child series ligger i `options.drilldown.series` før brukeren klikker.

Koblingen skjer med:

- `point.drilldown`
- `drilldown.series[].id`

Verdien i `point.drilldown` må matche `id` på child series.Kilde: [Highcharts Maps API: drilldown.series](https://api.highcharts.com/highmaps/drilldown.series)

**Eksempel:**

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

Når brukeren klikker på Rogaland, finner Highcharts child series med samme `id` som `point.drilldown`.

## Hvor testen ble lagt inn

Testen ble lagt inn i `options.service.ts`, fordi denne filen bygger `Highcharts.Options` for kartvisningen.

POC-en ble koblet inn i `updateMapOptions()` etter at map type og `colorAxis` var satt.

```ts
this.setActiveMapType(options);

return this.addPreloadedMapDrilldownTest(options, this.preloadedMapDrilldownTestConfig);
```

**begrunnelse**

- `updateMapOptions()` kjøres når aktiv diagramtype er et kart.

- `setActiveMapType()` setter riktig parent map type, for eksempel `mapFylker`.

- `addPreloadedMapDrilldownTest()` legger deretter drilldown-oppsettet inn i samme `Highcharts.Options` objekt.

**Relevant flyt:**

`FhiAngularHighchartsComponent.updateMap()` → `loadMap()` → `OptionsService.updateOptions()` → `updateMapOptions()` → `addPreloadedMapDrilldownTest()`

Dette betyr at drilldown må settes opp etter at map series finnes i options.

## Problem som måtte håndteres

`updateMapOptions()` kan kjøre før map series har ferdig data.

Derfor måtte POC-en ha guard clauses før drilldown ble satt opp.

```ts
if (mapSerieData === null || mapSerieData.length === 0) {
  this.logSkippedPreloadedMapDrilldownTest('Map series has no data yet.', {
    activeDiagramType: this.diagramOptions.activeDiagramType,
    mapSerie,
  });

  this.setMapSeries(options, mapSerie);
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

POC-en lager først en map series fra første series i `options.series`, deretter hentes data fra map series.

Parent point ble funnet ved å sjekke om datapunktet matchet `parentMapKey` eller `parentName`.

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

- `drilldown` får verdien `rogaland-kommuner-drilldown`. Denne verdien matcher `id` på child series.

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

- `id` matcher `point.drilldown` på Rogaland.

- `mapData` gir Highcharts kommune-geometrien.

- `joinBy: 'hc-key'` kobler kommune-data til kommune-geometri.

- `allAreas: true` gjør at kommuneområder kan vises selv om ikke alle har verdi i testdata.

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

`drilldownSeriesWithoutCurrentTest` hindrer at samme test series legges inn flere ganger.

**Begrunnelse:**

- Preloaded drilldown krever at child series finnes i `options.drilldown.series` før brukeren klikker.

- `drilldownSeriesWithoutCurrentTest` hindrer at samme test series legges inn flere ganger.

- `id` på child series matcher `point.drilldown` på Rogaland.

- `mapData` gir Highcharts kommune-geometrien.

- `joinBy: 'hc-key'` kobler kommune-data til kommune-geometri.

- `allAreas: true` gjør at kommuneområder kan vises selv om ikke alle har verdi i testdata.

## Legge til breadcrumbs

Breadcrumbs ble lagt inn i demo-oppsettet for å teste drill-up navigation.

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

Dette ble brukt for å teste drill-up navigation i POC-en.

## Legge til chart events for verifisering

For å bekrefte at Highcharts faktisk kjørte drilldown-flowen, ble det lagt til logging på chart events.

```ts
events: {
  drilldown: (event) => {
    console.log('Highcharts map drilldown event fired', event);
  },

  drillupall: () => {
    console.log('Highcharts map drillupall event fired');
  },
}
```

## Gjenopprette parent map etter drill-up

I testen måtte parent map series gjenopprettes etter drill-up.

Uten dette kunne fylkeskartet komme tilbake uten riktig fargevisning.

```ts
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
```

**Begrunnelse:**

- Parent map type må settes tilbake.

- `colorAxis` må settes tilbake.

- Parent series må settes tilbake.

- `window.setTimeout()` ble brukt slik at restore kjørte etter Highcharts sin egen drill-up-prosess.

## Testresultat

POC-en bekreftet at preloaded drilldown fungerer teknisk i prosjektet.

**Visuell verifisering:**

- Parent map ble vist som fylkeskart.

- Rogaland kunne klikkes.

- Child map series ble vist etter klikk.

- Drill-up/back navigation fungerte.

- Parent map kom tilbake etter drill-up.

- Farger på parent map ble vist riktig etter drill-up.

**Teknisk verifisering:**

- `point.drilldown` ble lagt til på Rogaland.

- Child series ble lagt inn i `options.drilldown.series`.

- `drilldown` event fired ved klikk.

- `drillupall` event fired ved tilbake-navigasjon.

- Parent map series ble gjenopprettet etter drill-up.

## Observasjoner

### Map data kan mangle første gang

Det ble observert at POC-en kunne kjøre før map data var klar. Dette ble håndtert med guard clause i `addPreloadedMapDrilldownTest().`

### Accessibility warning

Det ble også observert en browser warning relatert til `aria-hidden` etter drill-up:

_Blocked aria-hidden_ on an element because its descendant retained focus.

Dette stoppet ikke drilldown-funksjonaliteten, men bør vurderes videre dersom accessibility skal dokumenteres eller testes mer.

### Begrensninger med preloaded drilldown

Preloaded drilldown fungerer teknisk, men er ikke nødvendigvis beste løsning for endelig implementasjon.

- Child data må være tilgjengelig før brukeren klikker.

- Child map geometry må være tilgjengelig før brukeren klikker.

- `options.drilldown.series` kan bli stor dersom alle fylker og kommuner legges inn samtidig.

- Løsningen er mindre fleksibel dersom child data skal hentes dynamisk.

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

Denne POC-en dekker første del av undersøkelsen:

`Kan Highcharts drilldown-mekanismen fungere i prosjektet med preloaded child series?`

Svar: Ja.

Denne POC-en dekker ikke hele research-oppgaven alene. Async drilldown må også vurderes før endelig anbefaling.

# Async drilldown test i kart

## Formål med async-testen

Formålet med async-testen var å undersøke om Highcharts Maps kan støtte drilldown der child series blir laget først når brukeren klikker på et parent point.

Testen skulle bekrefte:

- at parent point kan markeres som drilldown-punkt

- at `chart.events.drilldown` fires ved klikk på Rogaland

- at `event.seriesOptions` er `undefined`, slik at child series ikke er preloaded

- at child series kan opprettes i drilldown-eventen

- at `chart.addSeriesAsDrilldown(event.point, childSeries)` viser child map series

- at child map geometry kan filtreres til valgt fylke

- at kommune-kartet vises etter klikk på Rogaland

- at drill-up fungerer teknisk

- at parent fylkeskart kommer tilbake etter drill-up

Denne testen dekker `async drilldown`.

## Testoppsett

Testen ble gjort med Rogaland som parent point.

**Testverdier:**

| Del               | Verdi                         |
| ----------------- | ----------------------------- |
| Parent fylke      | Rogaland                      |
| Parent map key    | `no-ro`                       |
| Drilldown `id`    | `rogaland-kommuner-drilldown` |
| Child series name | `Rogaland kommuner`           |
| Child level       | Kommuner                      |
| Child map type    | `mapKommuner`                 |

Testen brukte samme grunnoppsett som preloaded POC-en, men child series ble ikke lagt inn i `options.drilldown.series`.

I stedet ble child series opprettet og lagt til etter klikk, inne i Highcharts sin `drilldown` event.

## Teknisk prinsipp

Ved async drilldown blir child series ikke lagt inn i chart options på forhånd.

Parent point får en `drilldown` verdi, slik at Highcharts vet at punktet kan drilles ned.

Når brukeren klikker på parent point, kjører Highcharts `chart.events.drilldown`.

I eventen kan child series opprettes dynamisk og legges til med:

```ts
event.target.addSeriesAsDrilldown(event.point, childSeries);
```

Dette betyr at child data og child map geometry kan bygges eller hentes først når brukeren faktisk klikker. Dette følger Highcharts sin async drilldown-beskrivelse, der child series lastes dynamisk i `drilldown`-eventen og legges til med `Chart.addSeriesAsDrilldown()`. [Chart concepts - Drilldown](https://www.highcharts.com/docs/chart-concepts/drilldown)

## Hvor testen ble lagt inn

Testen ble lagt inn i `options.service.ts`, fordi denne filen bygger `Highcharts.Options` for kartvisningen.

Async-testen ble koblet inn i `updateMapOptions()` etter at map type og `colorAxis` var satt.

```ts
this.setActiveMapType(options);

return this.addAsyncMapDrilldownTest(options, this.asyncMapDrilldownTestConfig);
```

**Begrunnelse:**

- `updateMapOptions()` kjøres når aktiv diagramtype er et kart.
- `setActiveMapType()` setter parent map type, for eksempel `mapFylker`.
- `addAsyncMapDrilldownTest()` legger til async drilldown-oppsettet i samme `Highcharts.Options` objekt.
- Child series blir ikke lagt inn i `options.drilldown.series`, fordi testen skal undersøke async drilldown.

## Relevant flyt

`FhiAngularHighchartsComponent`

- `updateMap()`
- `loadMap()`
- `OptionsService.updateOptions()`
- `OptionsService.updateMapOptions()`
- `addAsyncMapDrilldownTest()`
- `addAsyncMapDrilldownEvents()`
- `chart.events.drilldown`
- `addSeriesAsDrilldown()`

Dette betyr at parent map først bygges som vanlig, og child map legges til senere når brukeren klikker på Rogaland.

## Async testkonfigurasjon

```ts
private readonly asyncMapDrilldownTestConfig: MapDrilldownTestConfig = {
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

**Begrunnelse:**

- `parentMapKey: 'no-ro'` brukes for å finne Rogaland i parent map series.
- `drilldownSeriesId` brukes som kobling mellom parent point og child series.
- `childMapTypeId: MapTypeIdValues.mapKommuner` gjør at child series bruker kommune-kartet.
- `childSeriesData` er testdata for kommuner i Rogaland.

## Problem som måtte håndteres

Async drilldown må fortsatt ha et parent point som Highcharts kjenner igjen som drilldown-punkt.

Kartdata kan komme i array-format, for eksempel:

```ts
['no-ro', 78.1];
```

Array-formatet har ikke plass til ekstra properties som `drilldown` og `events`.

Derfor måtte Rogaland-pointet gjøres om til object-format før drilldown kunne fungere.

```ts
return {
  'hc-key': mapKeyText,
  value,
  drilldown: drilldownConfig.drilldownSeriesId,
  events: this.createParentPointDebugEvents(),
} as SeriesMapDataOptions;
```

**Begrunnelse:**

- `hc-key` kobler punktet til map geometry.
- `value` beholder verdien punktet hadde i parent map.
- `drilldown` markerer punktet som et drilldown-punkt.
- `events` ble brukt for å verifisere at parent point faktisk ble klikket.

## Legge async drilldown på parent point

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

**Begrunnelse:**

- Bare Rogaland skal få drilldown i denne POC-en.
- Andre fylker skal beholdes uendret.
- `createParentPointWithAsyncDrilldown()` håndterer om punktet er array-basert eller object-basert.

## Håndtere array-basert og object-basert parent point

```ts
  private createParentPointWithAsyncDrilldown(
    dataPoint: MapSeriesDataPoint,
    drilldownConfig: MapDrilldownTestConfig,
  ): MapSeriesDataPoint {
    if (Array.isArray(dataPoint)) {
      return this.createAsyncParentPointFromArrayData(dataPoint, drilldownConfig);
    }

    if (this.isMapObjectDataPoint(dataPoint)) {
      return this.createAsyncParentPointFromObjectData(dataPoint, drilldownConfig);
    }

    console.warn('Parent point matched, but the data shape is not supported.', dataPoint);

    return dataPoint;
  }
```

**Begrunnelse:**

- Dersom punktet er array-basert, må det konverteres til object-format.
- Dersom punktet allerede er object-basert, beholdes eksisterende data og drilldown legges til.
- Dette gjør POC-en mer robust fordi den ikke bare fungerer for én bestemt dataform.

## Opprette child map series i drilldown-eventen

```ts
  private addAsyncMapDrilldownEvents(
    options: Options,
    drilldownConfig: MapDrilldownTestConfig,
    parentMapSerie: SeriesMapOptions,
  ): void {
    const parentMapTypeId = this.diagramOptions.activeDiagramType;
    const parentColorAxis = cloneDeep(options.colorAxis);
    const parentDrilldownOptions = cloneDeep(options.drilldown);
    const parentMapSerieForDrillUp = cloneDeep(parentMapSerie);

    options.chart = {
      ...options.chart,
      events: {
        ...options.chart?.events,

        drilldown: (event) => {
          console.log('Highcharts async map drilldown event fired', event);

          if (event.seriesOptions) {
            return;
          }

          const childSeries = this.createChildMapDrilldownSeries(drilldownConfig);

          event.target.addSeriesAsDrilldown(event.point, childSeries as SeriesOptionsType);
        },

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
      },
    };
  }
```

**Begrunnelse:**

- `drilldown` eventen bekrefter at Highcharts starter drilldown-flowen.

- `event.seriesOptions` var `undefined`. Dette var forventet fordi child series ikke ble lagt inn i `options.drilldown.series` på forhånd. I stedet ble child series opprettet i drilldown-eventen og lagt til med `addSeriesAsDrilldown(event.point, childSeries)`. Dette bekrefter at testen bruker async drilldown.

- `createChildMapDrilldownSeries()` lager child series først når brukeren klikker.

- `addSeriesAsDrilldown()` legger child series til klikket parent point. `addSeriesAsDrilldown(point, options)` brukes for async drilldown når klikk på et punkt skal laste og vise en mer detaljert series. [MapChart](https://api.highcharts.com/class-reference/Highcharts.MapChart)

- `drillupall` brukes for å gjenopprette parent map etter drill-up.

- `parentMapSerie`, `colorAxis` og `drilldown` options lagres før drilldown, slik at fylkeskartet kan gjenopprettes riktig etterpå.

Highcharts sin API beskriver at `chart.events.drilldown` fires før en ny series legges til, og at eventen også brukes for async drilldown når `seriesOptions` ikke er lagt inn via options på forhånd. [Drilldown - Call back function](https://api.highcharts.com/highcharts/chart.events.drilldown)

## Filtrere child map geometry

Denne løsningen forutsetter at kommune `hc-key` starter med parent fylke-key, for eksempel `no-ro-1101` for Rogaland. Dersom map key-strukturen endres, bør filtreringen erstattes med en tydelig mapping mellom fylke og kommuner.

Først ble async POC-en testet med hele kommune-kartet som child `mapData`.

Dette fungerte teknisk, men ga ikke optimal visning fordi kartet ikke holdt tydelig fokus på Rogaland-kommunene.

Derfor ble child map geometry filtrert slik at child mapData bare inneholder kommuner som tilhører valgt fylke.

I `TopoJsonService` ble det lagt til en metode som henter mapData for child map type og filtrerer geometries basert på parent map key.

Highcharts Maps bruker TopoJSON eller GeoJSON som map geometry. Derfor kan child `mapData` bygges ved å bruke samme map structure, men med filtrerte geometries for valgt område. [Highcharts Map](https://www.highcharts.com/docs/maps/getting-started)

```ts
  getMapDataForMapTypeAndParentMapKey(mapTypeId: string, parentMapKey: string): object {
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

**Begrunnelse:**

- Parent key for Rogaland er `no-ro`.

- Kommune `hc-key` for Rogaland starter med `no-ro-`, for eksempel `no-ro-1101`.

- Ved å filtrere på parent key får child mapData bare kommuner som hører til valgt fylke.

- Dette gir et mer presist child level.

- Dette er mer robust enn å bruke hele kommune-kartet og bare prøve å zoome visuelt etterpå.

## Bruke filtrert mapData i child series

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
      mapData: this.topoJsonService.getMapDataForMapTypeAndParentMapKey(
        drilldownConfig.childMapTypeId,
        drilldownConfig.parentMapKey,
      ),
      joinBy: 'hc-key',
      allAreas: true,
    };
  }
```

**Begrunnelse:**

- `getHighmapsSerieForMapType()` lager child data i Highmaps-format.
- `getMapDataForMapTypeAndParentMapKey()` henter bare kommune-geometri for valgt fylke.
- `id` matcher `drilldown` på parent point.
- `mapData` gir Highcharts child geometry.
- `joinBy: 'hc-key'` kobler kommune-data til kommune-geometri. Highcharts sin `joinBy`-dokumentasjon beskriver at `joinBy` bestemmer hvilken property som brukes for å koble `mapData` sammen med data. [Highmaps - joinBy](https://api.highcharts.com/highmaps/series.map.joinBy)

- `allAreas: true` viser alle områder i filtrert child mapData, også kommuner uten testverdi.

## Testresultat

Async POC-en bekreftet at async drilldown fungerer teknisk i prosjektet.

**Console-verifisering:**

```text
Skipping async map drilldown test. Map series has no data yet.
Highcharts async map drilldown event fired
Async parent map point was clicked
Highcharts async map drillupall event fired
```

I `drilldown` eventen ble `seriesOptions` vist som `undefined`.

Dette bekrefter at child series ikke var preloaded i `options.drilldown.series`.

Dette samsvarer med Highcharts sin beskrivelse av async drilldown, der `seriesOptions` ikke er lagt inn via options på forhånd, men lastes async i eventen. [Chart events drilldown](https://api.highcharts.com/highcharts/chart.events.drilldown)

Child series ble laget og lagt til først ved klikk på Rogaland.

**Visuell verifisering:**

- Parent map ble vist som fylkeskart.
- Rogaland kunne klikkes.
- Highcharts sin `drilldown` event fired.
- Kommune map series ble vist etter klikk.
- Child map geometry ble filtrert til Rogaland-kommuner.
- Drill-up/back navigation fungerte teknisk.
- Parent fylkeskart kom tilbake etter drill-up.

## Observasjoner

Det ble observert at async POC-en kan kjøre før map data er klar.

Dette ga loggen:

```text
Skipping async map drilldown test. Map series has no data yet.
```

Dette betyr ikke at async drilldown feilet. Det betyr at POC-en stoppet tidlig fordi map series ikke hadde data ennå.

Det ble også observert en warning fra diagram-state:

```text
Kan ikke vise diagramtype "mapFylker" fordi "undefined" (Teknisk årsak: "undefined")
```

Async drilldown fungerte likevel etter at kartdata ble lastet. Denne warningen bør undersøkes separat dersom den fortsetter å komme i endelig løsning.

Breadcrumbs/drill-up fungerte teknisk. Brukeren kan klikke på øverste nivå i breadcrumb-stien for å gå tilbake til fylkeskartet.

I testen var dette ikke veldig tydelig visuelt, fordi breadcrumb-teksten ble vist som en sti, for eksempel:

```text
Valgdeltagelse flere år / Rogaland kommuner
```

For en endelig løsning bør breadcrumbs styling eller tekst vurderes slik at tilbake-navigasjonen blir tydeligere for brukeren.

## Foreløpig konklusjon av async drilldown

Testen bekrefter at Highcharts Maps kan støtte async drilldown i prosjektet.

Async drilldown fungerer ved at:

- parent point markeres med `drilldown`
- `chart.events.drilldown` fires ved klikk
- child series bygges i drilldown-eventen
- child map geometry hentes og filtreres til valgt fylke
- child series legges til med `addSeriesAsDrilldown()`

Dette er mer egnet enn preloaded drilldown dersom child data eller child map geometry skal hentes dynamisk basert på valgt fylke.

For en endelig løsning vurderes async drilldown med filtrert child map geometry/data som den mest robuste løsningen.

Å filtrere child map geometry gjør at child map level blir mindre, tydeligere og mer knyttet til valgt parent fylke.

`mapView.fitToGeometry` eller `fitToBounds` kan eventuelt brukes som et ekstra visuelt tiltak dersom kartet fortsatt ikke zoomer/fokuserer godt nok, men bør ikke være hovedløsningen alene. [MapView fit To Geometry](https://api.highcharts.com/highmaps/mapView.fitToGeometry) og [fitToBounds](https://api.highcharts.com/class-reference/Highcharts.MapView#fitToBounds)

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

- Highcharts Highmaps: `Fit to Geometry`
  https://api.highcharts.com/highmaps/mapView.fitToGeometry

- Highcharts: Drill down concept / async setup  
  https://www.highcharts.com/docs/chart-concepts/drilldown

- Highcharts Maps: Map drill down  
  https://www.highcharts.com/docs/maps/map-drill-down

- Highcharts API: `chart.events.drilldown`  
  https://api.highcharts.com/highcharts/chart.events.drilldown

- Highcharts API: `MapChart.addSeriesAsDrilldown()`  
  https://api.highcharts.com/class-reference/Highcharts.MapChart

- Highcharts Maps: Getting started / TopoJSON and GeoJSON  
  https://www.highcharts.com/docs/maps/getting-started

- Highcharts Maps API: `series.map.joinBy`  
  https://api.highcharts.com/highmaps/series.map.joinBy

- Highcharts Maps API: `mapView.fitToGeometry`  
  https://api.highcharts.com/highmaps/mapView.fitToGeometry

- Highcharts API: `MapView.fitToBounds`  
  https://api.highcharts.com/class-reference/Highcharts.MapView#fitToBounds
