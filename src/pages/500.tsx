import Link from "next/link"
import Head from "next/head"

export default function Custom404() {
  return (
    <>
      <Head>
        <title>500-お茶の葉</title>
      </Head>
      <h1 className="text-center p-5">500 - Server-side error occurred<br />＼(；≧ω≦)／</h1>
      <hr />
      <Link href="/">
          <p className="text-center my-5 fs-1">Home<i className="bi bi-house" /></p>
      </Link>
      <Link href="/posts">
          <p className="text-center my-5 fs-1">Posts<i className="bi bi-pencil-square" /></p>
      </Link>
    </>
  )
}