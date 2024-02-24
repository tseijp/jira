import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'

const app = new Hono()

export const title = 'Board'

app.use('/:id', basicAuth({ username: 'username', password: 'password' }))

app.get('', (c) => c.text('TODO app/routes/board/index.tsx'))

// app.get('/:id/:label', (c) => {
//         const label = c.req.param('label')
//         const jira = createJIRA()
//         jira.label = label
//         jira.markdown = `
// # Todo
// - [x] Task 0 #aaa
//   - Detail 0
// # In Progress
// - [x] Task 1 #fff
//   - Detail 1
// # Review
// - [x] Task 2 #aaa
//   - Detail 2
// # Done
// - [x] Task 3 #fff
//   - Detail 3
// `
//         jira.convert(jira)
//         return c.html(jira.result)
// })

// app.get('/:id', (c) => {
//         const jira = createJIRA()
//         jira.markdown = `
// # Todo
// - [x] Task 0 #aaa
//   - Detail 0
// # In Progress
// - [x] Task 1 #fff
//   - Detail 1
// # Review
// - [x] Task 2 #aaa
//   - Detail 2
// # Done
// - [x] Task 3 #fff
//   - Detail 3
// `
//         jira.convert(jira)
//         return c.html(<div dangerouslySetInnerHTML={{ __html: jira.result }} />)
// })

export default app
