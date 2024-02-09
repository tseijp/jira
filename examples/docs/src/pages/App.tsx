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
        const jira = useJIRABoard()
        // const jira = useJIRABoard({ button: 'button' })

        // prettier-ignore
        return (
                <>
                        <pre ref={jira} id="pre">
                                {markdown}
                        </pre>
                        <div>
                                <button id="button" onClick={jira.onClick}>
                                        COPY
                                </button>
                        </div>
                </>
        )
}

export default App
