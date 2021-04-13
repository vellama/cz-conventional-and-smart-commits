export enum CommitTypeEnum {
  bugFixes = 'fix',
  builds = 'build',
  chores = 'chore',
  codeRefactoring = 'refactor',
  continuousIntegration = 'ci',
  dependencies = 'dependencies',
  documentation = 'docs',
  features = 'feat',
  initial = 'initial',
  formatting = 'style',
  metadata = 'metadata',
  performanceImprovements = 'perf',
  reverts = 'revert',
  tests = 'test'
}

export enum ReleaseEnum {
  major = 'major',
  minor = 'minor',
  patch = 'patch'
}
