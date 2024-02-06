import { render } from './render'

const TICKET = '- [x] '
const BACKLOG = '- [ ] '

export const createHTML = (markdown: string) => {
        // return if already created
        if (markdown.includes('<table id="jira_root">')) return markdown

        const tasks = { '': [] }
        const backlog = []
        const columns = []
        let column = ''
        let last = { detail: '' }

        const checkColumn = (line = '') => {
                let _column = line.split('# ')[1]
                if (!_column) return false
                column = _column = _column.trim()
                tasks[_column] = []
                columns.push(column)
                return true
        }

        const checkTicket = (task = '') => {
                if (!task.includes(TICKET)) return false
                task = task.split('- [x] ')[1].trim()
                tasks[column].push((last = { task, column, detail: '' }))
                return true
        }

        const checkBacklog = (task = '') => {
                if (!task.includes(BACKLOG)) return false
                task = task.split('- [ ] ')[1].trim()
                backlog.push((last = { task, column, detail: '' }))
                return true
        }

        const checkLine = (line: string) => {
                if (!line) return
                if (checkColumn(line)) return
                if (checkTicket(line)) return
                if (checkBacklog(line)) return
                if (last.detail) last.detail += ' <br /> \n'
                last.detail += line
        }

        markdown.trim().split('\n').forEach(checkLine)

        return render(columns, tasks)
}

export const copyHTMLToElement = (id = '') => {
        const el = document.getElementById(id)
        const html = createHTML(pre.innerHTML)
        if (el) el.innerHTML = html
        return html
}

export const copyHTMLToClipboard = (id = '') => {
        navigator.clipboard.writeText(copyHTMLToElement(id))
}

export const createJIRA = (id = '', btnId = '') => {
        if (!id) return
        copyHTMLToElement(id)
        if (!btnId) return
        const btn = document.getElementById(btnId)
        if (!btn) return
        btn.addEventListener('click', () => copyHTMLToClipboard(id))
}

// window.addEventListener("DOMContentLoaded", () => createJIRA("pre"));
