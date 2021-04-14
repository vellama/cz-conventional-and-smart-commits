'format esm'
// @ts-ignore
import { configLoader } from 'commitizen'
import commitLintLoad from '@commitlint/load'

import { OptionsType } from './types/options.types'
import { commitTypes } from './data/commit-types.data'
import engine from './lib/engine'
import { ticketWorkflow } from './data/ticket-workflow.data'

const config = configLoader.load() || {}
const options: OptionsType = {
  types: config.types || commitTypes,
  ticketWorkflow: config.ticketWorkflow || ticketWorkflow,
  defaultType: process.env.CZ_TYPE || config.defaultType,
  defaultScope: process.env.CZ_SCOPE || config.defaultScope,
  defaultSubject: process.env.CZ_SUBJECT || config.defaultSubject,
  defaultBody: process.env.CZ_BODY || config.defaultBody,
  defaultIssues: process.env.CZ_ISSUES || config.defaultIssues,
  disableScopeLowerCase:
    process.env.DISABLE_SCOPE_LOWERCASE || config.disableScopeLowerCase,
  disableSubjectLowerCase:
    process.env.DISABLE_SUBJECT_LOWERCASE || config.disableSubjectLowerCase,
  maxHeaderWidth:
    (process.env.CZ_MAX_HEADER_WIDTH &&
      parseInt(process.env.CZ_MAX_HEADER_WIDTH)) ||
    config.maxHeaderWidth ||
    100,
  maxLineWidth:
    (process.env.CZ_MAX_LINE_WIDTH &&
      parseInt(process.env.CZ_MAX_LINE_WIDTH)) ||
    config.maxLineWidth ||
    100
}

;(function (options) {
  try {
    commitLintLoad().then((clConfig) => {
      if (clConfig.rules) {
        const maxHeaderLengthRule = clConfig.rules['header-max-length']
        if (
          typeof maxHeaderLengthRule === 'object' &&
          maxHeaderLengthRule.length >= 3 &&
          !process.env.CZ_MAX_HEADER_WIDTH &&
          !config.maxHeaderWidth &&
          maxHeaderLengthRule[2]
        ) {
          options.maxHeaderWidth = maxHeaderLengthRule[2]
        }
      }
    })
  } catch (err) {}
})(options)

export default engine(options)
