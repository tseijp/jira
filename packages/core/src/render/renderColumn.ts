import { renderTicket } from './renderTicket'
import { reduce } from './../utils'

export const renderColumn = (tasks) => (column) =>
        `
      <td class="jira_column">${reduce(
              tasks[column],
              renderTicket,
              '\n        '
      )}
      </td>
`.trim()
