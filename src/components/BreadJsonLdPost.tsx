import assert from "assert"
import Head from "next/head"
import { useRouter } from "next/router"
import { Breadcrumb } from "react-bootstrap"
import urlJoin from "url-join"

type ListItem = {
    readonly "@type": "ListItem",
    item: string,
    name: string,
    position: number
}

type Breadcrumb = {
    readonly "@context": "https://schema.org",
    readonly "@type": "BreadcrumbList",
    "itemListElement": ListItem[]
}

type Props = {
    title: string,
}

const BreadJsonLd = ({title}: Props) => {
    const path: string[] = useRouter().asPath.split("/")
    path.shift()

    assert.equal(path.length, 2)
    assert.equal(path[0], 'posts')

    let breadPost:Breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": []
    }

    let nameList: string[] = ["投稿", title]

    //投稿一覧からのパンくずリスト
    let url = process.env.NEXT_PUBLIC_DOMAIN
    for (let i = 0; i < path.length; ++i) {
        url = urlJoin(url, path[i])
        const elem: ListItem = {
            "@type": "ListItem",
            "position": i+1,
            "name": nameList[i],
            "item": url
        }
        breadPost.itemListElement.push(elem)
    }


    return(
        <Head>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadPost) }} />
        </Head>
    )
}

export default BreadJsonLd