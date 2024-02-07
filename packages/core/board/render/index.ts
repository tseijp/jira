import { renderColumn } from './renderColumn'
import { renderTitle } from './renderTitle'
import { reduce } from '../../utils'
import { JIRATickets } from '../types'

export const render = (columns: string[], tickets: JIRATickets) => {
        return `
<table id="jira_root">
  <tbody>
    <tr align="center" width="1280px">${reduce(
            columns,
            renderTitle,
            '\n      '
    )}
    </tr>
    <tr align="center" valign="top">${reduce(
            columns,
            renderColumn(tickets),
            '\n      '
    )}
    </tr>
  </tbody>
</table>
`.trim()
}
