'format esm'

import wrap from 'word-wrap'
import chalk from 'chalk'
// @ts-ignore
import longest from 'longest'
import map from 'lodash/map'
import slugify from 'slugify'

import { OptionsType } from '../types/options.types'

const timeSpentRegex = /^(\d{1,2}d\s?)?(\d{1,2}h\s?)?(\d{1,2}m)?$/gi

const filter = function (array: Array<any>) {
  return array.filter(function (x) {
    return x
  })
}

const headerLength = function (answers: any) {
  return (
    answers.type.length + 2 + (answers.scope ? answers.scope.length + 2 : 0)
  )
}

const maxSummaryLength = function (options: OptionsType, answers: any) {
  return options.maxHeaderWidth - headerLength(answers)
}

const filterSubject = function (
  subject: string,
  disableSubjectLowerCase: boolean
) {
  subject = subject.trim()
  if (
    !disableSubjectLowerCase &&
    subject.charAt(0).toLowerCase() !== subject.charAt(0)
  ) {
    subject = subject.charAt(0).toLowerCase() + subject.slice(1, subject.length)
  }
  while (subject.endsWith('.')) {
    subject = subject.slice(0, subject.length - 1)
  }
  return subject
}

export default (options: OptionsType) => {
  const types = options.types
  const commitTypeChoicesLength = longest(Object.keys(types)).length + 1
  const commitTypeChoices = map(types, function (type, key) {
    return {
      name:
        (key + ':').padEnd(commitTypeChoicesLength) + ' ' + type.description,
      value: key
    }
  })

  const workflowChoices = options.ticketWorkflow
  const workflowChoicesLength = longest(Object.keys(workflowChoices)).length + 1
  const ticketWorkflowChoices = map(workflowChoices, function (status) {
    return {
      name:
        (status.title + ':').padEnd(workflowChoicesLength) +
        ' ' +
        status.description,
      value: status.title
    }
  })

  return {
    prompter: function (cz: any, commit: any) {
      cz.prompt([
        {
          type: 'list',
          name: 'type',
          message: "Select the type of change that you're committing:",
          choices: commitTypeChoices,
          default: options.defaultType
        },
        {
          type: 'input',
          name: 'scope',
          message:
            'What is the scope of this change (e.g. component or file name): (press enter to skip)',
          default: options.defaultScope,
          filter: function (value: string) {
            return options.disableScopeLowerCase
              ? value.trim()
              : value.trim().toLowerCase()
          }
        },
        {
          type: 'input',
          name: 'subject',
          message: function (answers: any) {
            return (
              'Write a short, imperative tense description of the change (max ' +
              maxSummaryLength(options, answers) +
              ' chars):\n'
            )
          },
          default: options.defaultSubject,
          validate: function (subject: string, answers: any) {
            const filteredSubject = filterSubject(
              subject,
              options.disableSubjectLowerCase
            )
            return filteredSubject.length === 0
              ? 'subject is required'
              : filteredSubject.length <= maxSummaryLength(options, answers)
                ? true
                : 'Subject length must be less than or equal to ' +
                maxSummaryLength(options, answers) +
                ' characters. Current length is ' +
                filteredSubject.length +
                ' characters.'
          },
          transformer: function (subject: string, answers: any) {
            const filteredSubject = filterSubject(
              subject,
              options.disableSubjectLowerCase
            )
            const color =
              filteredSubject.length <= maxSummaryLength(options, answers)
                ? chalk.green
                : chalk.red
            return color('(' + filteredSubject.length + ') ' + subject)
          },
          filter: function (subject: string) {
            return filterSubject(subject, options.disableSubjectLowerCase)
          }
        },
        {
          type: 'input',
          name: 'body',
          message:
            'Provide a longer description of the change: (press enter to skip)\n',
          default: options.defaultBody
        },
        {
          type: 'confirm',
          name: 'isBreaking',
          message: 'Are there any breaking changes?',
          default: false
        },
        {
          type: 'input',
          name: 'breakingBody',
          default: '-',
          message:
            'A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself:\n',
          when: function (answers: any) {
            return answers.isBreaking && !answers.body
          },
          validate: function (breakingBody: string) {
            return (
              breakingBody.trim().length > 0 ||
              'Body is required for BREAKING CHANGE'
            )
          }
        },
        {
          type: 'input',
          name: 'breaking',
          message: 'Describe the breaking changes:\n',
          when: function (answers: any) {
            return answers.isBreaking
          }
        },

        {
          type: 'confirm',
          name: 'isIssueAffected',
          message: 'Does this change affect any open issues?',
          default: options.defaultIssues
        },
        {
          type: 'input',
          name: 'issuesBody',
          default: '-',
          message:
            'If issues are closed, the commit requires a body. Please enter a longer description of the commit itself:\n',
          when: function (answers: any) {
            return (
              answers.isIssueAffected && !answers.body && !answers.breakingBody
            )
          }
        },
        {
          type: 'input',
          name: 'issues',
          message: 'Add issue references (e.g. "fix #123", "re #123".):\n',
          when: function (answers: any) {
            return answers.isIssueAffected
          },
          default: options.defaultIssues ? options.defaultIssues : undefined
        },
        {
          type: 'input',
          name: 'timeSpent',
          message: 'Add time spent for this commit (e.g. "1h 15m", "2d"):\n',
          validate: (input: string) => timeSpentRegex.test(input)
        },
        {
          type: 'confirm',
          name: 'shouldUpdateStatus',
          message: 'Should update ticket status ?',
          default: false
        },
        {
          type: 'list',
          name: 'ticketStatus',
          message: 'Update ticket status (optional):\n',
          choices: ticketWorkflowChoices,
          when: (answers: any) => answers.shouldUpdateStatus
        }
      ]).then(function (answers: any) {
        const wrapOptions = {
          trim: true,
          cut: false,
          newline: '\n',
          indent: '',
          width: options.maxLineWidth
        }

        // parentheses are only needed when a scope is present
        const scope = answers.scope ? '(' + answers.scope + ')' : ''

        // Hard limit this line in the validate
        const head = answers.type + scope + ': ' + answers.subject

        // Wrap these lines at options.maxLineWidth characters
        const body = answers.body ? wrap(answers.body, wrapOptions) : false

        // Apply breaking change prefix, removing it if already present
        let breaking = answers.breaking ? answers.breaking.trim() : ''
        breaking = breaking
          ? 'BREAKING CHANGE: ' + breaking.replace(/^BREAKING CHANGE: /, '')
          : ''
        breaking = breaking ? wrap(breaking, wrapOptions) : false

        const issues = answers.issues
          ? wrap(answers.issues, wrapOptions)
          : false

        const timeSpent = `#time ${answers.timeSpent.toLowerCase()}`
        const ticketStatus = answers.shouldUpdateStatus
          ? `#${slugify(answers.ticketStatus, {
              lower: true
            })}`
          : ''

        const smartCommitPayload = filter([ticketStatus, timeSpent]).join(' ')

        const commitPayload = filter([
          head,
          body,
          breaking,
          issues,
          smartCommitPayload
        ]).join('\n\n')

        commit(commitPayload)
      })
    }
  }
}
