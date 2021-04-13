import { CommitTypeEnum } from '../enums/commit-types.enums'
import { CommitTypeDetails } from './commit-types.types'

export interface OptionsType {
  types: { [key in CommitTypeEnum]: CommitTypeDetails }
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
