import createJIRABoard from '@tsei/jira'
import Textarea from '../../../islands/Textarea'

export const title = 'Board'

export default function Page() {
        const jira = createJIRABoard()
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
`.trim()

        jira.convert(jira)

        return (
                <>
                        <div
                                dangerouslySetInnerHTML={{
                                        __html: jira.result,
                                }}
                        />
                        <Textarea initialValue={jira.markdown} />
                </>
        )
}
