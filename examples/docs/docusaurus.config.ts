// import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'

const config: Config = {
        title: 'jira',
        tagline: '🪧jira are cool',
        favicon: 'img/favicon.ico',

        url: 'https://jira.tsei.jp',
        baseUrl: '/',

        organizationName: 'tseijp', // Usually your GitHub org/user name.
        projectName: 'tseijp', // Usually your repo name.

        onBrokenLinks: 'warn',
        onBrokenMarkdownLinks: 'warn',

        i18n: {
                defaultLocale: 'en',
                locales: ['en'],
        },

        presets: [
                [
                        'classic',
                        {
                                docs: {
                                        // sidebarPath: './sidebars.ts',
                                        // Please change this to your repo.
                                        // Remove this to remove the "edit this page" links.
                                        editUrl: 'https://github.com/tseijp/jira/tree/main/examples/docs',
                                },
                                // blog: {
                                //         showReadingTime: true,
                                //         // Please change this to your repo.
                                //         // Remove this to remove the "edit this page" links.
                                //         editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
                                // },
                                theme: {
                                        customCss: './ui/index.css',
                                },
                        } satisfies Preset.Options,
                ],
        ],

        themeConfig: {
                // Replace with your project's social card
                image: 'img/favicon.png',
                navbar: {
                        title: '@tsei/jira',
                        logo: {
                                alt: ' ',
                                src: 'img/favicon.png',
                        },
                        items: [
                                {
                                        to: '/docs',
                                        label: 'Docs',
                                        position: 'left',
                                },
                                // {
                                //         to: '/blog',
                                //         label: 'Blog',
                                //         position: 'left',
                                // },
                                {
                                        href: 'https://github.com/tseijp/jira',
                                        label: 'GitHub',
                                        position: 'right',
                                },
                        ],
                },
                // footer: {
                //         style: 'dark',
                //         links: [
                //                 {
                //                         title: 'Docs',
                //                         items: [
                //                                 {
                //                                         label: 'Tutorial',
                //                                         to: '/docs/intro',
                //                                 },
                //                         ],
                //                 },
                //                 {
                //                         title: 'Community',
                //                         items: [
                //                                 {
                //                                         label: 'Stack Overflow',
                //                                         href: 'https://stackoverflow.com/questions/tagged/docusaurus',
                //                                 },
                //                                 {
                //                                         label: 'Discord',
                //                                         href: 'https://discordapp.com/invite/docusaurus',
                //                                 },
                //                                 {
                //                                         label: 'Twitter',
                //                                         href: 'https://twitter.com/docusaurus',
                //                                 },
                //                         ],
                //                 },
                //                 {
                //                         title: 'More',
                //                         items: [
                //                                 {
                //                                         label: 'Blog',
                //                                         to: '/blog',
                //                                 },
                //                                 {
                //                                         label: 'GitHub',
                //                                         href: 'https://github.com/facebook/docusaurus',
                //                                 },
                //                         ],
                //                 },
                //         ],
                //         copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
                // },
                // prism: {
                //         theme: prismThemes.github,
                //         darkTheme: prismThemes.dracula,
                // },
        } satisfies Preset.ThemeConfig,
}

export default config
