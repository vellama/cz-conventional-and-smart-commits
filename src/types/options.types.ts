import { CommitTypeEnum } from '../enums/commit-types.enums'
import { ChoiceDetails } from './choices.types'
import { CommitTypeDetails } from './commit-types.types'

export interface OptionsType {
  types: { [key in CommitTypeEnum]: CommitTypeDetails }
  ticketWorkflow: { [key: string]: ChoiceDetails }
  defaultType: CommitTypeEnum
  defaultScope: string
  defaultSubject: string
  defaultBody: string
  defaultIssues: string[]
  disableScopeLowerCase: boolean
  disableSubjectLowerCase: boolean
  maxHeaderWidth: number
  maxLineWidth: number
}
