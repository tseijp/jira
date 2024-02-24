import createJIRABoard from '@tsei/jira'
import { Context } from 'hono'

export const title = 'Board'

export default function Page(c: Context) {
        const label = c.req.param('label')
        const jira = createJIRABoard()
        jira.label = label
        jira.markdown = `
# Todo
- [x] Task 0 #aaa
        - Detail 0
# In Progress
- [x] Task 1 #fff
        - Detail 1
# Review
- [x] Task 2 #aaa
        - Detail 2
# Done
- [x] Task 3 #fff
        - Detail 3
`

        jira.convert(jira)

        return (
                <div
                        id="jira_board"
                        dangerouslySetInnerHTML={{
                                __html: jira.result,
                        }}
                />
        )
}
