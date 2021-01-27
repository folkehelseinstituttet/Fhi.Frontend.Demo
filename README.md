# Fhi.FrontendBibliotek.App

- [Komme i gang](#komme-i-gang)
- [Angular](#angular)
- [CSS](#css)
  - [SASS](#sass)
  - [BEM](#bem)
    - [Block, Element, Modifier](#block-element-modifier)
    - [Mer BEM-dokumentasjon](#mer-bem-dokumentasjon)
  - [FontAwewsome 5 (PRO)](#fontawewsome-5-pro)

---

## Komme i gang

1. Klon repo
2. NB! Legg inn **lisensnøkkel** til FontAwesome!
   - Legg til filen `./.npmrc` med følgende innhold:

      ```npmrc
      @fortawesome:registry=https://npm.fontawesome.com/
      //npm.fontawesome.com/:_authToken=[authToken]
      ```

      [authToken] kan en få ved å kontakte FHI, avdeling HDNS

3. `npm install`
4. `ng serve`

## Angular

Frontendbiblioteket bygges med Angular som js-rammeverk, og med "Bootstrap widgets" fra [ng-bootstrap](https://ng-bootstrap.github.io). Dette medfører at en del av komponentene i biblioteket ikke er agnostiske i forhold til hvilket js-rammeverk som benyttes, og er grunnen til at hovedmenyen i Frontendbiblioteket er delt opp i et "CSS-bibliotek" og et "Angular-bibliotek".

## CSS

### SASS

[SASS](http://sass-lang.com/) er valgt som CSS-preprosessor. SASS kan skrives med to ulike syntakser, og vi bruker [SCSS-syntaks](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#syntax). Det er den typen SASS som fungerer som en utvidelse, eller et superset, av CSS, og der all lovelig CSS-syntaks er lovelig SCSS. Filendelsen som viser at en bruker SCSS-syntaks er `.scss`.

### BEM

BEM er en navnekonvensjon av CSS-klasser som bidrar til å gjøre CSS-arkitektur lettere å lese i html-koden og samtidig gjør koden mer robust når det gjelder "lekkasje" av stiler nedover i DOM-treet. Det blir også lettere å vedlikeholde koden over tid. Vi bruker den versjonen av BEM som er dokumentert her: http://getbem.com, som er en lett modifisert versjon av originalspesifikasjonen til [Yandex](https://en.bem.info/methodology).

#### Block, Element, Modifier

BEM står for "Block", "Element", "Modifier", og kan forklares med følgende eksempel:

```css
.person {}
.person--female {}
.person__hand {}
.person__hand--left {}
```

**Block:** en logisk avgrenset del av UI, her eksemplifisert med klassen `person`.
**Element:** en blokks ev. underelementer, her eksemplifisert med klassen `person__hand`.
**Modifier:** en modifisert versjon av en blokk eller en blokks underelementer, her eksemplifisert med klassene `person--female` og `person__hand--left`.

I markup'en vil eksemplet se slik ut:

```html
<div class="person person--female">
  <div class="person__hand person__hand--left"></div>
</div>
```

#### Mer BEM-dokumentasjon

Se [dokumentasjonen på getbem.com](http://getbem.com/introduction) for en grundigere innføring.

---

### FontAwewsome 5 (PRO)

Frontendbiblioteket bruker ikoner fra FontAwesome.
Her er lenke til galleriet for tilgjengelige ikoner [https://fontawesome.com](https://fontawesome.com/icons?d=gallery)
