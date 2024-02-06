import { renderTicket } from './renderTicket'

export const renderColumn = (tasks) => (column) =>
        `
      <td class="jira_column">${reduce(
              tasks[column],
              renderTicket,
              '\n        '
      )}
      </td>
`.trim()
