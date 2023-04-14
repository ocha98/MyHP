import PostGrid from "components/organism/PostsGrid";
import Ogp from "components/Ogp";
import Meta from 'components/Meta'
import { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import { PostMeta } from "types";
import { getPostMetaByTag, getAllTagIds, getTagProperty } from "lib/microcmsAPI";
import { ParsedUrlQuery } from 'node:querystring'

interface Params extends ParsedUrlQuery {
  id: string
}

type Props = {
  posts: PostMeta[],
  tag_name: string
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const ids = await getAllTagIds()
  let paths = []
  for(let v of ids){
    paths.push({params: {id: v["id"]}})
  }

  return { 
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props> = async ( context ) => {
  const { id } = context.params as Params 
  let tagp = await getTagProperty(id)
  
  if(tagp === null){
    return {
      notFound: true,
    }
  }
  
  let data = await getPostMetaByTag(id)
    return {
        props:{
            posts:data,
            tag_name: tagp.text
        }
    }
}

const Page: NextPage<Props> = ({ posts, tag_name }) => {
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