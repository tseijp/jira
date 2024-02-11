import { renderTicket } from './renderTicket'
import { reduce } from '../../utils'
import { JIRATickets } from '../types'

export const renderColumn = (tasks: JIRATickets) => (column: string) => {
        let tickets = tasks.get(column)
        tickets = tickets?.filter((t) => !t.disable)
        if (!tickets) return ''
        const _ticket = reduce(tickets, renderTicket, '\n        ')
        return `
      <td class="jira_column" id="jira_column_${column}">${_ticket}
      </td>
`.trim()
}
