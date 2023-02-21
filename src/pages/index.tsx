import { GetStaticProps, NextPage } from 'next';
import { PostMeta } from 'types';
import { getSortedPostMeta } from 'lib/microcmsAPI';
import PostGrid from 'components/organism/PostsGrid';
import Ogp from 'components/Ogp';
import Meta from 'components/Meta'
import Link from 'next/link';

type Props = {
  recentPosts: PostMeta[]
}

export const getStaticProps: GetStaticProps<Props> = async ( context ) => {
  const num = 4
  let data = await getSortedPostMeta(num)

  data = data.slice(0,  Math.min(num, data.length))
  return {
    props: {
      recentPosts: data
    },
    revalidate: 60*60 //１時間
  }
}

const Home: NextPage<Props> = ({ recentPosts }) => {
  const info_block_size = "100px"
  const info_icon_size = 60
  return (
    <>
      <Meta description="物理とプログラミングが好きです。学んだことを投稿しています！" title='Home'/>
      <Ogp title="Home" description="物理とプログラミングが好きです" />

      <main>
        <div className='py-5 text-center container '>
          <div className='mx-auto my-5'>
            <p className='display-6 fw-normal'>お茶の葉</p>
            <p className='lead'>
              ここは備忘録庫<i className="bi bi-box-seam"></i>です。
            </p>
          </div>
        </div>
        <article className='py-5 bg-light text-center'>
          <h2 className='fw-normal mb-4 border-bottom container'>Recent Posts</h2>
          <PostGrid postDatas={recentPosts} />
          <Link href="/posts"><p style={{fontSize:"1.3rem", margin:"0"}}>---More---</p></Link>
        </article>
        <article className='p-5  text-center container'>
          <h2 className="fw-normal border-bottom ">Information</h2>

          <div className="row my-4 ">
            <section className="col-sm-4 col-lg-3" style={{ height: info_block_size }}>
              <a href="https://twitter.com/I_am_Ochappa" target="_blank" rel='noopener noreferrer nofollow'>
                <svg xmlns="http://www.w3.org/2000/svg" width={info_icon_size} height={info_icon_size} fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                </svg>
                <h3>Twitter</h3>
              </a>
            </section>
            <section className="col-sm-4 col-lg-3" style={{ height: info_block_size }}>
              <a href="https://github.com/ocha98" target="_blank" rel='noopener noreferrer nofollow'>
                <svg xmlns="http://www.w3.org/2000/svg" width={info_icon_size} height={info_icon_size} fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                </svg>
                <h3>GitHub</h3>
              </a>
            </section>
            <section className="col-sm-4 col-lg-3" style={{ height: info_block_size }}>
              <a href="https://atcoder.jp/users/shinnshinn" target="_blank" rel='noopener noreferrer nofollow'>
                <h3 style={{ lineHeight: info_block_size }}>AtCoder</h3>
              </a>
            </section>
            <section className="col-sm-4 col-lg-3" style={{ height: info_block_size }}>
              <a href="https://codeforces.com/profile/shinnshinn" target="_blank" rel='noopener noreferrer nofollow'>
                <h3 style={{ lineHeight: info_block_size }}>Codeforces</h3>
              </a>
            </section>
          </div>
        </article>
      </main>
    </>
  )
}

export default Home
