import { JIRATicket } from '../types'

export const renderTicket = ({ task, order, detail }: JIRATicket) => {
        return detail
                ? `
        <table class="jira_ticket" id="jira_ticket_${order}">
          <tbody>
            <tr>
              <td valign="top" width="260px" height="100px">
                <details>
                  <summary>
${task}
                  </summary>
${detail}
                </details>
              </td>
            </tr>
          </tbody>
        </table>
      `.trim()
                : `
        <table class="jira_ticket">
          <tbody>
            <tr>
              <td valign="top" width="260px" height="100px">
${task}
              </td>
            </tr>
          </tbody>
        </table>
`.trim()
}
