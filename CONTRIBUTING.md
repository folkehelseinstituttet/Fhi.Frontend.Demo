# Hvordan hjelpe til <!-- omit from toc -->

- [Spørsmål eller problemer](#spørsmål-eller-problemer)
  - [Før du oppretter et issue](#før-du-oppretter-et-issue)
  - [Issue listene](#issue-listene)
  - [Hvordan opprette et godt beskrevet issue](#hvordan-opprette-et-godt-beskrevet-issue)
  - [Godkjenning av issues](#godkjenning-av-issues)
- [Hvordan opprette en "pull request"](#hvordan-opprette-en-pull-request)
- [Kodestandard](#kodestandard)

## Spørsmål eller problemer

Er du ansatt i Folkehelseinstituttet og har generelle spørsmål, eller tilbakemeldinger kan du [kontakte oss på Teams](https://teams.microsoft.com/l/channel/19%3Aa0d23e5a6954497d9e378d3367e7f458%40thread.skype/General?groupId=571dd359-777d-4c02-85ea-d56854d03ef7).

### Før du oppretter et issue

- **NB!** Dette er det gamle designsystemet til FHI. Vedlikehold er begrenset til feilrettinger.
- Søk i issue-listene for de ulike pakkene for å forsikre deg om at det ikke alt finnes et issue som omhandler samme problem.
- Sjekk hvilken versjon av aktuell pakke som brukes i din applikasjon.

### Issue listene

- [@folkehelseinstituttet/style](https://github.com/folkehelseinstituttet/Fhi.Frontend.Style/issues?utf8=✓&q=is%3Aissue)
- [@folkehelseinstituttet/angular-components og @folkehelseinstituttet/angular-highcharts](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/issues?utf8=✓&q=is%3Aissue)

### Hvordan opprette et godt beskrevet issue

Vi har opprettet issue-templates, og bruker du den template-en som passer din forespørsel så finner du alt du trenger av informasjon for å opprette et et godt beskrevet issue.

### Godkjenning av issues

Når et issue opprettes vil det få taggen "Status: Unconfirmed". Denne blir byttet ut med taggen "Status: Confirmed" av en i designsystemteamet hvis issuet blir vurdert til at det skal løses. For å gjøre denne prosessen så enkel som mulig er det viktig at alle issue-er som opprettes er godt beskrevet!

## Hvordan opprette en "pull request"

1. Før du oppretter en PR, sørg for at det finnes et issue som omhandler det du skal jobbe med.
2. I høyrekolonnen på issuet, under *Development*, klikk på lenken *Create a branch*. På denne måten vil vår branch-navnestandard automatisk bli fulgt.
3. Opprett PR mot `dev` med en god beskrivelse av koden du ønsker å få med.

## Kodestandard

Linting og prettier tar hånd om det meste, men en ting er viktig å merke seg: all kode skal være på engelsk, bortsett fra domene-ord. For mer informasjon, se [Kodestandard Systemutvikling FHI](https://fhi.visualstudio.com/Fhi.Felles/_wiki/wikis/Fhi.Guidelines.Wiki/4892/kodestandard)  (krever tilgang til FHIs Azure DevOps).
