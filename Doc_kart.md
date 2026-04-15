# Undersøkelse av drilldown-kart i FHI Angular Highcharts

## Bakgrunn

Denne oppgaven handler om å undersøke hvordan `drilldown` kan brukes i kart i Angular Highcharts, slik at brukeren kan gå fra et kart på overordnet nivå til en mer detaljert visning.

I dag støtter komponentet kartvisning på ett nivå. Målet med undersøkelsen er å finne ut hvordan en drilldown-løsning kan bygges, hvilke moduler fra Highcharts som trengs, om dagens datastruktur er god nok, og hvordan brukeren bør navigere i løsningen.

## Hvordan Highcharts håndterer drilldown i kart

Highcharts Maps støtter drilldown i kart på to hovedmåter:

### Preloaded drilldown

Child series legges inn på forhånd i `drilldown.series`. Et punkt i kartet kobles til riktig child series med et `drilldown`-id.

### Asynkron drilldown

Child data lastes først når brukeren klikker i kartet. Dette gjøres vanligvis med `chart.events.drilldown` sammen med `chart.addSeriesAsDrilldown()`.

I begge tilfeller må løsningen ha en tydelig kobling mellom punktet brukeren klikker på og kartet eller dataserien det skal drilles ned til. Highcharts støtter også navigasjon som `breadcrumbs` og drill-up.

## Nødvendige Highcharts-moduler

For å støtte drilldown i kart i Angular Highcharts er disse modulene sentrale:

- `highcharts/highmaps`  
  Brukes for kartvisning i løsningen.

- `highcharts/modules/drilldown`  
  Trengs for å støtte drilldown i kart, både med preloaded og asynkron løsning.

I dagens test er det `highcharts/modules/drilldown` som er den viktigste nye modulen som må registreres for å kunne begynne å teste drilldown-oppsett i kartet.

## Dagens løsning

Nåværende kode viser at kartløsningen er laget for visning på ett nivå.

`FhiAngularHighchartsComponent` har ansvar for å laste inn kart og oppdatere visningen.  
`OptionsService` bygger opp `Highcharts.Options` for kart og diagrammer.  
`TopoJsonService` henter `topojson`-filer og kobler innkommende datapunkter til riktig `hc-key`.

Løsningen ser ut til å støtte fylkeskart, men ikke flere kartnivåer i samme flyt.

Det finnes foreløpig ikke støtte for:

- flere geografiske nivåer i samme kart
- child series for drilldown
- kartfiler for neste nivå i drilldown-flyten
- navigasjon mellom nivåer i kartet

Dagens kobling mellom data og kart skjer også på litt ulik måte avhengig av karttype. For noen fylkeskart brukes `dataPointId`, mens andre kart bruker `name`. Dette er viktig fordi drilldown krever en stabil kobling mellom data, kartgeometri og nivåene i hierarkiet.

## Relevante filer

- `fhi-angular-highcharts.component.ts`  
  Registrerer Highcharts-moduler og styrer visning av kart og diagrammer.

- `options.service.ts`  
  Bygger opp `Highcharts.Options` og oppretter kartserier.

- `topo-json.service.ts`  
  Henter topojson og mapper datapunkter til kartgeometri.

- `fhi-diagram-serie-data.model.ts`  
  Viser hvordan datapunkter er bygget opp i dag.

- `options-maps.ts`  
  Inneholder standardinnstillinger for kartvisning.

## Test 1: Første tekniske test av drilldown-oppsett

### Formål

Den første testen ble gjort for å undersøke om dagens løsning tåler grunnleggende drilldown-oppsett uten at eksisterende kartvisning slutter å fungere.

Målet med testen var ikke å lage en ferdig drilldown-løsning, men å finne ut om det er mulig å begynne å koble på drilldown-logikk i komponentet.

### Hva som ble endret

#### 1. Drilldown-modul ble lagt til i komponenten

I `fhi-angular-highcharts.component.ts` ble drilldown-modulen lagt til sammen med de andre Highcharts-modulene som allerede brukes i prosjektet.

```ts
import HighchartsDrilldown from 'highcharts/modules/drilldown';
```

Modulen ble deretter registrert i konstruktøren.

```ts
HighchartsAccessibility(Highcharts);
HighchartsExporting(Highcharts);
HighchartsOfflineExporting(Highcharts);
HighchartsDrilldown(Highcharts);

HighchartsAccessibility(Highmaps);
HighchartsExporting(Highmaps);
HighchartsOfflineExporting(Highmaps);
HighchartsDrilldown(Highmaps);
```

Denne endringen ble gjort for å sikre at prosjektet har støtte for drilldown-funksjonalitet i Highcharts Maps.

#### 2. Det ble lagt til en egen metode for kartserie med drilldown-punkt

I `topo-json.service.ts` ble det lagt til en ny metode som bygger en kartserie der ett valgt område får et `drilldown`-id

