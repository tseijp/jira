import { createRoute } from 'honox/factory'
import { findAllHours } from '../../database'
import { basicAuth } from 'hono/basic-auth'
import { Context } from 'hono'
import { ContentHourItem } from '../../islands/ContentHourItem'
import { FormCreateHour } from '../../islands/FormCreateHour'

const AUTH = basicAuth({
        username: 'username',
        password: 'password',
})

// tmp
export const GET = createRoute(AUTH, async (c: Context) => {
        // @ts-ignore
        const hours = await findAllHours(c.env.DB)

        return c.render(
                <section>
                        <h3>Posts</h3>
                        <a href="/hours/create">Create Post</a>
                        {hours.map((hour) => (
                                <ContentHourItem hour={hour} />
                        ))}
                        <button>create</button>
                        <FormCreateHour />
                </section>,
                {
                        title: 'Hour',
                }
        )
})

export const POST = createRoute(async (c) => {
        // @ts-ignore
        const { title, content } = c.req.valid('form')
        // @ts-ignore
        await createHour(c.env.DB, { title, content })
        return c.redirect('/board', 303)
})
