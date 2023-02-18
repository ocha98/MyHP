import PostGrid from "components/organism/PostsGrid";
import Ogp from "components/Ogp";
import Meta from 'components/Meta'
import { GetServerSideProps, NextPage } from 'next'
import { PostMeta } from "types";
import { getPostMetaByTag, getTagProperty } from "lib/microcmsAPI";

type SSRProps = {
    posts: PostMeta[],
    tag_name: string
}

export const getServerSideProps: GetServerSideProps<SSRProps> = async (context) => {
  let tag_id = context.query["id"] as string
  let tagp = await getTagProperty(tag_id)
  
  if(tagp === null){
    return {
      notFound: true,
    }
  }
  
  let data = await getPostMetaByTag(tag_id)
    return {
        props:{
            posts:data,
            tag_name: tagp.text
        }
    }
}

const Page: NextPage<SSRProps> = ({ posts, tag_name }) => {
  return (
    <>
      <Meta description={`タグ：${tag_name}がついている投稿一覧です。`} title={tag_name}/>
      <Ogp title={tag_name} description={`タグ：${tag_name}がついている投稿一覧です。`} />
      <div className="container text-center">
        <h1 className="my-5"><i className="bi bi-tag"></i>{tag_name}</h1>
        <p>{`タグ「${tag_name}」がついている投稿一覧です。投稿日が新しい順に並んでいます。`}</p>
      </div>
      <PostGrid postDatas={posts} />
    </>
  )
}

export default Page