import { convertTextToBoardHTML } from './convert'
import { JIRABoardConfig, JIRABoardConfigArgs } from './types'
import { create } from '../create'

export * from './render'
export * from './convert'
export * from './types'

const DEFAULT_JIRA_BOARD_CONFIG: JIRABoardConfig = {
        TITLE: '# ',
        LABEL: '#',
        TICKET: '- [x]',
        BACKLOG: '- [ ]',
        // title: '# *',
        // label: '#*',
        // ticket: '- [x] *',
        // backlog: '- [ ] *',
}

export const createJIRABoard = (...args: JIRABoardConfigArgs) => {
        const state = create(DEFAULT_JIRA_BOARD_CONFIG, ...args)
        state.convert = convertTextToBoardHTML as any
        return state
}

export default createJIRABoard

// window.addEventListener('DOMContentLoaded', createJIRA('pre'))
