//OGP用のmetaを生成します
import Head from "next/head"
import { useRouter } from "next/router"
import { siteUrl } from 'lib/siteUrl'

type Props = {
  title: string
  description: string
}

const Ogp = ({ title, description }: Props) => {
  const path = useRouter().asPath
  const og_url = siteUrl(path)
  const og_title = `${title}-お茶の葉`

  const img_path = "/ogp.jpg"
  const img_url = siteUrl(img_path)

  return (
    <Head>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@I_am_Ochappa" />
      <meta name="twitter:title" content={og_title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img_url} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={og_url} />
      <meta property="og:title" content={og_title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={img_url} />
    </Head>
  )
}

export default Ogp
