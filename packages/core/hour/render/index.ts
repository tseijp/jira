import { renderColumn } from './renderColumn'
import { renderTitle } from './renderTitle'
import { reduce } from '../../utils'
import { JIRAHourState } from '../types'

export const render = (columns: string[], state: JIRAHourState) => {
        console.log({ ...state })
        return `
<table id="jira_root">
  <tbody>
    <tr align="center" width="1280px">${reduce(
            columns,
            renderTitle,
            '\n      '
    )}
      <td>
        Total
      </td>
    </tr>
    <tr align="center" valign="top">${reduce(
            columns,
            renderColumn(state),
            '\n      '
    )}
      <td>
        ${state.total! / 60} h
        (${state.duration! / 60}h - ${state.rest! / 60}h) <br />
      </td>
    </tr>
  </tbody>
</table>
`.trim()
}
