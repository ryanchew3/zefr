import type { NextPage } from 'next'
import Image from 'next/image'
import { useState } from 'react'
import { useInput } from '../hooks/inputHook'
import Head from 'next/head'
import ReactClipboard from 'react-clipboardjs-copy'
import 'react-clipboardjs-copy'
import { addhttp } from './api/n/[short]'

/**
 * The home page for users to generate the shortened url
 * @returns {JSX.Element}
 */
const Home: NextPage = () => {
  const { value, bind, reset } = useInput('')
  const [ result, setResult ] = useState('')
  const [ isCopied, setIsCopied ] = useState('')

  /**
   * The regex for website checking
   */
  const re = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    
    if (!re.test(value)) {
    } else {
      
      /**
       * Removes the 'http://' or 'https://' for processing
       */
      let url : string = value.replace(/^(?:f|ht)tps?\:\/\//, "")
      url = addhttp(url)
      let uri = new URL(url)
      console.log(url)
      const res = await fetch('/api/n/' + uri.toString)
      .then(res => {
        return res.json()
      })
      setResult(res.new)
      reset();
    }
  }

  return (
    <div className="flex flex-col w-screen justify-center align-center items-center bg-gray-900 text-gray-300">
      <Head>
        <title>Zefr</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col container justify-center align-center items-center">
        <div className="flex flex-col container justify-center min-h-screen align-center items-center" >
          <form className="flex flex-col container justify-center align-center items-center" onSubmit={handleSubmit}>
            <label>Url to shorten</label>
            <input className="border-b-2 border-solid bg-gray-900 text-gray-300 max-w-md text-center" type="text" {...bind} />
            <br />
            <button className="border-solid border-2 p-1" type="submit">Shorten</button>
          </form>
          <br />
          <div>
            <ReactClipboard 
              text={result} 
              onSuccess={() => setIsCopied("Copied!")}
              ><button className="border-0 p-0 m-0"> {'> ' + result + ' <'}</button></ReactClipboard>
          </div>
          <br />
          <p>{isCopied}</p>
          <br />
          <footer className="flex flex-col container justify-center align-center items-center">
            Made by <a href="http://cassie.id">Cassie C</a>
            <a href="https://github.com/ryanchew3" ><Image className="pt-3" src="/github.png" alt="" height="24" width="24" /></a>
          </footer>
        </div>
      </main>
    </div>
  )
}

export default Home
