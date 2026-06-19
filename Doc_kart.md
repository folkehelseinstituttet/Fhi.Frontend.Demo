# Undersøkelse av drilldown-kart i FHI Angular Highcharts

## Formål

Formålet med undersøkelsen er å finne ut hvordan drilldown kan implementeres i kartvisninger i FHI Angular Highcharts-prosjektet.

Undersøkelsen dekker to mulige tekniske løsninger:

- `preloaded drilldown`
- `async drilldown`

Målet er å finne ut hvilken løsning som passer best for drilldown fra fylkesnivå til kommunenivå.

## Hvordan Highcharts håndterer drilldown i kart

Highcharts Maps støtter drilldown ved at et point i parent series kobles til en child series.

Drilldown krever at `highcharts/modules/drilldown` er registrert.

Ved preloaded drilldown skjer koblingen med:

- `point.drilldown`
- `drilldown.series[].id`

Verdien i `point.drilldown` må matche `id` på child series.

**Forenklet eksempel:**

```ts
{
  name: 'Rogaland',
  'hc-key': 'no-ro',
  value: 78.1,
  drilldown: 'rogaland-kommuner-drilldown'
}
```

```ts
drilldown: {
  series: [
    {
      id: 'rogaland-kommuner-drilldown',
      name: 'Rogaland kommuner',
      type: 'map',
      data: kommuneData,
      mapData: kommuneMapData,
    },
  ];
}
```

Når brukeren klikker på parent point, sjekker Highcharts om punktet har en `drilldown` verdi.

Dersom verdien matcher `id` på en child series i `drilldown.series`, bytter Highcharts fra parent series til child series.

For flere nivåer brukes samme prinsipp videre. Et child point kan også ha en egen `drilldown` verdi som peker til en ny child series.

Ved async drilldown ligger ikke child series klar i `drilldown.series` fra start.

Da brukes:

- `chart.events.drilldown`
- `addSeriesAsDrilldown()`

Dette gjør at child series kan bygges eller hentes først når brukeren klikker på parent point.

