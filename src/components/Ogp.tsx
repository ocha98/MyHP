//OGP用のmetaを生成します
import Head from "next/head"
import React from "react"
import { useRouter } from "next/router"
import urlJoin from "url-join"

type Props = {
  title: string
  description: string
}

const Ogp = ({ title, description }: Props) => {
  const path = useRouter().asPath
  const og_url = urlJoin(process.env.NEXT_PUBLIC_DOMAIN, path)
  const og_title = `${title}-お茶の葉`

  const img_path = "/ogp.jpg"
  const img_url = urlJoin(process.env.NEXT_PUBLIC_DOMAIN, img_path)

  return (
    <Head>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@I_am_Ochappa" />
      <meta property="og:url" content={og_url} />
      <meta property="og:title" content={og_title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={img_url} />:
    </Head>
  )
}

export default Ogp