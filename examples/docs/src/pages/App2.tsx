import { useEffect } from 'react'
import useJIRABoard from '../../../../packages/core/react'

const markdown = `
# 2021-08-02
- [x] 12:00 ~ 15:00 #a mtg
- [x] 15:00 ~ 17:00 #b mtg
- [x] 17:00 ~ 18:00 #c mtg

# 2021-08-01

- [x] 12:00 ~ 15:00 #a mtg
- [x] 15:00 ~ 17:00 #b mtg
- [x] 17:00 ~ 18:00 #c mtg

# 2021-07-31

- [x] 12:00 ~ 15:00 #a mtg
- [x] 15:00 ~ 17:00 #b mtg
- [x] 17:00 ~ 18:00 #c mtg

# 2021-07-30

- [x] 12:00 ~ 15:00 #a mtg
- [x] 15:00 ~ 17:00 #b mtg
- [x] 17:00 ~ 18:00 #c mtg
`
export const App = () => {
        // const jira = useJIRABoard({ button: 'button' })

        const jira = useJIRABoard('', 'button')
        useEffect(jira.onMount, [])
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
