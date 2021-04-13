import { ReleaseEnum } from '../enums/commit-types.enums'

export interface CommitTypeDetails {
  description: string
  title: string
  release?: ReleaseEnum
}
