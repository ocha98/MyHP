import { GetServerSideProps, NextPage } from "next";
import Meta from "components/Meta";
import PostGrid from "components/organism/PostsGrid";
import Ogp from "components/Ogp";
import { getSortedPostMeta } from "lib/microcmsAPI";
import { PostMeta }from 'types'

type SSRProps = {
  allPosts: PostMeta[]
}

export const getServerSideProps: GetServerSideProps<SSRProps> = async () => {
  const allPosts = await getSortedPostMeta(500);
  return {
    props: {
      allPosts
    }
  }
}

const Posts: NextPage<SSRProps> = ({ allPosts }) => {
  return (
    <>
      <Meta description="今までの投稿一覧です。すべての投稿が集まってます！" title="Posts"/>
      <Ogp title="Posts" description="posts" />

      <main>
        <div className="container text-center">
          <h1 className="my-5"><i className="bi bi-pencil-square"></i> Posts</h1>
          <p style={{textAlign:"center"}}>今までの投稿一覧です。投稿日が新しい順に並んでいます。</p>
        </div>
        <PostGrid postDatas={allPosts} />
      </main>
    </>
  )
}

export default Posts
