import Head from 'next/head'
import { siteUrl } from 'lib/siteUrl'

type ListItem = {
    readonly '@type': 'ListItem'
    item: string
    name: string
    position: number
}

type Breadcrumb = {
    readonly '@context': 'https://schema.org'
    readonly '@type': 'BreadcrumbList'
    itemListElement: ListItem[]
}

type Props = {
    id: string
    title: string
}

const BreadJsonLd = ({ id, title }: Props) => {
    const postsUrl = siteUrl('posts')
    const breadcrumb: Breadcrumb = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: '投稿',
                item: postsUrl,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: title,
                item: siteUrl('posts', id),
            },
        ],
    }
    const json = JSON.stringify(breadcrumb).replace(/</g, '\\u003c')

    return (
        <Head>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: json }}
            />
        </Head>
    )
}

export default BreadJsonLd
