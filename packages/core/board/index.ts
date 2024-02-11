import { render } from './render'
import { JIRABoardState, JIRATicket, JIRATickets } from './types'
import { JIRABoardConfig, JIRABoardConfigArgs } from './types'
import { create } from '../create'

export * from './render'
export * from './types'

const DEFAULT_JIRA_BOARD_CONFIG: Partial<JIRABoardConfig> = {
        TITLE: '# ',
        LABEL: `#\\s*(\\S+)`,
        TICKET: '- [x]',
        BACKLOG: '- [ ]',
        // title: '# *',
        // label: '#*',
        // ticket: '- [x] *',
        // backlog: '- [ ] *',
}

export const convertTextToBoardHTML = (state: JIRABoardState) => {
        // return if already created
        const markdown = state.markdown
        if (!markdown) return state
        if (markdown?.includes('<table id="jira_root">')) return state

        const tickets = (state.tickets = new Map([['', {}]]) as JIRATickets)
        const backlog = (state.backlog = [] as JIRATicket[])
        const columns = (state.columns = new Set())
        const results = state.results ?? (state.results = [] as string[])

        let column = state.title || ''
        let order = 0
        let last = { detail: '' } as JIRATicket
        const _label = new RegExp(state.LABEL)

        const checkTitle = (line = '') => {
                const _column = line.split('# ')[1]
                if (!_column) return false
                if (columns.has(_column))
                        console.warn(`Error: Duplicate column: ${_column}`)
                column = _column.trim()
                tickets.set(column, [])
                columns.add(column)
                return true
        }

        const checkTicket = (line = '') => {
                if (!line.includes(state.TICKET)) return false
                const task = line.split(state.TICKET)[1].trim()
                order++
                last = { task, column, order, detail: '' }
                tickets.get(column)?.push(last)
                return true
        }

        const checkLabel = (line = '') => {
                if (!state.label) return false
                const match = line.match(_label)
                if (!match) return false

                const [, label] = match
                last.label = label
                if (label !== state.label) last.disable = true

                return true
        }

        const checkBacklog = (line = '') => {
                if (!line.includes(state.BACKLOG)) return false
                const task = line.split(state.BACKLOG)[1].trim()
                order++
                last = { task, column, order, detail: '' }
                backlog.push(last)
                return true
        }

        const checkLine = (line = '') => {
                if (!line) return
                if (checkTitle(line)) return
                if (checkTicket(line)) return checkLabel(line)
                if (checkBacklog(line)) return checkLabel(line)
                if (last.detail) last.detail += ' <br />\n'
                last.detail += line
        }

        markdown.trim().split('\n').forEach(checkLine)

        let _columns = Array.from(columns)

        // render
        results.push((state.result = render(_columns, tickets)))
}

export const createJIRABoard = (...args: JIRABoardConfigArgs) => {
        const state = create(DEFAULT_JIRA_BOARD_CONFIG, ...args)
        state.convert = convertTextToBoardHTML as any
        return state
}

export default createJIRABoard

// window.addEventListener('DOMContentLoaded', createJIRA('pre'))
