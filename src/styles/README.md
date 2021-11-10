# Organisering av css-filer i mappen "styles"

- [bootstrap](#bootstrap)
- [fhi-common](#fhi-common)
  - [komponenter](#komponenter)
  - [sidemaler](#sidemaler)
  - [_variables.[navn].scss](#_variablesnavnscss)
- [fhi-[prosjektnavn]](#fhi-prosjektnavn)
- [ng-bootstrap](#ng-bootstrap)

## bootstrap

Her ligger kun css som modifiserer Bootstrap.

## fhi-common

Her ligger alt av css som er felles for alle prosjekter som bruker Fhi.FrontendBibliotek. Koden som ligger her er enten helt custom, eller den er modifiseringer av 3. parts css.

### komponenter

Komponenter er selvstendige designelementer på samme måte som [Bootstrap components](https://getbootstrap.com/docs/4.0/components). Hver komponent vil også være en selvstendig BEM-block.

### sidemaler

Sidemaler er wrapper-komponenter som fylles med et sett med komponenter for å fremstille en ferdig side. Hver sidemal vil også være en selvstendig BEM-block.

### _variables.[navn].scss

 Både Bootstrap-variabler og custom FHI-variabler.
 
 Bootstrap-variabler er definert med !default, så de kan gis ny verdi
 i denne filen. Denne filen blir importert før Bootstrap-rammeverket
 slik at disse variabelverdiene fungerer som en konfigurasjon.
 Oversikt over mulige Bootstrap-variabler som kan gis ny verdi, eller se:
 https://github.com/twbs/bootstrap/blob/v4.1.3/scss/_variables.scss
 (Se package.json for riktig versjonsnummer for Bootstrap.)
 For å finne ut om en variabel i denne filen er en Bootstrap-variabel er
 det bare å søke etter den i filen nevnt over.

## fhi-[prosjektnavn]

Her ligger alt av css som er kun brukes av gjeldende prosjekt. Koden som ligger her er enten helt custom, eller den modifiserer css som ligger i `fhi-common`.

## ng-bootstrap

Her ligger kun css som modifiserer NgBootstrap.
