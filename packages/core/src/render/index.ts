import { renderColumn } from './renderColumn'
import { renderTitle } from './renderTitle'
import { reduce } from '../utils'

export const render = (columns, tasks) => {
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
            renderColumn(tasks),
            '\n      '
    )}
    </tr>
  </tbody>
</table>
`.trim()
}
