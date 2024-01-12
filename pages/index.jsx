import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import Playground from '@/components/playground'
import { useRef } from 'react'



const inter = Inter({ subsets: ['latin'] })
const gaglin = localFont({ src: '../public/Font/Gagalin-Regular.otf' })

export default function Home() {
  const playGroundRef = useRef(null);

  const scrollToSection = () => {
    // console.log(playGroundRef)
    if (playGroundRef.current) {
      playGroundRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <main
        className={`flex lg:min-h-screen flex-col items-center px-24 pt-24 lg:justify-center`}
      >
        <h1 className={`${gaglin.className} text-orange-600 text-6xl sm:text-9xl mb-5 sm:mb-8`}>GavathiLang</h1>
        <p className={` text-center ${inter.className} sm:text-lg font-semibold`}>A marathi toy programming language written in Python</p>
        <code className=' text-center bg-slate-800 px-2 py-1 rounded-md my-7 text-slate-300 text-sm w-64 font-semibold'>GavathiLang example.gavathi</code>
        <div className=' flex justify-center items-center my-8'>
          <button className='button-orange mr-4' onClick={scrollToSection}>Playground</button>
          <a href='https://github.com/SonuSV7719/GavathiLang' target='_blank'><button className='button-white text-orange-600'>View Source</button></a>
        </div>
        <p className=' text-center'>Made by <a className=' font-bold text-orange-600 hover:text-orange-700' href='https://github.com/SonuSV7719' target='_blank'>@SonuSV7719</a></p>

      </main>
      <div ref={playGroundRef}>
        <Playground />
      </div>
    </>
  )
}
