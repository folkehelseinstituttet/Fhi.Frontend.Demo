# How to contribute <!-- omit from toc -->

So you're thinking about contributing to **Fhi.Frontend.Demo**, and or its submodule? Great! Maintaining and enhancing **Fhi.Frontend.Demo** (and submodule) is a big job, so **the community's help is really appreciated.** Helping out isn't just writing code, it also includes submitting issues, helping confirm issues and improving the documentation.

- [Git submodule](#git-submodule)
- [Submitting Issues](#submitting-issues)
  - [Before you submit an issue](#before-you-submit-an-issue)
  - [Submitting a good issue](#submitting-a-good-issue)
  - [Confirming Issues](#confirming-issues)
- [Fixing Bugs and Adding Features](#fixing-bugs-and-adding-features)
  - [Workflows](#workflows)
    - [How to work on Fhi.Frontend.Style and Fhi.Frontend.Demo](#how-to-work-on-fhifrontendstyle-and-fhifrontenddemo)
      - [Icon set updates](#icon-set-updates)
    - [How to work on ./projects/fhi-\[project\] and Fhi.Frontend.Demo](#how-to-work-on-projectsfhi-project-and-fhifrontenddemo)
      - [How to do code scaffolding in an Angular library project](#how-to-do-code-scaffolding-in-an-angular-library-project)
  - [Pull request guidelines](#pull-request-guidelines)
    - [Fhi.Frontend.Style](#fhifrontendstyle)
      - [Feature branches](#feature-branches)
      - [Release branches](#release-branches)
    - [Fhi.Frontend.Demo, including library projects](#fhifrontenddemo-including-library-projects)
      - [Feature branches](#feature-branches-1)
      - [Release branches for library projects](#release-branches-for-library-projects)
      - [Release a patch to older version in a library project](#release-a-patch-to-older-version-in-a-library-project)
        - [After release is done](#after-release-is-done)
      - [Deploy branches for the documentation site](#deploy-branches-for-the-documentation-site)
- [Coding conventions](#coding-conventions)
  - [CSS/SASS](#csssass)
    - [CSS architecture](#css-architecture)
  - [HTML (Angular templates)](#html-angular-templates)
  - [TypeScript](#typescript)
- [Documentation](#documentation)
- [License](#license)

## Git submodule

There is a submodule in this repo:

- `./Fhi.Frontend.Style`, [Github repo Fhi.Frontend.Style](https://github.com/folkehelseinstituttet/Fhi.Frontend.Style)

The information in this file refers to this repo but also the submodule.

## Submitting Issues

Requests for new features and bug reports keep the project moving forward.

### Before you submit an issue

- Ensure you are running the latest version of Fhi.Frontend.Demo and its submodule.
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

*These are just examples. Feel free to find workflows that suites you.*
*For more info about git submodules see: [https://git-scm.com/book/en/v2/Git-Tools-Submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules)*

#### How to work on Fhi.Frontend.Style and Fhi.Frontend.Demo

1. Create a new branch in this repo (from `dev`), and a new branch with the same name in the git submodule `./Fhi.Frontend.Style` (from `main`).
2. Run `npm start`
3. Work on both parent and submodule code, and commit changes in both repos.
4. When ready
   1. Run `git push` in this repo
   2. Run `git push --recurse-submodules=check` in the submodule repo

##### Icon set updates

When making changes to the icon file set, run `npm run generate-icon-list`.

#### How to work on ./projects/fhi-[project] and Fhi.Frontend.Demo

1. Create a new branch in this repo (from `dev`)
2. Run `ng build @folkehelseinstituttet/[project] --watch`
3. In a new consol, run `npm start`
4. Work on both library and app code simultanously
5. When ready, run `git push` and follow the [pull request guidelines](#pull-request-guidelines)

##### How to do code scaffolding in an Angular library project

1. Run `ng generate module fhi-[name] --project @folkehelseinstituttet/[project]` to generate a new module
2. Add new module to `FhiAngularComponentsModule`
3. Run `ng generate component fhi-[name] --project @folkehelseinstituttet/[project]` to generate a new component
4. Add new component to `exports` in new module
5. Add both the new module and the new component to the public API Surface of fhi-angular-components

You can also use `ng generate directive|pipe|service|class|guard|interface|enum --project @folkehelseinstituttet/[project]`.
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

>**Before creating a release branch**
>
>- Check that the CHANGELOG.md is updated, and has "Unreleased" as latest version.
>
> If not; create a branch, fix, and create a new pull request.
>
>**If everything is OK; create a release branch**
>
>- When creating a release branch, follow the instructions below to the letter!

1. Create a new branch from `main`.
2. Name it `release/x.x.x`, where `x.x.x` is the version you're releasing.
3. Update CHANGELOG
   1. Change text `# Unreleased` to `# x.x.x` i CHANGELOG.md.
   2. Change the date below the version number to today.
   3. Check that all descriptions have a link to the PR at the end of the line.
4. Run `npm version [patch, minor, major]` to upgrade `package.json` and automatically create a new commit.
5. Push release branch and create pull request from release branch into main.
6. After approved review, squash and merge to main (deploy), delete the release branch for the previous release, but keep the latest release branch.

#### Fhi.Frontend.Demo, including library projects

*A library project is an Angular concept for organising code that are going to be made into a npm package. A library project is defined in `./angular.json`, and the files are located in `./projects/fhi-[project]`*

##### Feature branches

1. Create a new branch from `dev`.
2. Prefix your branch name with either `new/`, `enhancement/` or `bugfix/`.
3. Before pull request, remember to also push any changes made to the submodule `Fhi.Frontend.Style` so that the branch with changes are available to the reviewer.

##### Release branches for library projects

>**Before creating a release branch**
>
>- Check that all peerDependencies are updated
>- Check that `@folkehelseinstituttet/*` is already released if listed in peerDependencies
>- Check that the dependency matrix still is correct, and if it's updated since last release, that it has "Unreleased" as latest version.
>- Check that the CHANGELOG.md is updated, and has "Unreleased" as latest version.
>
> If one or more of the checks above is not OK; create a branch, fix, and create a new pull request.
>
>**If everything is OK; create a release branch**
>
>- When creating a release branch, follow the instructions below to the letter!

1. Create a new branch from `dev`.
2. Name it `release/fhi-[project]/x.x.x`, where `x.x.x` is the version you're releasing.
3. Update CHANGELOG
    1. Change text `# Unreleased` to `# x.x.x` i CHANGELOG.md.
    2. Change the date below the version number to today.
    3. Check that all descriptions have a link to the PR at the end of the line.
4. Update text `Unreleased` to `x.x.x` in the dependency matrix for the project: `./projects/fhi-[project]/README.md` (if a new line was added).
5. Update version in `./projects/fhi-[project]/package.json` to `x.x.x` manually.
    >*It's cumbersome to use `npm version` since `package.json` is in another directory than the git directory. And since there is no `package-lock.json`, and no need for a tag in the current workflow, doing it manually is faster. A better, and more automated, solution may come in the future.*
6. Create PR into `dev` from `release/fhi-[project]/x.x.x`, and when approved, make sure commit message is *Release/fhi-[project]/x.x.x*, and then merge (ie. deploy).

>*NB! Automated release job only runs if `Release/fhi-[project]/` is present in commit message since this isn't a release for everything in the repo, just a particular library.*

##### Release a patch to older version in a library project

Almost same procedure as described under [Release branches for library projects](#release-branches-for-library-projects), but there are some minor differences:

1. If it doesn't already exist, create a branch from `dev` called `fhi-[project]/vx`, where `X` is the major version you're patching.
2. Create a new branch from `fhi-[project]/vx`, and fix bug (remember ref. to correct git submodule).
3. Merge bugfix back to `fhi-[project]/vx`
4. Create a new branch from `fhi-[project]/vx`.
5. Name it `release/fhi-[project]/x.x.x`, where `x.x.x` is the version you're releasing.
6. Update CHANGELOG
   1. Change text `# Unreleased` to `# x.x.x` i CHANGELOG.md.
   2. Change the date below the version number to today.
   3. Check that all descriptions have a link to the PR at the end of the line.
7. Update text `Unreleased` to `x.x.x` in the dependency matrix for the project: `./projects/fhi-[project]/README.md` (if a new line was added).
8. Update version in `./projects/fhi-[project]/package.json` to `x.x.x` manually.
9. **NB! Also update `publishConfig.tag` to `v[x]` where `[x]` is the major version you're patching.**
10. Create PR into `fhi-[project]/vx` from `release/fhi-[project]/x.x.x`, and when approved, make sure commit message is *Release/fhi-[project]/x.x.x*, and then merge (ie. deploy).

###### After release is done

Create PR into `dev` from `release/fhi-[project]/x.x.x` to merge relevant changes from the patch back into `dev`, and when approved, make sure commit message is *Changes from patch @folkehelseinstituttet/angular-[project]/v/x.x.x*, and then merge and delete branch `release`.

>*NB! This PR will probably have conflicts, so just merge `dev` into `release` before creating PR, and fix conflicts. Ask someone if in doubt about any conflicts, but here are a few things to remember when merging:*
>
>1. **ALWAYS** merge changes to CHANGELOG (in chronological order based on date, not version), but change `# x.x.x` to `Unreleased`.
>2. Merge relevant changes to the code.
>3. **NEVER** merge any changes to `./projects/fhi-[project]/package.json`.
>4. Remember correct git submodule ref.

##### Deploy branches for the documentation site

>**Before creating a deploy branch**
>
>- Check that `package.json` is up to date with the latest versions of `@folkehelseinstituttet/style`.
>
>   *PS. The angular-packages are not listet in `package.json` since they are always latest, buildt from source, not downloaded from npm registry unless you run script `build-prod`*
>
> If not; create a branch, fix, and create a new pull request.
>
> **If everything is OK; create a release branch**
>
>- When creating a release branch, follow the instructions below to the letter!

1. Create a new branch from `main`, and call it `deploy/documentation-[yyy-mm-dd]`.
2. Merge `dev` into `deploy/documentation-[yyy-mm-dd]` and fix merge conflicts if any.
3. Create PR into `main` from `deploy/documentation-[yyy-mm-dd]`, and when approved, merge (ie. deploy).

## Coding conventions

### CSS/SASS

The project is using

1. SASS with the [SCSS syntax](https://sass-lang.com/documentation/syntax)
2. [BEM](./doc/bem-in-a-nutshell.md), but only in the folder `fhi/blocks`
3. And some custom rules

[SCSS example file](./doc/scss-example.md)

#### CSS architecture

[Read more about](./doc/css-architecture/css-architecture.md) how we (try to) organize the CSS code.

### HTML (Angular templates)

The project has also some custom rules for how we write markup:
[HTML example file](./doc/html-example.md)

### TypeScript

When it comes to TypeScript we adhere to [Angular coding style guide]([https://angular.io/guide/styleguide)
[TypeScript example file](./doc/typescript-example.md)

## Documentation

Great documentation is essential for any open source project and Fhi.Frontend.Demo is no exception. In addition to READMEs in the repos, [https://designsystem.fhi.no](https://designsystem.fhi.no/) is where we document our frontend library, but often we lag behind the features that have been implemented or would benefit from better examples, so help is really appreciated!

## License

Fhi.Frontend.Demo is under the [MIT license](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/blob/main/LICENSE). By contributing to Fhi.Frontend.Demo, you assert that:

- The contribution is your own original work.
- You have the right to assign the copyright for the work (it is not owned by your employer, or
  you have been given copyright assignment in writing).
