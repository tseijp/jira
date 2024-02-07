import { renderTicket } from './renderTicket'
import { reduce } from '../../utils'
import { JIRATickets } from '../types'

export const renderColumn = (tasks: JIRATickets) => (column: string) => {
        const tickets = tasks.get(column)
        if (!tickets) return ''
        const _ticket = reduce(tickets, renderTicket, '\n        ')
        return `
      <td class="jira_column" id="jira_column_${column}">${_ticket}
      </td>
`.trim()
}
