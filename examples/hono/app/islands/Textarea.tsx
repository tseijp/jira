import { $, use$$, useOnce } from './utils'
import createJIRABoard from '@tsei/jira'

interface Props {
        initialValue?: string
}

export default function ContentForm({ initialValue = '' }: Props) {
        const jira = useOnce(createJIRABoard)
        const parent = useOnce(() => $('#jira_root')?.parentElement)
        const id = use$$({
                input(e: Event) {
                        if (!parent) return
                        jira.markdown = (e.target as HTMLTextAreaElement).value
                        jira.convert(jira)
                        parent.innerHTML = jira.result
                },
        })

        return (
                <div>
                        <div>
                                <label htmlFor="content">Content</label>
                        </div>
                        <textarea id={id} rows={10} name="content">
                                {initialValue}
                        </textarea>
                </div>
        )
}
