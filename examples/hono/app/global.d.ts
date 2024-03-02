// global.d.ts
import '@hono/react-renderer'

declare module '@hono/react-renderer' {
        interface Props {
                title?: string
        }
}

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
