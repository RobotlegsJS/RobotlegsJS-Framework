# Contributing to RobotlegsJS

The RobotlegsJS projects are all developed in the **RobotlegsJS-Framework** monorepo on GitHub:

[https://github.com/RobotlegsJS/RobotlegsJS-Framework](https://github.com/RobotlegsJS/RobotlegsJS-Framework)

## Setting up your machine

- **Node.js**: We recommend the latest LTS version, because non-stable NodeJS releases frequently have bugs. We recommend you to use [nvm](https://github.com/creationix/nvm) (for Mac/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows) (for Windows) so that you can easily switch between different [Node.js](https://nodejs.org/en/) engine versions.

- **PNPM**: We use [PNPM](https://pnpm.io) as the package manager. But you don't need to install it globally, rush installs its own local copy of the package manager to ensure that your build process is fully isolated from whatever tools are present in your local environment.

- **Visual Studio Code** (recommended): You can use any editor, but we suggest [VS Code](https://code.visualstudio.com). For this case, we recommend the installation of the [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) plugins as well.

## Building the projects

We use the [Rush](http://rushjs.io) tool for building projects in the **RobotlegsJS-Framework** monorepo.

1. Make sure you have the latest release of Rush:
```bash
npm install -g @microsoft/rush
```

2. Clone the repo:
```bash
git clone https://github.com/RobotlegsJS/RobotlegsJS-Framework.git
```

or (when using your SSH key)
```bash
git clone git@github.com:RobotlegsJS/RobotlegsJS-Framework.git
```

3. Use rush to install the package dependencies:
```bash
cd RobotlegsJS-Framework
rush install
```

4. Build all the projects in the repo:
```bash
rush build
```

Subsequent calls of `rush build` might be faster, since the project is using the [build cache](https://rushjs.io/pages/maintainer/build_cache) configuration.

5. Rebuild all the projects in the repo:
```bash
rush rebuild
```

6. If you want to build just one project:
```bash
cd RobotlegsJS-Framework\packages\core
rushx build
```

7. After implementing your changes, please run the following commands and have sure that they are still passing:
```bash
rush autoformat --verbose
rush rebuild --verbose
rush lint --verbose
rush test --verbose
```

**Important**: You generally should **not** use commands like `npm install` or `yarn install` in a Rush repo.
See the [Rush documentation](https://rushjs.io/pages/developer/new_developer/) for more information about this tool.

## Submitting a Pull Request

We welcome contributions! To submit a feature for one of the **RobotlegsJS** projects:

1. Fork the repo.

2. Create a Git branch and commit your changes.

3. If you modified any `package.json` files, run `rush update` to make sure your **shrinkwrap file** (or **lock file**) is up to date.
   This file is located in the following path: `common/config/rush/pnpm-lock.yaml`.
   Commit any changes made to that file.

4. Before creating your PR, run `rush change`; if prompted, [enter a changelog message](https://rushjs.io/pages/best_practices/change_logs/) and select the type of your change.
   
   The possible types of changes are: 
   - **MAJOR** - these are breaking changes that are not backwards compatible. Examples are: renaming a public class, adding/removing a non-optional parameter from a public API, or renaming an variable or function that is exported.
   - **MINOR** - these are changes that are backwards compatible (but not forwards compatible). Examples are: adding a new public API or adding an optional parameter to a public API.
   - **PATCH** - these are changes that are backwards and forwards compatible. Examples are: Modifying a private API or fixing a bug in the logic of how an existing API works.

   Later, remember to commit the files that get created.

5. Create a [pull request](https://help.github.com/articles/creating-a-pull-request/).

6. If your PR primarily affects a single project, add the project name as a prefix to your PR title.
   For example: "**[core] Added a new API feature**" or "**[pixi] Fixed a bug in the library**".

Someone should review your PR within a few days. If nobody’s responding to PR comments, try to send us one email to contact@robotlegsjs.io with the link of your PR.

We greatly appreciate community contributions and do want to get your PR reviewed!