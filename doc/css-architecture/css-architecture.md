# How we (try to) systemize the CSS code

[This diagram](css-architecture.png) shows how we want the CSS code to be organized.
_NB! It doesn't look like this now: we have some refactoring to do before we get it the way we want it._

This following is the main take away from the diagram:

- Framework independent CSS
  - Bootstrap with "theming"
  - FHI Style
    - FHI variables
    - Typography/Icons
    - BEM-blocks
- Angular dependent CSS
  - FHI Angular style
    - NgBootstrap with "theming"
    - FHI Angular components

## When contributing

It's important to understand the overall structure of the projects CSS code, but when contributing you will most often add/update code in a small subset of this overall structure.

If you contribute to the "Framework independent CSS" this is where you go: https://github.com/folkehelseinstituttet/Fhi.Frontend.Style/tree/main/src/blocks

If you contribute to the "Angular dependent CSS" this is where you go: https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/tree/dev/projects/fhi-angular-components/src/styles
