import createJIRABoard from '@tsei/jira'
import Textarea from '../../../islands/Textarea'
import { createRoute } from 'honox/factory'
import { findHourById } from '../../../database'

export const title = 'Board'

export default createRoute(async (c) => {
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
