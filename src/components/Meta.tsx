//タイトル、description、正規URLの設定する
import Head from "next/head"
import React from "react"
import { useRouter } from'next/router'
import urlJoin from "url-join"

const Meta = ({ description, title }:{description:string, title:string}) => {
  const path = useRouter().asPath
  const url = urlJoin(process.env.NEXT_PUBLIC_DOMAIN, path)
  return (
    <Head>
      <title>{`${title}-お茶の葉`}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
    </Head>
  )
}

export default Meta