I denne undersøkelsen ble begge løsningene testet for å vurdere hvilken som passer best for fylke-til-kommune drilldown i prosjektet. [Highcharts: Drilldown](https://www.highcharts.com/docs/chart-concepts/drilldown), [Highcharts Maps: Map drill down](https://www.highcharts.com/docs/maps/map-drill-down), [Highcharts Maps API: drilldown.series](https://api.highcharts.com/highmaps/drilldown.series), [Highcharts API: chart.events.drilldown](https://api.highcharts.com/highcharts/chart.events.drilldown).

## Preloaded drilldown

Ved preloaded drilldown legges child series inn i chart options før brukeren klikker i kartet.

Preloaded drilldown krever:

- parent map series
- parent point med `drilldown`
- child map series med matchende `id`
- child data
- child map geometry, for eksempel TopoJSON/mapData
- `highcharts/modules/drilldown`

### Fordeler

- Enkel teknisk løsning
- Ingen async loading ved klikk
- God løsning for å bekrefte grunnmekanismen i Highcharts Maps

### Begrensninger

- Kan gi store chart options dersom alle kommunekart lastes inn samtidig
- Mindre egnet dersom mange nivåer eller store map files skal støttes
- Krever at child data og child map geometry er tilgjengelig når options bygges

## Async drilldown

Ved async drilldown legges ikke child series inn i `drilldown.series` fra start.

I stedet bygges eller hentes child series når brukeren klikker på et parent point.

Async drilldown krever:

- parent map series
- parent point med `drilldown`
- `chart.events.drilldown`
- child data for valgt parent point
- child map geometry for valgt parent point
- `chart.addSeriesAsDrilldown(point, childSeriesOptions)`
- `highcharts/modules/drilldown`

Denne løsningen passer bedre når kommune-data og kommune-map geometry skal bestemmes basert på hvilket fylke brukeren klikker på.

- [Highcharts: Drilldown](https://www.highcharts.com/docs/chart-concepts/drilldown)
- [Highcharts Maps: Map drill down](https://www.highcharts.com/docs/maps/map-drill-down)
- [Highcharts Maps API: drilldown.series](https://api.highcharts.com/highmaps/drilldown.series)
- [Highcharts API: chart.events.drilldown](https://api.highcharts.com/highcharts/chart.events.drilldown)
- [Highcharts API: addSeriesAsDrilldown](https://api.highcharts.com/class-reference/Highcharts.Chart#addSeriesAsDrilldown)

## Nødvendige Highcharts-moduler

For denne undersøkelsen var disse modulene relevante:

### `highcharts/highmaps`

Brukes for kartvisning.

### `highcharts/modules/drilldown`

Brukes for drilldown-funksjonalitet, for eksempel:

- `point.drilldown`
- `drilldown.series`
- `chart.events.drilldown`
- `addSeriesAsDrilldown()`
- `drillupall`
- breadcrumbs / drill-up navigation

**Begrunnelse:**

- `highcharts/highmaps` brukes fordi diagramtypen er kart.
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

**Begrunnelse:**

- `Highmaps` brukes for kartvisning.
- `DrilldownModule(Highmaps)` må registreres for at Highcharts Maps skal støtte drilldown i kart.
- Modulen ble registrert på `Highmaps`, ikke bare `Highcharts`, fordi testen gjelder kart.

## Dagens løsning

Dagens kartløsning støtter kartvisning på ett geografisk nivå om gangen, for eksempel fylke eller kommune.

`FhiAngularHighchartsComponent` har ansvar for å laste inn kart og oppdatere visningen.

`OptionsService` bygger `Highcharts.Options` for kart og diagrammer.

`TopoJsonService` henter TopoJSON-filer og kobler innkommende datapunkter til riktig map geometry.

Den har ikke ferdig generell støtte for å gå fra ett geografisk nivå til et annet i samme kartflyt.

Det finnes foreløpig ikke generell støtte for:

- child series for drilldown
- child map geometry for neste nivå
- mapping mellom parent fylke og child kommuner
- ferdig drilldown-navigation mellom nivåer
- fallback dersom child data mangler

Dagens kobling mellom data og kart skjer også på litt ulik måte avhengig av karttype.

Eksempler på identifikatorer som brukes:

- `hc-key`
- `dataPointId`
- `name`

Dette er viktig fordi drilldown krever en stabil kobling mellom:

- parent point
- child series
- child data
- child map geometry

## Foreløpig vurdering av datastruktur

Det vises at dagens parent map data kan brukes til å starte drilldown dersom hvert parent point har en stabil key.

I testen ble `hc-key` brukt som stabil key.

**Eksempel:**

```ts
point['hc-key'] === 'no-ro';
```

Dette identifiserer Rogaland i parent map series.

For en full løsning fra fylke til kommune må datastrukturen også støtte child level.

Det betyr at løsningen trenger:

- parent fylke med stabil key, for eksempel `hc-key`
- child data for kommunenivå
- kommune-key som matcher kommune map geometry, for eksempel `no-ro-1101`
- child map geometry for kommunenivå
- mapping mellom valgt fylke og riktig child series
- fallback dersom child data eller child geometry mangler

Dersom innkommende data kun inneholder fylkesnivå, er ikke dagens datastruktur alene nok for en full fylke-til-kommune drilldown.

Da må løsningen enten:

- utvide datastrukturen med child data
- hente child data fra en egen kilde
- ha en mapping mellom fylke og kommunedata
- ha en mapping mellom fylke og kommune map geometry

## Endringer i TopoJsonService for kommune-data

`TopoJsonService` måtte kunne lage map series for flere map types.

Dette var nødvendig fordi parent level og child level bruker ulike karttyper:

- parent level bruker `mapFylker`
- child level bruker `mapKommuner`

### Lage map series for valgt map type

For å støtte child level ble det laget en metode som tar imot `mapTypeId`.

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

Denne metoden gjør at løsningen kan lage en map series for `mapKommuner`, selv om parent chartet viser `mapFylker`.

Datapunkter som ikke kan matches mot map geometry blir filtrert bort.

### Mapping for kommune-data

Kommune-data må kobles til riktig kommune-geometry før det kan vises i kartet.

I testen bruker kommune-data `dataPointId`, for eksempel `1101`.

Kommune-geometrien bruker `hc-key`, for eksempel `no-ro-1101`.

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

`endsWith(dataPointId)` gjør at `1101` kan matches mot `no-ro-1101`.

Kontrollen `dataPointId.length !== 4` hindrer at ugyldige kommune-id-er brukes i kommune-mappingen.

Denne mappingen forutsetter at kommune-id i data matcher slutten av `hc-key` i map geometry.

## Child map geometry

Child map geometry må finnes for at child level skal kunne vises.

I async-testen ble child geometry filtrert basert på valgt fylke, slik at Rogaland bare viste kommuner i Rogaland.

Den delen er dokumentert under `Async drilldown test`, fordi filtreringen ble testet som en del av async-løsningen.

# Preloaded drilldown test i kart

## Formål med testen

Formålet med testen var å undersøke om Highcharts Maps kan støtte drilldown i dagens Angular Highcharts-oppsett ved bruk av `preloaded drilldown.series`.

Testen skulle bekrefte:

- at `highcharts/modules/drilldown` fungerer sammen med Highmaps
- at et fylke i parent map series kan kobles til en child map series
- at koblingen mellom `point.drilldown` og `drilldown.series[].id` fungerer
- at Highcharts sin innebygde `drilldown` event fungerer ved klikk
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
```

Breadcrumbs ble også brukt for å teste drill-up navigation. Dette nevnes senere i seksjonen `Legge til breadcrumbs`.

Testen ble kjørt på eksisterende demo-data med valgt år og valgt valgtype.

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

Verdien i `point.drilldown` må matche `id` på child series, [Highcharts Maps API: drilldown.series](https://api.highcharts.com/highmaps/drilldown.series).

**Eksempel:**

```ts
{
  name: 'Rogaland',
  'hc-key': 'no-ro',
  value: 78.1,
  drilldown: 'rogaland-kommuner-drilldown'
}
```

```ts
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

**Begrunnelse:**

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

Child map series ble laget med kommune-data og kommune-map geometry.

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

`getHighmapsSerieForMapType()` lager kommune-data i Highmaps-format.

`id` matcher `point.drilldown` på Rogaland.

`mapData` gir Highcharts kommune-geometrien.

`joinBy: 'hc-key'` kobler kommune-data til kommune-geometri.

`allAreas: true` gjør at kommuneområder kan vises selv om ikke alle har verdi i testdata.

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

Preloaded drilldown krever at child series finnes i `options.drilldown.series` før brukeren klikker.

Highcharts bruker `id` på child series for å koble den til `point.drilldown` på parent point.

`drilldownSeriesWithoutCurrentTest` hindrer at samme test series legges inn flere ganger.

## Legge til breadcrumbs

Breadcrumbs ble brukt for å teste drill-up navigation i POC-en.

I demo-oppsettet ble breadcrumbs lagt inn slik:

```ts
drilldown: {
  breadcrumbs: {
    position: {
      align: 'left',
    },
  },
},
```

Drill-up fungerte i testen.

Det bør likevel dobbelsjekkes at custom breadcrumbs-options fra `diagramOptions.drilldown` blir sendt videre til final `Highcharts.Options` før det konkluderes med endelig breadcrumbs-styling.

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
drillupall: (event) => {

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

- `drilldown` event fungerte ved klikk.

- `drillupall` event fungerte ved tilbake-navigasjon.

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

## Foreløpig konklusjon av preloaded drilldown

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

- at `chart.events.drilldown` fungerer ved klikk på Rogaland

- at `event.seriesOptions` er `undefined`, slik at child series ikke er preloaded

- at child series kan opprettes i drilldown-eventen

- at `chart.addSeriesAsDrilldown(event.point, childSeries)` viser child map series

- at child map geometry kan filtreres til valgt fylke

- at kommune-kartet vises etter klikk på Rogaland

- at drill-up fungerer teknisk

- at parent fylkeskart kommer tilbake etter drill-up

Denne testen dekker `async drilldown` og brukes som en teknisk POC.

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

Dette betyr at child data og child map geometry kan bygges eller hentes først når brukeren faktisk klikker.

Dette følger Highcharts sin async drilldown-beskrivelse, der child series lastes dynamisk i `drilldown`-eventen og legges til med `Chart.addSeriesAsDrilldown()`. [Chart concepts - Drilldown](https://www.highcharts.com/docs/chart-concepts/drilldown)

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

### Relevant flyt

`FhiAngularHighchartsComponent.updateMap()` → `loadMap()` → `OptionsService.updateOptions()` → `updateMapOptions()` → `addAsyncMapDrilldownTest()` → `addAsyncMapDrilldownEvents()` → `chart.events.drilldown()` → `addSeriesAsDrilldown()`

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

Array-formatet kan ikke ha ekstra properties som `drilldown` og `events`.

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
drilldown: (event) => {
  console.log('Highcharts async map drilldown event fired', event);

  if (event.seriesOptions) {
    return;
  }

  const childSeries = this.createChildMapDrilldownSeries(drilldownConfig);

  event.target.addSeriesAsDrilldown(event.point, childSeries as SeriesOptionsType);
},
```

**Begrunnelse:**

- `drilldown` eventen bekrefter at Highcharts starter drilldown-flowen.

- `event.seriesOptions` var `undefined`. Dette var forventet fordi child series ikke ble lagt inn i `options.drilldown.series` på forhånd.

- `createChildMapDrilldownSeries()` lager child series først når brukeren klikker.

- `addSeriesAsDrilldown()` legger child series til klikket parent point.

Highcharts API beskriver at `chart.events.drilldown` kjører før en ny series legges til, og at eventen også brukes for async drilldown når `seriesOptions` ikke er lagt inn via options på forhånd. [Drilldown - Call back function](https://api.highcharts.com/highcharts/chart.events.drilldown)

## Gjenopprette parent map etter drill-up

Dette var nødvendig for å sikre at fylkeskartet kom tilbake med riktig map type, series og fargevisning.

Dette ble gjort i `drillupall` eventen.

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

**Begrunnelse:**

- `drillupall` bekrefter at brukeren har navigert tilbake til parent level.
- Parent map type må settes tilbake.
- `colorAxis` må settes tilbake.
- Parent series må settes tilbake.
- `window.setTimeout()` ble brukt slik at restore kjørte etter Highcharts sin egen drill-up-prosess.

## Filtrere child map geometry

Først ble async POC-en testet med hele kommune-kartet som child `mapData`.

Dette fungerte teknisk, men ga ikke den beste visning fordi kartet ikke holdt tydelig fokus på Rogaland-kommunene.

Derfor ble child map geometry filtrert slik at child mapData bare inneholder kommuner som tilhører valgt fylke.

I `TopoJsonService` ble det lagt til en metode som henter mapData for child map type og filtrerer geometries basert på parent map key.

Highcharts Maps kan bruke TopoJSON eller GeoJSON som map geometry. I denne testen ble samme kommune-map brukt, men `geometries` ble filtrert til valgt fylke. [Highcharts Map](https://www.highcharts.com/docs/maps/getting-started)

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

Filtreringen skjer ved å lage en prefix fra parent map key.

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

Det gjør at kommune-geometries som `no-ro-1101` og `no-ro-1103` blir med i child mapData.

**Begrunnelse:**

- Parent key for Rogaland er `no-ro`.
- Kommune `hc-key` for Rogaland starter med `no-ro-`, for eksempel `no-ro-1101`.
- Ved å filtrere på parent key får child mapData bare kommuner som hører til valgt fylke.
- Dette gir et mer presist child level enn å bruke hele kommune-kartet som child `mapData`.

Denne løsningen forutsetter at kommune `hc-key` starter med parent fylke-key, for eksempel `no-ro-1101` for Rogaland. Dersom map key-strukturen endres, bør filtreringen erstattes med en tydelig mapping mellom fylke og kommuner.

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

**Teknisk verifisering:**

- Parent point fikk `drilldown`.

- `chart.events.drilldown` fungerte ved klikk.

- `event.seriesOptions` var `undefined`.

- Child series ble laget i drilldown-eventen.

- Child series ble lagt til med `addSeriesAsDrilldown()`.

- Child map geometry ble filtrert til valgt fylke.

- `drillupall` kjørte ved tilbake-navigasjon.

I `drilldown` eventen ble `seriesOptions` vist som `undefined`.

Dette bekrefter at child series ikke var preloaded i `options.drilldown.series`.

Dette samsvarer med Highcharts sin dokumentasjon av async drilldown, der `seriesOptions` ikke er lagt inn via options på forhånd, men lastes async i eventen. [Chart events drilldown](https://api.highcharts.com/highcharts/chart.events.drilldown)

Child series ble laget og lagt til først ved klikk på Rogaland.

**Visuell verifisering:**

- Parent map ble vist som fylkeskart.

- Rogaland kunne klikkes.

- Highcharts sin `drilldown` event fungerte.

- Kommune map series ble vist etter klikk.

- Child map geometry ble filtrert til Rogaland-kommuner.

- Drill-up/back navigation fungerte teknisk.

- Parent fylkeskart kom tilbake etter drill-up.

## Observasjoner

### Map data kan mangle første gang

Det ble observert at async POC-en kan kjøre før map data er klar.

Dette ga loggen:

```text
Skipping async map drilldown test. Map series has no data yet.
```

Dette betyr ikke at async drilldown feilet. Det betyr at POC-en stoppet tidlig fordi map series ikke hadde data ennå.

### Diagram-state warning

Det ble også observert en warning fra diagram-state:

```text
Kan ikke vise diagramtype "mapFylker" fordi "undefined" (Teknisk årsak: "undefined")
```

Async drilldown fungerte likevel etter at kartdata ble lastet. Denne warningen bør undersøkes separat dersom den fortsetter å komme i endelig løsning.

### Breadcrumbs fungerte, men ikke var tydelige nok

Breadcrumbs/drill-up fungerte teknisk. Custom breadcrumbs-options bør verifiseres videre i final `Highcharts.Options`.

I testen var dette ikke veldig tydelig visuelt, fordi breadcrumb-teksten ble vist som en sti.

```text
Valgdeltagelse flere år / Rogaland kommuner
```

For en endelig løsning bør breadcrumbs styling eller tekst vurderes slik at tilbake-navigasjonen blir tydeligere for brukeren. Dette tas videre i egen del om breadcrumbs og navigasjon.

## Foreløpig konklusjon av async drilldown

Testen bekrefter at Highcharts Maps kan støtte async drilldown i prosjektet.

Async drilldown fungerer ved at:

- parent point markeres med `drilldown`

- `chart.events.drilldown` fungerer ved klikk

- child series bygges i drilldown-eventen

- child map geometry hentes og filtreres til valgt fylke

- child series legges til med `addSeriesAsDrilldown()`

Testen tyder på at async drilldown er mer egnet enn preloaded drilldown dersom child data eller child map geometry skal hentes dynamisk basert på valgt fylke.

Denne POC-en viser at async drilldown er en sterkere kandidat enn preloaded drilldown for videre implementasjon, men endelig anbefaling oppsummeres i egen del.

---

# Breadcrumbs og navigasjon

## Formål med navigation-testen

Formålet med navigasjonstesten var å undersøke hvordan brukeren kan gå tilbake etter drilldown i kartet.

Når brukeren driller ned fra fylkesnivå til kommunenivå, må løsningen ha en tydelig vei tilbake til parent level.

Testen skulle undersøke:

- om Highcharts breadcrumbs fungerer med kart-drilldown
- om brukeren kan gå tilbake fra kommunenivå til fylkesnivå
- om breadcrumbs fungerer etter både preloaded og async drilldown
- om breadcrumb-teksten er tydelig nok for bruker

Denne testen fokuserer på navigasjon etter drilldown.

## Hva Highcharts støtter

Highcharts støtter drill-up navigation gjennom `drilldown.breadcrumbs`.

Breadcrumbs viser drilldown-stien og lar brukeren gå tilbake til tidligere nivåer.

I kart-drilldown betyr dette:

```text
Fylkesnivå → Kommunenivå
```

Relevante breadcrumbs-options:

- `position` brukes for plassering av breadcrumbs.
- `floating` påvirker om plot area flyttes for å gi plass til breadcrumbs.
- `showFullPath` kan vise hele breadcrumb-stien eller bare én breadcrumb-knapp.
- `format` eller `formatter` kan brukes dersom breadcrumb-teksten må tilpasses.

Highcharts har også `drillUpButton`, men denne er deprecated. Derfor bør `drilldown.breadcrumbs` brukes i stedet. [Breadcrumbs](https://www.highcharts.com/docs/advanced-chart-features/breadcrumbs), [Drilldown.breadcrumbs](https://api.highcharts.com/highmaps/drilldown.breadcrumbs), [Drill up button](https://api.highcharts.com/highmaps/drilldown.drillUpButton).

## Testoppsett

Navigasjonstesten ble gjort med samme kartoppsett som preloaded og async POC-ene.

Testoppsett:

| Del                 | Verdi                                  |
| ------------------- | -------------------------------------- |
| Parent level        | Fylke                                  |
| Child level         | Kommune                                |
| Parent point        | Rogaland                               |
| Parent map key      | `no-ro`                                |
| Child series        | `Rogaland kommuner`                    |
| Drill-up navigation | `drilldown.breadcrumbs`                |
| Testet med          | Preloaded drilldown og async drilldown |

I demo-oppsettet ble breadcrumbs lagt inn i `diagramOptions`:

```ts
drilldown: {
  breadcrumbs: {
    position: {
      align: 'left',
    },
  },
},
```

Det bør verifiseres at `diagramOptions.drilldown` blir kopiert videre til ferdig `Highcharts.Options`.

Dersom dette ikke skjer, bør breadcrumbs settes direkte i `OptionsService` når drilldown options bygges.

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

Testen kontrollerte:

- om breadcrumbs ble vist etter drilldown
- om brukeren kunne klikke på parent level i breadcrumb-stien
- om drill-up gikk tilbake til fylkeskartet
- om parent map ble vist riktig etter drill-up

## Testresultat

Breadcrumbs fungerte teknisk som drill-up navigation.

Brukeren kunne gå tilbake fra kommunenivå til fylkesnivå ved å klikke på parent level i breadcrumb-stien.

I testen ble breadcrumb-stien vist slik:

```text
Valgdeltagelse flere år / Rogaland kommuner
```

Ved å klikke på `Valgdeltagelse flere år` gikk kartet tilbake til parent level.

Testen viser at breadcrumbs fungerer teknisk, men at custom breadcrumb-options bør verifiseres videre.

Dette gjelder spesielt options som:

- `floating`
- `showFullPath`
- `format`
- `formatter`

Grunnen er at det må bekreftes at disse options faktisk blir sendt videre til final `Highcharts.Options`.

## Navigasjonsvalg

Breadcrumbs fungerer teknisk som drill-up navigation i kart-drilldown og bør brukes i første versjon.

`drillUpButton` bør ikke brukes som hovedløsning, siden Highcharts markerer den som deprecated og anbefaler breadcrumbs i stedet.

Tekst og visuell tydelighet bør vurderes videre dersom breadcrumb-teksten ikke er tydelig nok for brukeren.

Søkefelt bør ikke prioriteres i første versjon, siden drill-up fungerer med breadcrumbs.

Søkefelt kan vurderes senere dersom kommunenivået blir vanskelig å navigere.

---

# Anbefalt løsning

Basert på testene anbefales `async drilldown` med filtrert child map geometry.

### Hvorfor preloaded ikke anbefales som hovedløsning

Preloaded drilldown krever at child series ligger i `options.drilldown.series` før brukeren klikker [Highcharts Maps API: drilldown.series](https://api.highcharts.com/highmaps/drilldown.series).

Dette fungerte i testen, men løsningen passer dårligere dersom alle fylker skal ha egne kommune-series.

**Begrunnelse:**

- child data må være tilgjengelig før chartet bygges

- child map geometry må være tilgjengelig før chartet bygges

- `chart options` kan bli store dersom alle fylker og kommuner legges inn fra start

- Løsningen er mindre fleksibel dersom child data skal hentes eller bygges dynamisk

Preloaded drilldown bør derfor brukes som referanse og POC, **ikke som hovedløsning.**

### Hvorfor async drilldown passer bedre

Async drilldown lager child series først når brukeren klikker på et parent point.

Highcharts beskriver async drilldown som en løsning der child series lastes i `chart.events.drilldown` og legges til med `addSeriesAsDrilldown()`. [Highcharts API: chart.events.drilldown](https://api.highcharts.com/highcharts/chart.events.drilldown), [Highcharts API: addSeriesAsDrilldown](https://api.highcharts.com/class-reference/Highcharts.Chart#addSeriesAsDrilldown).

Dette passer bedre for fylke-til-kommune drilldown.

**Begrunnelse:**

- child series kan bygges ved klikk

- child data kan hentes eller bygges basert på valgt fylke

- child map geometry kan filtreres til valgt fylke

- `options.drilldown.series` trenger ikke å inneholde alle child series fra start

- Løsningen skalerer bedre dersom flere fylker skal støtte drilldown

I async-testen ble Rogaland brukt som parent point. Child map geometry ble filtrert slik at kommune-kartet bare inneholdt kommuner i Rogaland.

### Anbefalt teknisk løsning

Den videre løsningen bør bruke:

- `highcharts/modules/drilldown`

- `chart.events.drilldown`

- `addSeriesAsDrilldown()`

- filtrert child map geometry

- `drilldown.breadcrumbs` for drill-up navigation

### Krav til datastruktur

For at løsningen skal fungere generelt, må data kunne kobles mellom parent level og child level.

**Løsningen trenger:**

- stabil parent key, for eksempel `hc-key`

- child data for kommunenivå

- kommune-key som matcher child map geometry

- mapping mellom fylke og kommuner

- fallback dersom child data eller child geometry mangler

### Dersom datasettet bare har ett fylke

Automatisk drilldown kan vurderes dersom datasettet bare inneholder data for ett fylke.

Dette ble ikke testet i POC-ene, men er tatt med som en vurdering fordi oppgaven nevner dette som et scenario.

**Anbefaling for første versjon:**

- vis fylkeskartet som standard
- la brukeren selv klikke seg ned til kommunenivå
- behold breadcrumbs slik at brukeren kan gå tilbake til fylkesnivå
- vurder automatisk drilldown senere dersom brukertesting viser at det gir bedre flyt

Automatisk drilldown bør ikke være standard før det er testet med reelle data og brukere.

### Navigasjon

Navigasjon ble testet separat i breadcrumbs-seksjonen.

Basert på navigasjonstesten fungerer breadcrumbs som drill-up navigation og bør brukes videre i løsningen.

Highcharts beskriver `drilldown.breadcrumbs` som navigasjon tilbake gjennom drilldown-nivåer. `drillUpButton` bør ikke brukes som hovedløsning, fordi Highcharts markerer den som deprecated og anbefaler breadcrumbs i stedet.

Kilder:

- [Highcharts: Breadcrumbs](https://www.highcharts.com/docs/advanced-chart-features/breadcrumbs)
- [Highcharts Maps API: drilldown.breadcrumbs](https://api.highcharts.com/highmaps/drilldown.breadcrumbs)
- [Highcharts Maps API: drillUpButton](https://api.highcharts.com/highmaps/drilldown.drillUpButton)

Søkefelt bør ikke prioriteres i første versjon, siden drill-up fungerer med breadcrumbs. Det kan vurderes senere dersom kommunenivået blir vanskelig å navigere.

# Kilder

- [Highcharts Maps: Map drill down](https://www.highcharts.com/docs/maps/map-drill-down)
  Brukt for å forklare drilldown i kart, forskjellen mellom preloaded og async drilldown, samt generell navigasjon mellom nivåer.

- [Highcharts: Drilldown concept](https://www.highcharts.com/docs/chart-concepts/drilldown)
  Brukt for å forklare hvordan Highcharts håndterer drilldown, async drilldown og `addSeriesAsDrilldown()`.

- [Highcharts Maps API: drilldown](https://api.highcharts.com/highmaps/drilldown)
  Brukt som referanse for tilgjengelige drilldown-konfigurasjoner i Highcharts Maps.

- [Highcharts Maps API: drilldown.series](https://api.highcharts.com/highmaps/drilldown.series)
  Brukt for å forklare preloaded drilldown og hvordan `point.drilldown` kobles til `drilldown.series[].id`.

- [Highcharts API: chart.events.drilldown](https://api.highcharts.com/highcharts/chart.events.drilldown)
  Brukt for å forklare hvordan `chart.events.drilldown` brukes i async drilldown.

- [Highcharts Maps API: chart.events.drilldown](https://api.highcharts.com/highmaps/chart.events.drilldown)
  Brukt som Maps-spesifikk API-referanse for drilldown-events.

- [Highcharts API: Highcharts.Chart.addSeriesAsDrilldown()](https://api.highcharts.com/class-reference/Highcharts.Chart#addSeriesAsDrilldown)
  Brukt for å forklare hvordan child series legges til etter klikk på parent point.

- [Highcharts Maps API: series.map.joinBy](https://api.highcharts.com/highmaps/series.map.joinBy)
  Brukt for å forklare hvordan `joinBy: 'hc-key'` kobler map geometry sammen med data.

- [Highcharts Maps: Getting started](https://www.highcharts.com/docs/maps/getting-started)
  Brukt for å forklare map geometry, TopoJSON/GeoJSON og `mapData`.

- [Highcharts: Breadcrumbs](https://www.highcharts.com/docs/advanced-chart-features/breadcrumbs)
  Brukt for å forklare breadcrumbs som navigasjon tilbake etter drilldown.

- [Highcharts Maps API: drilldown.breadcrumbs](https://api.highcharts.com/highmaps/drilldown.breadcrumbs)
  Brukt for å dokumentere breadcrumbs-options som `position`, `floating`, `showFullPath`, `format` og `formatter`.

- [Highcharts Maps API: drilldown.drillUpButton](https://api.highcharts.com/highmaps/drilldown.drillUpButton)
  Brukt for å dokumentere at `drillUpButton` er deprecated og at `breadcrumbs` bør brukes i stedet.

- [Highcharts Maps API: mapView.fitToGeometry](https://api.highcharts.com/highmaps/mapView.fitToGeometry)
  Brukt for å forklare automatisk zoom og sentrering mot valgt geometri ved drilldown.

- [Highcharts API: MapView.fitToBounds](https://api.highcharts.com/class-reference/Highcharts.MapView#fitToBounds)
  Brukt som referanse for kartvisning, zoom og tilpasning til geografiske grenser.
- [Highcharts API: drilldown.breadcrumbs.showFullPath](https://api.highcharts.com/highcharts/drilldown.breadcrumbs.showFullPath)
  Brukt for å forklare at `showFullPath` bestemmer om breadcrumbs viser hele drilldown-stien eller bare én knapp.
