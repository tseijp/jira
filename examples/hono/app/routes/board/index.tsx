import { createRoute } from 'honox/factory'
import { findAllHours } from '../../database'

export const GET = createRoute(async (c) => {
        // @ts-ignore
        const articles = await findAllHours(c.env.DB)

        return c.render(
                <section>
                        <div>
                                <h3>Posts</h3>
                                <a href="/articles/create">Create Post</a>
                        </div>
                        <ul>
                                {articles.map((article) => (
                                        <div>
                                                <h3>
                                                        <a
                                                                href={`/board/id/${article.id}`}
                                                        >
                                                                [id{article.id}]
                                                                {article.title}
                                                        </a>
                                                </h3>
                                                <pre>{article.content}</pre>
                                                <button>
                                                        {article.created_at}
                                                </button>
                                                <button>
                                                        {article.updated_at}
                                                </button>
                                                <button>EDIT</button>
                                        </div>
                                ))}
                        </ul>
                </section>,
                {
                        title: 'Hono Blog',
                }
        )
})
