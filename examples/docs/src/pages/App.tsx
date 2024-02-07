import { useEffect } from 'react'
import useJIRABoard from '../../../../packages/core/react'

const markdown = `
# Backlog

- [x] Write #a blog post
- [x] Create #b new feature
- [x] Write #c blog post

# Todo

- [x] Write #a blog post
- [x] Create #b new feature
- [x] Write #c blog post

# Doing

- [x] Write #a blog post
- [x] Create #b new feature
- [x] Write #c blog post

# Done

- [x] Write a blog post
- [x] Create a new feature
`

export const App = () => {
        const jira = useJIRABoard('', 'button')
        // const jira = useJIRABoard({ button: 'button' })

        // prettier-ignore
        return (
                <>
                        <div>
                                <button id="button">COPY</button>
                        </div>
                        <pre ref={jira} id="pre">{markdown}</pre>
                </>
        )
}

export default App
