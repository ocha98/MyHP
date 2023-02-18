import { Container, Button } from "react-bootstrap"
import Ogp from "components/Ogp"
import Meta from "components/Meta"

const about = () => {
  return (
    <>
      <Meta description="私についての説明です。SNSなどの連絡先を記載しています。" title="About"/>
      <Ogp title="About" description="aboutページ" />

      <h1 className="text-center my-5">About</h1>
        <main className="bg-light pt-3">
          <Container className="py-3">
          <section className="py-3">
            <h2 className="border-bottom border-info p-1 my-2"><i className="bi bi-person-fill"/>誰？何者？</h2>
            <p>お茶の葉と申します。物理とプログラミングが好きです。</p>
            <p>今は大学生で情報系の学部に在籍中です。</p>
          </section>
          <section className="py-3">
            <h2 className="border-bottom border-info p-1 my-2"><i className="bi bi-code"/> 扱うプログラミング言語は？</h2>
            <p>競技プログラミングではC++、このサイトの作成ではJavaScript、TypeScriptを利用しています。</p>
            <p>他にJava、Pythonもたまに扱います。</p>
            <p>Pythonはライブラリも豊富なので何かツールを作る時や計算ツールとして利用してます。</p>
          </section>
          <section className="py-3">
            <h2 className="border-bottom border-info p-1 my-2"><i className="bi bi-globe"/> SNS等のアカウントを教えて！</h2>
            <a href="https://twitter.com/I_am_Ochappa" target="_blank" rel='noopener noreferrer nofollow'><Button variant="secondary mx-2 my-1"><i className="bi bi-twitter"/> Twitter</Button></a>
            <a href="https://github.com/ocha98" target="_blank" rel='noopener noreferrer nofollow'><Button variant="secondary mx-2 my-1"><i className="bi bi-github"/> GitHub</Button></a>
            <a href="https://atcoder.jp/users/shinnshinn" target="_blank" rel='noopener noreferrer nofollow'><Button variant="secondary mx-2 my-1">AtCoder</Button></a>
            <a href="https://codeforces.com/profile/shinnshinn" target="_blank" rel='noopener noreferrer nofollow'><Button variant="secondary mx-2 my-1">Codeforces</Button></a>
          </section>
          <section className="py-3">
            <h2 className="border-bottom border-info p-1 my-3"><i className="bi bi-send"/> 連絡手段は？</h2>
            <p>上に記載のTwitter<i className="bi bi-twitter"/>にてお知らせください。</p>
            <p>気づかないこともあると思います。。。</p>
          </section>
        </Container>
      </main>
    </>
  )
}
export default about