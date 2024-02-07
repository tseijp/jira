// import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
// import Heading from '@theme/Heading'
// import styles from './index.module.css'
import App from './App'

export default function Home(): JSX.Element {
        const { siteConfig } = useDocusaurusContext()
        return (
                <Layout
                        title={`${siteConfig.title}`}
                        description="Description will go into a meta tag in <head />"
                >
                        <main>
                                <App />
                        </main>
                </Layout>
        )
}
