import {} from 'hono'

type Head = {
        title?: string
        callback?: () => void
}

declare module 'hono' {
        interface Env {
                Variables: {}
                Bindings: {}
        }
        interface ContextRenderer {
                (content: string | Promise<string>, head?: Head):
                        | Response
                        | Promise<Response>
        }
}
