import '@/styles/globals.css'
import Head from 'next/head'
import Script from 'next/script'
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="description" content="GavathiLang is marathi programming language developed by Sonu Vishwakarma" />
        <title>GavathiLang - A Marathi toy Programming language</title>
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4839020407876260"
          crossorigin="anonymous" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
