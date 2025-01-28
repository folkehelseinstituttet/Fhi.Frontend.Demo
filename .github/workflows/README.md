# Release guides <!-- omit from toc -->

- [Deploy branch for the documentation site](#deploy-branch-for-the-documentation-site)
- [@folkehelseinstituttet/style](#folkehelseinstituttetstyle)
- [@folkehelseinstituttet/angular-components](#folkehelseinstituttetangular-components)
  - [Release a patch to older version](#release-a-patch-to-older-version)
  - [After patch is released](#after-patch-is-released)
- [@folkehelseinstituttet/angular-highcharts](#folkehelseinstituttetangular-highcharts)

## Deploy branch for the documentation site

> [!WARNING]
>**Before creating a deploy branch**
>
>- Check that `package.json` is up to date with the latest versions of `@folkehelseinstituttet/style`.
>
>   *PS. The Angular-packages are not listet in `package.json` because they are always buildt from source, and therefore always either latest version or "Unreleased". They are not downloaded from the NPM registry unless you run script `build-prod`*  
>  
>   If not; create a branch, fix, and create a new pull request.
>
> **If everything is OK; create a release branch**
>
>- When creating a release branch, follow the instructions below to the letter!

1. Create a new branch from `main`, and call it `deploy/documentation-[yyy-mm-dd]`.
2. Merge `dev` into `deploy/documentation-[yyy-mm-dd]` and fix merge conflicts if any.
3. Create PR into `main` from `deploy/documentation-[yyy-mm-dd]`, and when approved, merge (ie. deploy).

## [@folkehelseinstituttet/style](https://www.npmjs.com/package/@folkehelseinstituttet/style)

> [!WARNING]
>**Before creating a release branch**
>
>- Check that the CHANGELOG.md is updated, and has "Unreleased" as latest version.  
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

## [@folkehelseinstituttet/angular-components](https://www.npmjs.com/package/@folkehelseinstituttet/angular-components)

> [!WARNING]
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

> [!NOTE]
>NB! Automated release job only runs if `Release/fhi-[project]/` is present in commit message since this isn't a release for everything in the repo, just a particular library.

### Release a patch to older version

Almost same procedure as described under [@folkehelseinstituttet/angular-components](#folkehelseinstituttetangular-components), but there are some minor differences:

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

### After patch is released

Create PR into `dev` from `release/fhi-[project]/x.x.x` to merge relevant changes from the patch back into `dev`, and when approved, make sure commit message is `Changes from patch @folkehelseinstituttet/angular-[project]/v/x.x.x`, and then merge and delete branch `release`.

> [!WARNING]
> This PR will probably have conflicts, so just merge `dev` into `release` before creating PR, and fix conflicts. Ask someone if in doubt about any conflicts, but here are a few things to remember when merging:
>
>1. **ALWAYS** merge changes to CHANGELOG, in chronological order based on date, not version, but change `# x.x.x` to `Unreleased`.
>2. Merge relevant changes to the code.
>3. **NEVER** merge any changes to `./projects/fhi-[project]/package.json`.
>4. Remember correct git submodule ref.

## [@folkehelseinstituttet/angular-highcharts](https://www.npmjs.com/package/@folkehelseinstituttet/angular-highcharts)

Same as: [@folkehelseinstituttet/angular-components](#folkehelseinstituttetangular-components)
