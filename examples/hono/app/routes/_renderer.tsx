import { Style } from 'hono/css'
import { jsxRenderer } from 'hono/jsx-renderer'
import { Script } from 'honox/server'

export default jsxRenderer(({ children, title }) => {
        const href = (import.meta as any).env.PROD
                ? 'static/assets/style.css'
                : '/app/style.css'

        return (
                <html lang="en">
                        <head>
                                <meta charset="utf-8" />
                                <meta
                                        name="viewport"
                                        content="width=device-width, initial-scale=1.0"
                                />
                                <title>{title}</title>
                                <link href={href} rel="stylesheet" />
                                <Script src="/app/client.ts" async />
                                <Style />
                        </head>
                        <body>{children}</body>
                </html>
        )
})
