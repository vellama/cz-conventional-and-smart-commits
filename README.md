# [WIP] cz-conventional-and-smart

[![forthebadge](https://forthebadge.com/images/badges/made-with-typescript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-js.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/makes-people-smile.svg)](https://forthebadge.com)

[![npm version](https://badge.fury.io/typescript/cz-conventional-and-smart.svg)](https://www.npmjs.org/package/cz-conventional-and-smart)
[![npm](https://badgen.net/badge/icon/npm?icon=npm&label)](https://badgen.net/badge/icon/npm?icon=npm&label)
[![vscode](https://badgen.net/badge/icon/visualstudio?icon=visualstudio&label)](https://badgen.net/badge/icon/visualstudio?icon=visualstudio&label)

A commitizen adapter that handle both:

- convential change logs
- JIRA smart commits (workflow transition, time spent, comment)

## WIP

!!!! THIS IS STILL A WORK IN PROGRESS !!!!

## Installation

### Install with npm

```sh
npm i --save-exact --save-dev cz-conventional-and-smart
```

### Link to commitizen

Reference it through your .czrc or .cz.json file

```json
{
  "path": "node_modules/cz-conventional-and-smart-commits"
}
```

or use commitizen init

```sh
commitizen init cz-conventional-and-smart-commits
```

## Sources

- [commitizen/cz-cli](https://github.com/commitizen/cz-cli)
- [commitizen/cz-jira-smart-commit](https://github.com/commitizen/cz-jira-smart-commit)
- [pvdlg/conventional-changelog-metahub](https://github.com/pvdlg/conventional-changelog-metahub)
