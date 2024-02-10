import { useJIRAHour } from '../../../../packages/core/react'

const SIZE_OF_DAY = 31

const markdown = [...Array(SIZE_OF_DAY)].reduce((acc, _, i) => {
        return (
                acc +
                `
# 2024-01-${i < 9 ? '0' : ''}${i + 1}

- [${i % 2 ? 'x' : ' '}] 09:00 ~ 12:00 #a mtg
- [${i % 3 ? 'x' : ' '}] 12:00 ~ 15:00
- [${i % 7 ? 'x' : ' '}] 15:00 ~ 18:00
- [${i % 2 ? ' ' : 'x'}] 18:00 ~ 21:00 mtg #d
`
        )
}, '')

export const Hour = () => {
        const jira = useJIRAHour()

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

export default Hour
