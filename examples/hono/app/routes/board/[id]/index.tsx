import { createRoute } from 'honox/factory'
import { basicAuth } from 'hono/basic-auth'
import { Context } from 'hono'
import { findHourById } from '../../../database'
import BoardForm from '../../../islands/BoardForm'
import BoardHeader from '../../../islands/atoms/BoardHeader'
import BoardContainer from '../../../islands/atoms/BoardContainer'

const AUTH = basicAuth({
        username: 'username',
        password: 'password',
})

// tmp
export const GET = createRoute(AUTH, async (c: Context) => {
        const { id } = c.req.param()
        const hour = await findHourById(c.env.DB, id)

        // @ts-ignore
        // const hours = await findAllHours(c.env.DB)

        return c.render(
                <BoardContainer>
                        <BoardHeader>{hour?.title}</BoardHeader>
                        <BoardForm initialValue={hour?.content} />
                </BoardContainer>,
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
