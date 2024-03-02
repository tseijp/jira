import { createRoute } from 'honox/factory'
import { basicAuth } from 'hono/basic-auth'
import { Context } from 'hono'
import { findAllHours } from '../../database'
import BoardItem from '../../islands/BoardItem'
import BoardHeader from '../../islands/atoms/BoardHeader'
import BoardContainer from '../../islands/atoms/BoardContainer'

const AUTH = basicAuth({
        username: 'username',
        password: 'password',
})

// tmp
export const GET = createRoute(AUTH, async (c: Context) => {
        // @ts-ignore
        const hours = await findAllHours(c.env.DB)

        return c.render(
                <BoardContainer>
                        <BoardHeader>Posts</BoardHeader>
                        <div
                                className="
                                        grid
                                        gap-4
                                        grid-cols-1
                                        sm:grid-cols-2
                                        md:grid-cols-3
                                        lg:grid-cols-4
                                        2xl:grid-cols-6
                                        max-w-3xl
                                        mx-auto
                                        bg-white
                                "
                        >
                                {hours.map((hour: any, key: string) => (
                                        <BoardItem key={key} hour={hour} />
                                ))}
                        </div>
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
