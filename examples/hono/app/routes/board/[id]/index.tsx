import createJIRABoard from '@tsei/jira'
import Textarea from '../../../islands/Textarea'
import { createRoute } from 'honox/factory'
import { findHourById } from '../../../database'
import { basicAuth } from 'hono/basic-auth'

export const title = 'Board'

const AUTH = basicAuth({
        username: 'username',
        password: 'password',
})

export default createRoute(AUTH, async (c) => {
        const { id } = c.req.param()
        // @ts-ignore
        const article = await findHourById(c.env.DB, id)
        const jira = createJIRABoard()

        if (!article) return c.render(<div>NOT FOUND</div>)

        jira.markdown = article.content?.trim?.() || ''
        jira.convert(jira)

        return c.render(
                <>
                        <h1>{article.title}</h1>
                        <div
                                dangerouslySetInnerHTML={{
                                        __html: jira.result,
                                }}
                        />
                        <Textarea initialValue={jira.markdown} />
                </>
        )
})

// update
export const POST = createRoute(async (c) => {
        // @ts-ignore
        const { title, content } = c.req.valid('form')
        // @ts-ignore
        await createHour(c.env.DB, { title, content })
        return c.redirect('/board', 303)
})
