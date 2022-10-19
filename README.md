# Fhi.Frontend.Demo

An Angular app with demos and documentation of CSS and Angular components with FHI-design. Visit
[https://designsystem.fhi.no](https://designsystem.fhi.no) to see it in action.

## Get started

>**NB!** If you clone the repository without the `--recurse-submodules` flag, the subdirectories named `Fhi.Frontend.Style` and `projects/fhi-frontend-angular-components` will be empty. If thats the case, you have to initialize the submodules and clone their content by running `git submodule update --init --recursive`

1. `git clone --recurse-submodules https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo.git`
2. `npm install`
3. `npm start`

## Workflow

_This is just one way to do it. Feel free to find a workflow that works for you._

1. Create a new branch in `Fhi.Frontend.Demo`-repo and a new branch in `Fhi.Frontend.Style`-repo with the same name
2. Work on both parent and submodule code, and commit changes in both repos
3. When ready
   1. Run `git push` in `Fhi.Frontend.Style`-repo
   2. Run `git push --recurse-submodules=check` in `Fhi.Frontend.Demo`-repo

For more info about git submodules see: [https://git-scm.com/book/en/v2/Git-Tools-Submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules)
