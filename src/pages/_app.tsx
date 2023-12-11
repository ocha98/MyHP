import { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap-icons/font/bootstrap-icons.css"
import 'highlight.js/scss/github-dark-dimmed.scss'
import '../styles/globals.css'
import 'katex/dist/katex.min.css'
import { BIZ_UDPGothic } from 'next/font/google'
import Header from 'components/organism/Header'
import Footer from 'components/organism/Footer'

const biz = BIZ_UDPGothic({ weight:["400", "700"], subsets: ['latin']})

export default function MyApp({ Component, pageProps }: AppProps) {

  return(
    <>
      <style jsx global>{`
        html {
          font-family: ${biz.style.fontFamily};
        }
      `}</style>
        <Header />
          <Component {...pageProps} />
        <Footer />
    </>
  )
}
