import { JIRAHourState } from '../types'

export const renderColumn = (state: JIRAHourState) => (column: string) => {
        const d = state.hours.get(column)
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
