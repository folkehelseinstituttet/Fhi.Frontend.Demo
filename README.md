# Fhi.Frontend.Demo

An Angular app with demos and documentation of CSS and Angular components with FHI-design.
https://frontendbibliotek.fhi.no

## Get started

- `git clone --recurse-submodules https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo.git`
- `npm install`
- `npm run start`

## Working on Fhi.Frontend.Style

If you cloned the repository with the `--recurse-submodules` flag, you already have a subdirectory named `Fhi.Frontend.Style` with all the css code present. If not, you have a empty subdirectory named `Fhi.Frontend.Style`. To initialize the submodule and clone its content, type: `git submodule update --init --recursive`

To get the latest updated from `Fhi.Frontend.Style`, run`git pull` and `git submodule update --remote`. Git will go into your submodule and fetch and update for you.

It is now possible to work on a new branch in the submodule repo (Fhi.Frontend.Style), commit and push to remote, and then push a new commit, on a new branch in the parent repo (Fhi.Frontend.Demo) so that other developers has access to both. For more advanced use of git submodules see: [https://git-scm.com/book/en/v2/Git-Tools-Submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules)
