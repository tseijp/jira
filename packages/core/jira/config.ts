import { JIRABoardConfig, JIRABoardConfigArgs } from './types'
import { isSE } from '../utils'

const DEFAULT_JIRA_CONFIG: JIRABoardConfig = {
        TITLE: '# ',
        LABEL: '#',
        TICKET: '- [x]',
        BACKLOG: '- [ ]',
        // title: '# *',
        // label: '#*',
        // ticket: '- [x] *',
        // backlog: '- [ ] *',
}

export const parseConfigArgs = (...args: JIRABoardConfigArgs) => {
        const config = { ...DEFAULT_JIRA_CONFIG }
        const [arg0, arg1, arg2, arg3, arg4] = args
        let override: Partial<JIRABoardConfig> | undefined
        if (isSE(arg0)) {
                config.target = arg0
                if (isSE(arg1)) {
                        config.button = arg1
                        if (isSE(arg2)) {
                                config.select = arg2
                                if (isSE(arg3)) {
                                        config.input = arg3
                                        override = arg4
                                } else override = arg3
                        } else override = arg2
                } else override = arg1
        } else override = arg0

        if (override) Object.assign(config, override)

        return config
}
