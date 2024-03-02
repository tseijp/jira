import { useEffect } from 'react'
import FormCopyButton from './atoms/FormCopyButton'
import { useOnce } from './utils'
import createJIRABoard from '@tsei/jira'
import FormTextarea from './atoms/FormTextarea'
import FormSendButton from './atoms/FormSendButton'
import FormContainer from './atoms/FormContainer'
import BoardTarget from './atoms/BoardTarget'

interface BoardFormProps {
        initialValue?: string
}

const defaultInitialValue = `
# TODO

- [x] Fix bug

# In Progress

- [x] Implement feature

# Review

- [x] Review code

# Done

- [x] Merge PR
`.trim()

export default function BoardForm({
        initialValue = defaultInitialValue,
}: BoardFormProps) {
        const jira = useOnce(() => createJIRABoard())

        const handleSend = (e: Event) => {
                e.preventDefault()
                console.log(jira.markdown)
        }

        const handleChange = (e: Event) => {
                jira?.onChange(e)
                // reset height
                const height = (e.target as any).scrollHeight
                const style = (e.target as any).style as { height: string }
                style.height = 'auto'
                style.height = `${height}px`
        }

        useEffect(() => {
                jira.update(initialValue)
        }, [initialValue])

        return (
                <div
                        className="
                                flex
                                flex-col
                                w-full
                                max-w-3xl
                                mx-auto
                                bg-white
                                shadow-md
                                rounded-md
                                p-8
                                mt-4
                        "
                >
                        <FormContainer onSubmit={handleSend}>
                                <BoardTarget>
                                        <pre ref={jira?.ref} />
                                </BoardTarget>
                                <FormCopyButton onClick={jira?.onClick} />
                        </FormContainer>
                        <FormContainer onSubmit={handleSend}>
                                <FormTextarea
                                        onChange={handleChange}
                                        defaultValue={initialValue}
                                />
                                <FormSendButton />
                        </FormContainer>
                </div>
        )
}

// using hono/jsx
// export const FormCreateHour = ({ initialValue = '' }: FormCreateHourProps) => {
//         const jira = useOnce(createJIRABoard)
//         const parent = useOnce(() => {
//                 const el = $('#jira_root')?.parentElement
//                 jira.onMount(el!)
//                 return el
//         })
//         const id = use$$({
//                 input(e: Event) {
//                         if (!parent) return
//                         jira.markdown = (e.target as HTMLTextAreaElement).value
//                         jira.convert(jira)
//                         parent.innerHTML = jira.result
//                 },
//         })

//         return (
//                 <>
//                         <div id="jira_root"></div>
//                         <form>
//                                 <label htmlFor="content">Post Content</label>
//                                 <textarea id={id} rows={10} name="content">
//                                         {initialValue}
//                                 </textarea>
//                                 <button type="submit">Create</button>
//                         </form>
//                 </>
//         )
// }
