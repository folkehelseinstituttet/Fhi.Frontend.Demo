# Fhi.Frontend.Demo

An Angular app with demos and documentation of CSS and Angular components with FHI-design.
https://frontendbibliotek.fhi.no

## Get started

- `npm install`
- `npm run start`

## Working on Fhi.Frontend.Style

When working on the Fhi.Frontend.Style framework you can live reload the Fhi.Frontend.Demo by linking the two like this:

- Clone [Fhi.Frontend.Style](https://github.com/folkehelseinstituttet/Fhi.Frontend.Style)
- Fhi.Frontend.Style:
  - `npm install`
  - `npm link`
- Fhi.Frontend.Demo:
  - `npm install`
  - `npm link @folkehelseinstituttet/style` (dependency in package.json)
  - `npm run start`
