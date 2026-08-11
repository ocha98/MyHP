//タイトル、description、正規URLの設定する
import Head from "next/head"
import { useRouter } from'next/router'
import { siteUrl } from 'lib/siteUrl'

const Meta = ({ description, title }:{description:string, title:string}) => {
  const path = useRouter().asPath
  const url = siteUrl(path)
  return (
    <Head>
      <title>{`${title}-お茶の葉`}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
    </Head>
  )
}

export default Meta
