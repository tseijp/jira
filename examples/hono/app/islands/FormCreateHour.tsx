import { $, use$$, useOnce } from './utils'
import createJIRABoard from '@tsei/jira'

interface FormCreateHourProps {
        initialValue?: string
}

export const FormCreateHour = ({ initialValue = '' }: FormCreateHourProps) => {
        const jira = useOnce(createJIRABoard)
        const parent = useOnce(() => {
                const el = $('#jira_root')?.parentElement
                jira.onMount(el!)
                return el
        })
        const id = use$$({
                input(e: Event) {
                        if (!parent) return
                        jira.markdown = (e.target as HTMLTextAreaElement).value
                        jira.convert(jira)
                        parent.innerHTML = jira.result
                },
        })

        return (
                <>
                        <div id="jira_root"></div>
                        <form>
                                <label htmlFor="content">Post Content</label>
                                <textarea id={id} rows={10} name="content">
                                        {initialValue}
                                </textarea>
                                <button type="submit">Create</button>
                        </form>
                </>
        )
}
