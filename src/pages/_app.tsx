import { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap-icons/font/bootstrap-icons.css"
import 'highlight.js/scss/github-dark-dimmed.scss'
import '../styles/globals.css'
import 'katex/dist/katex.min.css'
import { BIZ_UDPGothic } from 'next/font/google'
import Header from 'components/organism/Header'
import Footer from 'components/organism/Footer'
import Script from 'next/script'
import { createContext, useState } from 'react'

const biz = BIZ_UDPGothic({ weight:["400", "700"], subsets: ['latin']})

export const AdSenseContext = createContext<boolean>(false);

export default function MyApp({ Component, pageProps }: AppProps) {
  const [adsLoaded, setAdsLoaded] = useState(false);
  return(
    <AdSenseContext.Provider value={adsLoaded}>
      <Script
        src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8825122287641994"
        crossOrigin = "anonymous"
        strategy = "afterInteractive"
        onLoad={() => setAdsLoaded(true)}
      />

      <style jsx global>{`
        html {
          font-family: ${biz.style.fontFamily};
        }
      `}</style>
        <Header />
          <Component {...pageProps} />
        <Footer />
    </AdSenseContext.Provider>
  )
}
