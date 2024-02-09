import { reduce } from '../../utils'
import { JIRAHours } from '../types'

export const renderColumn = (hours: JIRAHours) => (column: string) => {
        const d = hours.get(column)
        if (!d) return ''

        return `
      <td class="jira_column" id="jira_column_${column}">
${d.first!?.from}
~
${d.last!?.to} <br />
${d.total! / 60} h
(${d.duration! / 60}h - ${d.rest! / 60}h) <br />
      </td>
`.trim()
}
