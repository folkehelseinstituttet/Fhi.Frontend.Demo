# Fhi.Frontend.Demo

An Angular app with demos and documentation of CSS and Angular components with FHI-design.
https://frontendbibliotek.fhi.no

## Get started

- `git clone --recurse-submodules https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo.git`
- `npm install`
- `npm run start`

## Working on Fhi.Frontend.Style

**NB!** If you cloned the repository without the `--recurse-submodules` flag, the subdirectory named `Fhi.Frontend.Style` will be empty. To initialize the submodule and clone its content, run

- `git submodule update --init --recursive`

To get the latest updates from remote `Fhi.Frontend.Style`, run

- `git pull`
- `git submodule update --remote`

Git will go into your submodule and fetch and update for you.

### Workflow

_This is just one of many ways to do it._

1. Create a new branch in `Fhi.Frontend.Demo`-repo and a new branch in `Fhi.Frontend.Style`-repo with the same name
2. Work on both parent and submodule kode, and commit changes in both repos
3. When ready, push both brances from `Fhi.Frontend.Demo` with the command
  `git push --recurse-submodules=on-demand`

For more info about git submodules see: [https://git-scm.com/book/en/v2/Git-Tools-Submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules)