```ts
getHighmapsSerieWithDrilldownPoint(
  serie: FhiDiagramSerie,
  clickableRegionName: string,
  drilldownId: string,
): SeriesMapOptions {
  const mapSerie: SeriesMapOptions = {
    data: serie.data
      .map((dataPoint) =>
        this.getMapSerieDataPointWithDrilldownPoint(dataPoint, clickableRegionName, drilldownId),
      )
      .filter((dataPoint) => dataPoint !== undefined) as SeriesMapOptions['data'],
    name: serie.name as string,
    type: 'map',
  };
  return mapSerie;
}
```

Det ble også lagt til en hjelpefunksjon som oppretter selve datapunktet med `drilldown`-felt.

```ts
private getMapSerieDataPointWithDrilldownPoint(
  dataPoint: FhiDiagramSerieData,
  clickableRegionName: string,
  drilldownId: string,
):
  | {
      'hc-key': string;
      value: number;
      name: string;
      drilldown?: string;
    }
  | undefined {
  const id = this.currentMapTypeId;
  const geometries = this.topoJsonMaps[id]['objects'].default.geometries;
  let geometry = undefined;

  switch (id) {
    case MapTypeIdValues.mapFylker:
      geometry = geometries.find(
        (geometry: object) =>
          dataPoint.dataPointId &&
          geometry['properties']['iso3166-2'] === `NO-${dataPoint.dataPointId}`,
      );
      break;
    case MapTypeIdValues.mapFylker2019:
    case MapTypeIdValues.mapFylker2023:
      geometry = geometries.find(
        (geometry: object) => geometry['properties'].name === dataPoint.name,
      );
      break;
    default:
      console.warn(
        `No supported map matches given mapTypeId: "${id}", can't get map serie data point!`,
      );
      return undefined;
  }

  if (geometry === undefined) {
    return undefined;
  }

  return {
    'hc-key': geometry['properties']['hc-key'],
    value: Number(dataPoint.y),
    name: geometry['properties'].name,
    drilldown: geometry['properties'].name === clickableRegionName ? drilldownId : undefined,
  };
}
```

Denne endringen ble gjort for å teste om et punkt i kartet kan forberedes som et klikkbart drilldown-punkt, uten å endre den eksisterende metoden som fortsatt brukes av vanlig kartvisning.

#### 3. options.service.ts ble oppdatert med et drilldown-oppsett

I `updateMapOptions()` ble det lagt til et oppsett for drilldown og `breadcrumbs.`

```ts
options.chart.map = this.diagramOptions.activeDiagramType;

const drilldownId = 'test-drilldown';
const clickableRegionName = 'Oslo';

options.drilldown = {
  breadcrumbs: {
    floating: true,
    position: {
      align: 'left',
    },
  },
};

options.series = [this.topoJsonService.getHighmapsSerieWithDrilldownPoint(options.series[0] as FhiDiagramSerie, clickableRegionName, drilldownId)];
```

Denne endringen ble gjort for å teste tre ting:

- Om `Options.drilldown` kan legges inn uten å bryte kartet
- Om `breadcrumbs` kan brukes som første navigasjonsvalg
- Om ett fylke kan få et `drilldown`-id i dataserien

## Resultat

Etter endringene rendrer kartet fortsatt som normalt. Løsningen krasjer ikke, og det oppstår ingen synlige feil ved visning av kartet.

Det er også mulig å legge inn et drilldown-id på ett punkt i kartserien. Dette viser at den nåværende løsningen tåler grunnleggende drilldown-oppsett, og at kartserien kan utvides med ekstra metadata for drilldown.

Det skjer likevel ingen synlig drilldown når man klikker i kartet. Dette er forventet på dette stadiet, fordi løsningen fortsatt mangler:

- kartfil for neste nivå
- child series som punktet kan drille ned til

Testen viser derfor at det er mulig å begynne å bygge støtte for drilldown i dagens Angular Highcharts-løsning uten å ødelegge eksisterende kartvisning. Samtidig viser testen at drilldown ikke kan valideres ferdig med dagens kartfiler alene.

### Begrensninger som ble funnet

Det ble funn at repoet per nå bare inneholder `topojson`-filer for fylker:

- `no-fylker-2019`
- `no-fylker-2023`
- `no-fylker-2024`

Det finnes ikke `topojson`-filer for kommuner per fylke i dagens mappe. Det betyr at en reell drilldown fra fylke til kommune ikke kan testes ferdig med dagens kartfiler alene.

### Vurdering av datastruktur

En ferdig drilldown-løsning vil sannsynligvis kreve:

- en tydelig kobling fra et punkt på toppnivå til neste nivå
- en stabil nøkkel som matcher både data og kartgeometri
- kartfiler for hvert nivå som skal støttes
- informasjon om hvilket nivå brukeren befinner seg på

Derfor må datastrukturen utvides, eller det må lages en tydeligere kobling mellom eksisterende data og nye kartfiler for drilldown-nivået.

### Vurdering av navigasjon

Det første navigasjonsvalget som er testet i oppsettet er breadcrumbs.

Dette ble valgt fordi:

- det støttes direkte av Highcharts
- det gir brukeren en enkel måte å gå tilbake på
- det passer naturlig i en drilldown-flyt mellom kartnivåer

Andre navigasjonsvalg, som egen drill-up-knapp eller automatisk drilldown når det bare finnes data for ett fylke, er ikke undersøkt ennå.
