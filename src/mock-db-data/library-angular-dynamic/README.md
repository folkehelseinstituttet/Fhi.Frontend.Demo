# Delte komponenter

## Hvordan lage ny angular komponent

I denne seksjonen beskrives fremgangsmåten for hvordan en kan vise frem en generert angular-komponent i biblioteket. Logikken for visningen fungerer slik at etter man har laget komponenten (steg 1), lager en et objekt som ligger i en liste `LibraryExample[]` (steg 2). Her knytter en opp _referanse_ til angular-komponenten. Referansen her er navnet på angular-komponenten og hvilken mappe komponenten ligger i. Siden `LibraryExample`'s lagres i en MockDB (steg 3), kan vi finne ut hvilken komponent vi skal dynamisk rendere siden vi har navn på klassen og hvilken mappe komponenten ligger i. For å kunne dynamisk rendere en komponent må vi ha typen til komponenten. Typen finner vi ved å lage oppslag fra navnet på komponenten til hvilken type (steg 4).

1. For å lage en ny angular-komponent, må en generere ny komponent i mappen `angular-components`. Denne finnes i filstrukturen: _"src/app/library-angular/default-examples/_`angular-components`_"_. Det er vikitg at en ikke flater ut komponenten, men at ny komponent ligger isolert i egen mappe. Dette er standard oppførsel når en bruker angular CLI for generering av ny komponent.


2. Etter komponenten er generert, må en lage en ny _LibraryExample_. Dette gjøres ved å opprette ny typescript-fil i mappen _"src/mock-db-data/library-angular/_`delte-komponenter`. Navn på fila følger konvensjonen `<navn-på-komponent>.component.ts`. Filen skal ha templaten som vist under og en må legge inn verdiene som gjelder for den nye komponenten. Navnet på det nye eksemplet skal være på formen: `<NavnPåKomponent>LibraryExample` som vist i eksempelet under.
    ```ts
    // navn-på-komponent.component.ts
    import { LibraryExample } from 'src/app/shared/models/library-example.model';

    export const NavnPåKomponentLibraryExample: LibraryExample[] = [{
        title: "",                      // Viser tittel på komponent-eksempelet
        exampleHtml: "",                // Denne skal ikke fylles ut da html hentes automatisk
        exampleTypeScript: "",          // Denne skal ikke fylles ut da typescript hentes automatisk
        exampleMarkdown: "",            // Denne skal ikke fylles ut siden typescript hentes
        angularComponentClassName: "",  // Denne må være identisk til klassenavnet til angular komponenten
        componentFolder: ""             // Navnet på mappen hvor komponenten ligger under
    }];

    ```
3. Neste steg er å legge inn det nye komponenteksempelet i filen `angular-delte-komponenter.data.ts`. Dette gjøres ved å importere eksempelet og legge den i lista med _spread_ operator (...), slik som vises i eksempelet under:
    ```ts
        //angular-delte-komponenter.data.ts
        import { LibraryExample } from 'src/app/shared/models/library-example.model';
        import { HelloWorldLibraryComponent } from './delte-komponenter/hello-world.component';
        import { NavnPåKomponentLibraryExample } from './delte-komponenter/navn-på-komponent.component.ts';

        export const AngularSharedComponentsData: LibraryExample[] = [
            ...HelloWorldLibraryComponent,
            ...NavnPåKomponentLibraryExample
        ];
    ```
4. Siste steg er å mappe angular-komponent-_typen_, til navnet på klassen som en skrev i feltet `angularComponentClassName` i steg 2. Mappingen skrives i filen `library-angular-components.ts` som finnes i: _"src/app/library-angular/konstanter/library-angular-components.ts"_. Under viser et eksempel på hvordan det skal gjøres:
    ```ts
    // library-angular-components.ts
    import { Type } from '@angular/core';
    import { HelloWorldComponent } from '../default-examples/angular-components/hello-world/hello-world.component';
    import { HelloWorldComponent } from '../default-examples/angular-components/navn-på-komponent/navn-på-komponent.component';

    export const AngularComponents: {[ClassName: string]: Type<any>} = {
        "HelloWorldComponent": HelloWorldComponent,
        "NavnPåKomponent": NavnPåKomponent
        // Sett inn nye komponenter her.
    }
    ```
## Konfigurasjon: Dynamisk lasting av angular-komponent

Denne seksjonen beskriver hvordan konfigurasjonen for dynamsik lasting av angular komponenter er satt opp og hvordan denne påvirker visnignen i biblioteket.

### Kopi av html og typescript under bygg
For at en kan vise html og typescript sammen med komponenten i biblioteket, har en eksplisitt kopiert disse filene under bygg. Dette kan man spesifisere i filen `angular.json`, men dette fungerer kun når en bygger til produksjon. For at kopiering av filer skal fungere lokalt, når man kjører devserver, har en laget en fil `custom-webpack.config.js`, for at kopiering skal fungere både lokalt og for produksjon. I denne filen spesifiseres hvilke filer/mapper som skal kopieres og hvor den skal kopieres til.
Per i dag kopierer vi filer fra angular-komponentene som vi har i en spesifikk mappe og assets (dette for at assets skal komme med på devserver). Siden den nye konfigen overskrider eventuell kopiering må dette også settes her. Gjeldende konfig er følgende:
```js
/** 
 * Plugin for å kopiere FHI-angularkomponenter til dist mappen. Dette for å vise implementasjonen for html og ts filene.
 * Plugin ble laget da denne fungerer for ng serve (webpack-devserver) også.
*/
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: "src/app/library-angular/default-examples/angular-components", to: "angular-components"},
                { from: "src/assets", to: "assets"}
            ]
        }),
    ]
}
```

==*Hvis en ønsker å flytte mappen hvor angular-komponentene ligger, må en sette ny path.==

For å kjøre egendefinerte konfigurasjonen har en endret innstillingen i angular.json til:
```json
"architect": {
    "build": {
        // Peker på ny prod build
        "builder": "@angular-builders/custom-webpack:browser", 
        //Lagt til egendefinert option
        "options": {
            "customWebpackConfig": {
                "path": "./custom-webpack.config.js",
                "replaceDuplicatePlugins": true
            }
        //...
        }
    //...
    },
    "serve": {
        // peker på ny dev build
        "builder": "@angular-builders/custom-webpack:dev-server"
    }
//...
}
```
De nye byggene har avhengigheter til npm-pakkene:
- @angular-builders/custom-webpack
- @angular-builders/dev-server
- copy-webpack-plugin

### Kopi av html og typescript ved runtime
For å vise html og typescript når applikasjonen kjører, er det laget en egen service `default-examples-data.service.ts` som henter ut filene gitt navn på mappen komponenten ligger i. Dette betyr at _hvor_ denne mappen igjen befinner seg, defineres i `environments.*.ts` i variabelen `fhiAngularComponentsRootFolder`. Verdien på `fhiAngularComponentsRootFolder` må samsvare med output mappen i `custom-webpack.config.js`. På denne måten vet servicen i hvilken mappe alle komponentene som er kopiert ligger, men selve mappen til en gitt komponent, spesifiseres gjennom parameter til metoden.

==*Hvis en har endret verdien til hvor angular-komponentene skal kopieres til i **custom-webpack.config.js**, må denne verdien settes lik i variabelen **fhiAngularComponentsRootFolder**.==
