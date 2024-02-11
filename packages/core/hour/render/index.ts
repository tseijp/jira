import { renderColumn } from './renderColumn'
import { renderTitle } from './renderTitle'
import { reduce } from '../../utils'
import { JIRAHourState } from '../types'

export const render = (columns: string[], state: JIRAHourState) => {
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
            renderColumn(state),
            '\n      '
    )}
    </tr>
  </tbody>
</table>
`.trim()
}
