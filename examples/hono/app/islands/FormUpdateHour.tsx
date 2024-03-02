import { $, use$$, useOnce } from './utils'
import createJIRABoard from '@tsei/jira'

interface FormCreateHourProps {
        initialValue?: string
}

export const FormUpdateHour = ({ initialValue = '' }: FormCreateHourProps) => {
        const jira = useOnce(createJIRABoard)
        const parent = useOnce(() => $('#jira_root')?.parentElement)
        const formId = use$$({
                submit(e: Event) {
                        e.preventDefault()
                        const form = e.target as HTMLFormElement
                        const formData = new FormData(form)
                        const content = formData.get('content') as string
                        const title = formData.get('title') as string
                        console.log({ title, content })
                },
        })

        const textareaId = use$$({
                input(e: Event) {
                        if (!parent) return
                        jira.markdown = (e.target as HTMLTextAreaElement).value
                        jira.convert(jira)
                        parent.innerHTML = jira.result
                },
        })

        return (
                <form id={formId}>
                        <label htmlFor="content">Post Content</label>
                        <textarea id={textareaId} rows={10} name="content">
                                {initialValue}
                        </textarea>
                        <button type="submit">Create</button>
                </form>
        )
}
