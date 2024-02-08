import { create } from '../create'
import {
        JIRAHourConfig,
        JIRAHourConfigArgs,
        JIRAHourState,
        JIRAHours,
        JIRAHour,
} from './types'

const DEFAULT_JIRA_HOUR_CONFIG: JIRAHourConfig = {
        DATE: '# *',
        HOUR: '- [x] *',
        TITLE: '# ', // nouse
        LABEL: '#', // nouse
}
const calculateDuration = (from: string, to: string) => {
        const [fromHour, fromMinute] = from.split(':').map(Number)
        const [toHour, toMinute] = to.split(':').map(Number)
        return toHour + toMinute / 60 - (fromHour + fromMinute / 60)
}

const calculateRest = (hours: JIRAHour[] | undefined, from: string) => {
        if (!hours || hours.length === 0) return 0
        const lastHour = hours[hours.length - 1]
        const [lastToHour, lastToMinute] = lastHour.to
                ?.split(':')
                .map(Number) || [0, 0]
        const [fromHour, fromMinute] = from.split(':').map(Number)
        return fromHour + fromMinute / 60 - (lastToHour + lastToMinute / 60)
}

export const convertTextToHourHtml = (state: JIRAHourState) => {
        const markdown = state.markdown
        const hours = (state.hours = new Map([['', {}]]) as JIRAHours)
        const columns = (state.columns = [] as string[])
        const _results = state.results ?? (state.results = [] as string[])

        let column = ''
        let last = { detail: '' } as JIRAHour

        const checkDate = (line = '') => {
                const _ = '(\\d{4}-\\d{2}-\\d{2})'
                const dateRegex = new RegExp(state.DATE.replace('*', _))
                const match = line.match(dateRegex)
                if (match) {
                        column = match[1]
                        hours.set(column, [])
                        columns.push(column)
                        return true
                }
                return false
        }

        const checkHour = (line = '') => {
                const reg = '(\\d{2}:\\d{2}) ~ (\\d{2}:\\d{2}) #(\\S+) (.+)'
                const hourRegex = new RegExp(state.HOUR.replace('*', reg))
                const match = line.match(hourRegex)
                if (match) {
                        const [_, from, to, label, task] = match
                        const duration = calculateDuration(from, to)
                        const rest = calculateRest(hours.get(column), from)
                        const time = duration - rest
                        last = { from, to, rest, time, task, label, detail: '' }
                        hours.get(column)?.push(last)
                        return true
                }
                return false
        }

        const checkLine = (line = '') => {
                if (!line) return
                if (checkDate(line)) return
                if (checkHour(line)) return
        }

        console.log({ ...state })

        markdown.trim().split('\n').forEach(checkLine)

        // results.push((state.result = render(columns, hours)))

        return state
}

export const createJIRAHour = (...args: JIRAHourConfigArgs) => {
        const state = create(DEFAULT_JIRA_HOUR_CONFIG, ...args)
        state.convert = convertTextToHourHtml as any
        return state
}
