import pagesBuild from '@hono/vite-cloudflare-pages'
// import pagesPlugin from '@hono/vite-dev-server/cloudflare-pages'
import honox from 'honox/vite'
import clientBuild from 'honox/vite/client'
import { defineConfig } from 'vite'
import { getPlatformProxy } from 'wrangler'

export default defineConfig(async ({ mode }) => {
        if (mode === 'client')
                return {
                        build: {
                                rollupOptions: {
                                        input: ['/app/style.css'],
                                        output: {
                                                assetFileNames:
                                                        'static/assets/[name].[ext]',
                                        },
                                },
                        },
                        plugins: [clientBuild()],
                }

        const { env, dispose } = await getPlatformProxy()

        return {
                plugins: [
                        honox({
                                devServer: {
                                        env,
                                        plugins: [
                                                {
                                                        onServerClose: dispose,
                                                },
                                        ],
                                },
                        }),
                        pagesBuild(),
                ],
        }
})
