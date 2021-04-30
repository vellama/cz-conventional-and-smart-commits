import { ChoiceDetails } from 'types/choices.types'

export const ticketWorkflow: { [key: string]: ChoiceDetails } = {
  todo: {
    title: 'To Do',
    description:
      'The issue has been reported and is waiting for the team to action it.'
  },
  inProgress: {
    title: 'In Progress',
    description:
      'This issue is being actively worked on at the moment by the assignee.'
  },
  done: {
    title: 'Done',
    description: 'Work has finished on the issue.'
  },
  inReview: {
    title: 'En Review',
    description: 'This issue is ready for review'
  }
}
