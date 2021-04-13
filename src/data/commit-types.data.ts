import { CommitTypeEnum, ReleaseEnum } from '../enums/commit-types.enums'
import { CommitTypeDetails } from '../types/commit-types.types'

export const commitTypes: { [key in CommitTypeEnum]: CommitTypeDetails } = {
  build: {
    description:
      'Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)',
    title: 'Builds'
  },
  chore: {
    description: "Other changes that don't modify src or test files",
    title: 'Chores'
  },
  ci: {
    description:
      'Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)',
    title: 'Continuous Integrations',
    release: ReleaseEnum.patch
  },
  dependencies: {
    description: 'Update dependencies',
    title: 'Dependencies',
    release: ReleaseEnum.patch
  },
  docs: {
    description: 'Documentation only changes',
    title: 'Documentation',
    release: ReleaseEnum.patch
  },
  feat: {
    description: 'A new feature',
    title: 'Features',
    release: ReleaseEnum.minor
  },
  fix: {
    description: 'A bug Fix',
    title: 'Fix',
    release: ReleaseEnum.patch
  },
  initial: {
    description: 'Initial commit',
    title: 'Initial',
    release: ReleaseEnum.major
  },
  metadata: {
    description: 'Update metadata (package.json)',
    title: 'Metadata',
    release: ReleaseEnum.patch
  },
  perf: {
    description: 'A code change that improves performance',
    title: 'Performance Improvements',
    release: ReleaseEnum.patch
  },
  refactor: {
    description: 'A code change that neither fixes a bug nor adds a feature',
    title: 'Code Refactoring',
    release: ReleaseEnum.patch
  },
  revert: {
    description: 'Reverts a previous commit',
    title: 'Reverts'
  },
  style: {
    description:
      'Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
    title: 'Styles',
    release: ReleaseEnum.patch
  },
  test: {
    description: 'Adding missing tests or correcting existing tests',
    title: 'Tests',
    release: ReleaseEnum.patch
  }
}
