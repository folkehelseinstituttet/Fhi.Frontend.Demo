# How to contribute

So you're thinking about contributing to **Fhi.Frontend.Demo**, and or its submodules? Great! Maintaining and enhancing **Fhi.Frontend.Demo** (and all submodules) is a big job, so **the community's help is really appreciated.** Helping out isn't just writing code, it also includes submitting issues, helping confirm issues and improving the documentation.

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Git submodules](#git-submodules)
- [Submitting Issues](#submitting-issues)
  - [Before you submit an issue](#before-you-submit-an-issue)
  - [Submitting a good issue](#submitting-a-good-issue)
  - [Confirming Issues](#confirming-issues)
- [Fixing Bugs and Adding Features](#fixing-bugs-and-adding-features)
  - [Workflows](#workflows)
    - [How to work on Fhi.Frontend.Style and Fhi.Frontend.Demo](#how-to-work-on-fhifrontendstyle-and-fhifrontenddemo)
    - [How to work on ./projects/fhi-[project] and Fhi.Frontend.Demo](#how-to-work-on-projectsfhi-project-and-fhifrontenddemo)
      - [How to do code scaffolding in an Angular library project](#how-to-do-code-scaffolding-in-an-angular-library-project)
  - [Pull request guidelines](#pull-request-guidelines)
    - [Fhi.Frontend.Style](#fhifrontendstyle)
      - [Feature branches](#feature-branches)
      - [Release branches](#release-branches)
    - [Fhi.Frontend.Demo](#fhifrontenddemo)
      - [Feature branches](#feature-branches-1)
      - [Release branches for demo app](#release-branches-for-demo-app)
      - [Release branches for library projects](#release-branches-for-library-projects)
- [Coding conventions](#coding-conventions)
  - [SASS](#sass)
  - [BEM](#bem)
    - [BEM in a nutshell](#bem-in-a-nutshell)
- [Documentation](#documentation)
- [License](#license)

<!-- /code_chunk_output -->

## Git submodules

There is a submodule in this repo:

- `./Fhi.Frontend.Style`, [Github repo Fhi.Frontend.Style](https://github.com/folkehelseinstituttet/Fhi.Frontend.Style)

The information in this file refers to this repo but also the submodule.

## Submitting Issues

Requests for new features and bug reports keep the project moving forward.

### Before you submit an issue

- Ensure you are running the latest version of Fhi.Frontend.Demo and its submodules.
- **Search** the issue lists (including closed issues) to make sure it hasn't already been reported.
  - [Issue list Fhi.Frontend.Style](https://github.com/folkehelseinstituttet/Fhi.Frontend.Style/issues?utf8=✓&q=is%3Aissue)
  - [Issue list Fhi.Frontend.Demo](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/issues?utf8=✓&q=is%3Aissue)

### Submitting a good issue

- Give the issue a short, clear title that describes the bug or feature request
- Include steps to reproduce the issue
- If possible, include a short code example that reproduces the issue
- Use [markdown formatting](https://guides.github.com/features/mastering-markdown/) as appropriate to make the issue and code more readable.

### Confirming Issues

Before we work on issues, we must confirm them and be able to reproduce them. Confirming issues takes up a great deal of the team's time, so making that job easier is **really appreciated**.

Issues that need confirmation will have the **confirm** label or be unlabeled and have **no milestone**. You can help us to confirm issues by;

- Add steps to reproduce the issue
- Test issues and provide feedback

## Fixing Bugs and Adding Features

We love pull requests, but would prefer that new contributors start with smaller issues and let us know before you contribute to prevent duplication of work.

It is also a good idea to add a comment to an issue that you are working on to let everyone know. If you stop working on it, also please let us know.

### Workflows

_These are just examples. Feel free to find workflows that suites you._
_For more info about git submodules see: [https://git-scm.com/book/en/v2/Git-Tools-Submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules)_

#### How to work on Fhi.Frontend.Style and Fhi.Frontend.Demo

1. Create a new branch in this repo (from `dev`), and a new branch with the same name in the git submodule `./Fhi.Frontend.Style` (from `main`).
2. Run `npm start`
3. Work on both parent and submodule code, and commit changes in both repos.
4. When ready
   1. Run `git push` in this repo
   2. Run `git push --recurse-submodules=check` in the submodule repo

#### How to work on ./projects/fhi-[project] and Fhi.Frontend.Demo

1. Create a new branch in this repo (from `dev`)
2. Run `ng build @folkehelseinstituttet/fhi-[project] --watch`
3. In a new consol, run `npm start`
4. Work on both library and app code simultanously
5. When ready, run `git push` and follow the [pull request guidelines](#pull-request-guidelines)

##### How to do code scaffolding in an Angular library project

Run `ng generate component component-name --project @folkehelseinstituttet/[project]` to generate a new component.
You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project @folkehelseinstituttet/[project]`.
> Note: Don't forget to add option `--project` or else it will be added to the default project in your `angular.json` file.

### Pull request guidelines

#### Fhi.Frontend.Style

##### Feature branches

1. Create a new branch from `main`.
2. Prefix your branch name with either `new/`, `enhancement/` or `bugfix/`.
3. Before pull request, remember to update `CHANGELOG.md`, and if this is the first pull request after a release, add an extra hash to the existing "version number heading", add a new heading called `# Unreleased`, a date, and then list your changes.
4. Push feature branch, create pull request with a good name, and a comment if necessary
5. After approved review, squash and merge to `main`, and delete your feature branch.

##### Release branches

1. Create a new branch from `main`.
2. Name it `release/x.x.x`, where `x.x.x` is the version you're releasing.
3. Change text `# Unreleased` to `# x.x.x` i `CHANGELOG.md`
4. Run `npm version [patch, minor, major]` to upgrade `package.json` and automatically create a new commit.
5. Push release branch and create pull request
6. After approved review, squash and merge to `main` (deploy), delete the release branch for the previous release, but keep the latest release branch.

#### Fhi.Frontend.Demo

##### Feature branches

1. Create a new branch from `dev`.
2. Prefix your branch name with either `new/`, `enhancement/` or `bugfix/`.
3. Before pull request, remember to merge any changes made to submodules into branch `demo` in the submodule repo.

##### Release branches for demo app

Currently no need for release branch, we just merge `dev` into `main` when we release a new version of the app.

##### Release branches for library projects

A library project is defined in `./angular.json` and the files are located in `./projects/fhi-[project]`

1. Create a new branch from `dev`.
2. Name it `release-fhi-[project]/x.x.x`, where `x.x.x` is the version you're releasing.
    > _NB! Important to add `-fhi-[project]` in branch name since this isn't a release for everything in the repo, just a particular library._
3. Change text `# Unreleased` to `# x.x.x` i `./projects/fhi-[project]/CHANGELOG.md`
4. Change version in `./projects/fhi-[project]/package.json` to `x.x.x` manually.
    >_It's cumbersome to use `npm version` since `package.json` is in another directory than the git directorey. And since there is no `package-lock.json` and no need for an tag in the workflow as it is pr. now, doing it manually is faster. A better, and more automated, solution may come in the near future :smile:_
5. Push release branch and create pull request
6. After approved review, squash and merge to `main` (deploy), delete the release branch for the previous release, but keep the latest release branch.

## Coding conventions

### SASS

This project is using [SCSS syntax](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#syntax).

### BEM

This project is using BEM syntax, but only in the folder `style/blocks`

#### BEM in a nutshell

```css
.person {}
.person--female {}
.person__hand {}
.person__hand--left {}
```

```html
<div class="person person--female">
  <div class="person__hand person__hand--left"></div>
</div>
```

More info about BEM: [getbem.com](http://getbem.com/introduction)

## Documentation

Great documentation is essential for any open source project and Fhi.Frontend.Demo is no exception. In addition to READMEs in the repos, [https://designsystem.fhi.no](https://designsystem.fhi.no/) is where we document our frontend library, but often we lag behind the features that have been implemented or would benefit from better examples, so help is really appreciated!

## License

Fhi.Frontend.Demo is under the [MIT license](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/blob/main/LICENSE). By contributing to Fhi.Frontend.Demo, you assert that:

- The contribution is your own original work.
- You have the right to assign the copyright for the work (it is not owned by your employer, or
  you have been given copyright assignment in writing).
