export const renderTicket = ({ task, detail }) =>
        detail
                ? `
        <table class="jira_ticket">
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
