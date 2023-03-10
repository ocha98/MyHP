import { loadPostData, getAllPostIDs } from 'lib/microcmsAPI'
import { Container } from "react-bootstrap"
import PostHeader from 'components/organism/PostHeader'
import StyleMD from "../../styles/Markdown.module.scss"
import { MDtoHtml } from 'lib/MDtoHTML'
import Meta from 'components/Meta'
import PostStyle from "../../styles/Post.module.scss"
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'node:querystring'
import BreadJsonLd from 'components/BreadJsonLdPost'
import { Post } from 'types'
import Ogp from 'components/Ogp'
import { differenceInDays } from 'date-fns' 

interface Params extends ParsedUrlQuery {
  id: string
}

type Props = {
  postData: Post
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const ids = await getAllPostIDs()
  let paths = []
  for(let v of ids){
    paths.push({params: {id: v["id"]}})
  }

  return { 
    paths, 
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps<Props> = async ( context ) => {
  const { id } = context.params as Params 

  let post = await loadPostData(id)

  if(post === null){
    return {
      notFound: true,
    }
  }

  const now_date = new Date()
  const modified = new Date(post.modified)
  const diff_day = differenceInDays(now_date, modified)

  let revalidate = 60*60*24 * 2;// 2日
  if(diff_day <= 1){
    revalidate = 60
  }

  post.content = await MDtoHtml(post.content)
  return {
    props: {
      postData: post
    },
    revalidate
  }
}

export const Page: NextPage<Props> = ({ postData }) => {
  return (
    <>
      <Meta description={postData.description} title={postData.title}/>
      <BreadJsonLd title={postData.id}/>
      <Ogp description={postData.description} title={postData.title}/>
      <div className={PostStyle.container}>
        <Container  className='p-0'>
          <article className={`py-3 p-0`}>
            <div className={`p-4 p-md-5 bg-light ${PostStyle.shadow}`}>
              <PostHeader title={postData.title} published={postData.published} modified={postData.modified} tags={postData.tags}/>
              
              <div className={`my-5 ${StyleMD.MD_container}`} dangerouslySetInnerHTML={{ __html: postData.content }} />
              
            </div>
            <footer className="card  mt-3">
              <h2 className="fs-5 card-header">書いた人</h2>
              <div className="card-body d-flex">
                <img src="/ogp.jpg" width={64} height={64} style={{ objectFit: "contain" }} alt="profile_image" />
                <div className='container'>
                  <p className="fs-4 card-title">お茶の葉</p>
                  <p className="card-text">物理とプログラミングが好きな人</p>
                </div>
              </div>
            </footer>
          </article>
        </Container>
      </div>
    </>
  )
}

export default Page