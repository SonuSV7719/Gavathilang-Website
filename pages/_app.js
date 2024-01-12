import '@/styles/globals.css'
import Head from 'next/head'
export default function App({ Component, pageProps }) {
  return(
    <>
      <Head>
          <meta name="description" content="GavathiLang is marathi programming language developed by Sonu Vishwakarma" />
          <title>GvathiLang - A Marathi toy Programming language</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
