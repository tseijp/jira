import { create } from '../create'
import { render } from './render'
import {
        JIRAHourConfig,
        JIRAHourConfigArgs,
        JIRAHourState,
        JIRAHour,
} from './types'

const reg = (from = '', to = '') => {
        to = from.replace('*', to)
        return new RegExp(to)
}
const t = '(\\d{1,2}:\\d{1,2})'

const DEFAULT_JIRA_HOUR_CONFIG: Partial<JIRAHourConfig> = {
        DATE: '# *',
        HOUR: '- \\[x\\]*',
        LABEL: '#*',
        dateReg: `(\\d{4}-\\d{2}-\\d{2})`,
        hourReg: `\\s*${t}\\s*~\\s*${t}\\s*`,
        labelReg: `\\s*(\\S+)`,
}

const calculateDuration = (from: string, to: string) => {
        const [h, m] = from.split(':').map(Number)
        const [H, M] = to.split(':').map(Number)
        return H * 60 + M - (h * 60 + m)
}

const calculateRest = (column: string, state: JIRAHourState) => {
        const d = state.hours.get(column)
        if (!d) return
        const _d = d.filter((d) => !d.disable)
        if (_d.length <= 0) return

        _d.sort((a, b) => (a.from! < b.from! ? -1 : 1))

        d.first = _d[0]
        d.last = _d[_d.length - 1]
        d.size = _d.length
        d.duration = calculateDuration(d.first.from!, d.last.to!)
        d.total = _d.reduce((acc, cur) => acc + (cur.duration || 0), 0)
        d.rest = d.duration - d.total
}

export const convertTextToHourHtml = (state: JIRAHourState) => {
        const markdown = state.markdown
        const hours = (state.hours = new Map())
        const columns = (state.columns = new Set())
        const results = state.results ?? (state.results = [])

        let column = state.title || ''
        let last = { detail: '' } as JIRAHour
        hours.set(column, [])

        const _date = reg(state.DATE, state.dateReg)
        const _hour = reg(state.HOUR, state.hourReg)
        const _label = reg(state.LABEL, state.labelReg)

        const checkDate = (line = '') => {
                const match = line.match(_date)
                if (!match) return false

                column = match[1]

                if (columns.has(column))
                        console.warn(`Error: Duplicate column: ${column}`)

                hours.set(column, [])
                columns.add(column)
                return true
        }

        const checkHour = (line = '') => {
                const match = line.match(_hour)
                if (!match) return false

                const [, from, to] = match
                const duration = calculateDuration(from, to)
                last = { from, to, duration, detail: '' }

                hours.get(column)?.push(last)

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

        const checkLine = (line = '') => {
                if (!line) return
                if (checkDate(line)) return
                if (checkHour(line)) checkLabel(line)
        }

        markdown.trim().split('\n').forEach(checkLine)

        let _columns = Array.from(columns)

        _columns.forEach((col) => calculateRest(col, state)) // calculate duration and rest
        _columns = _columns.sort((a, b) => (a < b ? -1 : 1)) // sort columns by date
        _columns = _columns.filter((col) => hours.get(col)?.size) // remove empty columns

        // render
        results.push((state.result = render(_columns, state)))

        return state
}

export const createJIRAHour = (...args: JIRAHourConfigArgs) => {
        const state = create(DEFAULT_JIRA_HOUR_CONFIG, ...args)
        state.convert = convertTextToHourHtml as any
        return state
}
