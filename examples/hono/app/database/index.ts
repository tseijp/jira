export type Hour = {
        id: string
        title: string
        content: string
        created_at: string
        updated_at: string
}

export const findAllHours = async (db: D1Database) => {
        const { results } = await db
                .prepare('SELECT * FROM Hour ORDER BY created_at DESC')
                .all<Hour>()
        const hour = results
        return hour
}

export const findHourById = async (db: D1Database, id: string) => {
        const article = await db
                .prepare('SELECT * FROM Hour WHERE id = ?')
                .bind(id)
                .first<Hour>()
        return article
}

export const createHour = async (
        db: D1Database,
        article: Pick<Hour, 'title' | 'content'>
) => {
        const id = crypto.randomUUID()
        // @ts-ignore
        const { results } = await db
                .prepare('INSERT INTO Hour(id, title, content) VALUES(?, ?, ?)')
                .bind(id, article.title, article.content)
                .run()
        const hour = results
        return hour
}
