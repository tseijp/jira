import { create } from '../create'
import { render } from './render'
import {
        JIRAHourConfig,
        JIRAHourConfigArgs,
        JIRAHourState,
        JIRAHours,
        JIRAHour,
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
        const [h, m] = from.split(':').map(Number)
        const [H, M] = to.split(':').map(Number)
        return H * 60 + M - (h * 60 + m)
}

const calculateRest = (column: string, hours: JIRAHours) => {
        let d = hours.get(column)
        if (!d || d.length === 0) return 0
        d.sort((a, b) => (a.from! < b.from! ? -1 : 1))
        d.first = d[0]
        d.last = d[d.length - 1]
        d.duration = calculateDuration(d.first.from!, d.last.to!)
        d.total = d.reduce((acc, cur) => acc + (cur.duration || 0), 0)
        d.rest = d.duration - d.total
}

export const convertTextToHourHtml = (state: JIRAHourState) => {
        const markdown = state.markdown
        const hours = (state.hours = new Map())
        const columns = (state.columns = new Set())
        const results = state.results ?? (state.results = [])

        let column = ''
        let last = { detail: '' } as JIRAHour
        hours.set(column, [])

        const checkDate = (line = '') => {
                const match = reg(line, state.DATE, state.dateReg)
                if (!match) return false

                column = match[1]

                if (columns.has(column))
                        console.warn(`Error: Duplicate column: ${column}`)

                hours.set(column, [])
                columns.add(column)
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

        let _columns = Array.from(columns)

        _columns = _columns.filter((col) => hours.get(col)?.length) // remove empty columns
        _columns = _columns.sort((a, b) => (a < b ? -1 : 1)) // sort columns by date
        _columns.forEach((col) => calculateRest(col, hours)) // calculate duration and rest

        // render
        results.push((state.result = render(_columns, hours)))

        return state
}

export const createJIRAHour = (...args: JIRAHourConfigArgs) => {
        const state = create(DEFAULT_JIRA_HOUR_CONFIG, ...args)
        state.convert = convertTextToHourHtml as any
        return state
}
