import { create } from '../create'
import { getElement, isE, parseConfig } from '../utils'
import { JIRAHourConfig, JIRAHourConfigArgs, JIRAHourState } from './types'

const DEFAULT_JIRA_HOUR_CONFIG: JIRAHourConfig = {
        TITLE: '# *',
        LABEL: '#*',
}

export const createHour = (...args: JIRAHourConfigArgs) => {
        const state = create(DEFAULT_JIRA_HOUR_CONFIG, ...args)
        return state
}
