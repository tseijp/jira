import { create } from '../create'
import { render } from './render'
import {
        JIRAHourConfig,
        JIRAHourConfigArgs,
        JIRAHourState,
        JIRAHours,
        JIRAHour,
        JIRADateHour,
} from './types'

const reg = (line = '', from = '', to = '') => {
        const regex = new RegExp(from.replace('*', to))
        return line.match(regex)
}
const t = '(\\d{1,2}:\\d{1,2})'

const DEFAULT_JIRA_HOUR_CONFIG: JIRAHourConfig = {
        DATE: '# *',
        HOUR: '- [x] *',
        TITLE: '# ', // nouse
        LABEL: '#', // nouse
        dateReg: `(\\d{4}-\\d{2}-\\d{2})`,
        hourReg: `${t} ~ ${t}(?: #\\S+)?(?: .+)?|\\[x\\] ${t} ~ ${t}(?: (.*?))?(?: (#[^\\s]+))?`,
}

const calculateDuration = (from: string, to: string) => {
        const [h0, M0] = from.split(':').map(Number)
        const [h1, m1] = to.split(':').map(Number)
        return h1 * 60 + m1 - (h0 * 60 + M0)
}

const calculateRest = (d?: JIRADateHour) => {
        if (!d || d.length === 0) return 0
        d = d.sort((a, b) => (a.from! < b.from! ? -1 : 1))
        d.first = d[0]
        d.last = d[d.length - 1]
        d.duration = calculateDuration(d.first.from!, d.last.to!)
        d.total = d.reduce((acc, cur) => acc + (cur.duration || 0), 0)
        d.rest = d.duration - d.total
}

export const convertTextToHourHtml = (state: JIRAHourState) => {
        const markdown = state.markdown
        const hours = (state.hours = new Map() as JIRAHours)
        const columns = (state.columns = [] as string[])
        const results = state.results ?? (state.results = [] as string[])

        let column = ''
        let last = { detail: '' } as JIRAHour
        hours.set(column, [])

        const checkDate = (line = '') => {
                const match = reg(line, state.DATE, state.dateReg)
                if (!match) return false
                if (column) calculateRest(hours.get(column))

                const [_, _column] = match
                column = _column
                hours.set(column, [])
                columns.push(column)
                return true
        }

        const checkHour = (line = '') => {
                const match = reg(line, state.HOUR, state.hourReg)
                if (!match) return false

                const [, , , from, to] = match
                const duration = calculateDuration(from, to)
                last = { from, to, duration, detail: '' }
                hours.get(column)?.push(last)
                return true
        }

        const checkLine = (line = '') => {
                if (!line) return
                if (checkDate(line)) return
                if (checkHour(line)) return
        }

        markdown.trim().split('\n').forEach(checkLine)

        if (column) calculateRest(hours.get(column))

        results.push((state.result = render(columns, hours)))

        return state
}

export const createJIRAHour = (...args: JIRAHourConfigArgs) => {
        const state = create(DEFAULT_JIRA_HOUR_CONFIG, ...args)
        state.convert = convertTextToHourHtml as any
        return state
}
