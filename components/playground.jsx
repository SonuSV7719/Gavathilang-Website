import { useEffect, useRef, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { gavathiLang } from "@/packages/gavathilang-parser/gavathilang_highlighter";
import axios from "axios";
import OutputTerminal from "./OutputTerminal";
import ReactLoading from 'react-loading';
import Documentation from "./documentation";


function Playground() {

  const codeSnippet = `hello gavathilang
# Print on terminal (Output) --> comments
bol naa bhawa ("My name is Sonu")

bol naa bhawa ("Just a fun project")

# Variable declaration
bhawa he ahe name = "Sonu Vishwakarma"

bol naa bhawa (name)
bhawa he ahe start = 0

#loops  
jewha paryant bhawa start < 10 ahe:
    bol naa bhawa (start)
    bhawa he ahe start += 1

bhawa he ahe color = "yellow"

#if... else if... else
jewha bhawa color == "yellow" ahe:
    bol naa bhawa ("Color Yellow")
nahi tar jewha bhawa color == "blue" ahe:
    bol naa bhawa("Color Blue")
nahi tar:
    bol naa bhawa ("Mala nahi mahit")
bye gavathilang`;

  const [code, setCode] = useState(codeSnippet);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [isErr, setIsErr] = useState(false);
  const outputRef = useRef(null);
  const lodingRef = useRef(null);
  const run = async () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const formData = new FormData();
    formData.append('code_file', blob, 'code.txt');
    try {
      setLoading(true)
      const res = await axios.post('https://python-server-one.vercel.app/execute', formData);
      if (res.data.isError) {
        setIsErr(true);
      } else {
        setIsErr(false)
      }
      setOutput(res.data.result)
      setLoading(false)
      if (outputRef.current) {
        outputRef.current.scrollIntoView({ behavior: 'smooth' });
      }
      if (lodingRef.current) {
        lodingRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (e) {
      setLoading(false);
      setOutput("Are bhawa server down ahe 😕");
      if (outputRef.current) {
        outputRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  const handleClear = () => {
    setCode("")
  }
  return (
    <div className=" px-8 py-20 sm:py-5">
      <div className="flex sm:flex-row flex-col justify-between gap-10 sm:gap-0">
        <h1 className=" text-4xl font-extrabold flex justify-center items-center">Playground</h1>
        <div className=" flex flex-row justify-center items-center">
          <button className="px-9 py-4 rounded-md bg-orange-600 font-bold hover:bg-orange-700 w-28 mr-4" onClick={run}>{loading ? <ReactLoading type='spinningBubbles' height={24} width={24} /> :  "Run"}</button>
          <button className="px-9 py-4 rounded-md bg-slate-100 font-bold hover:bg-red-200 w-28 text-orange-600" onClick={handleClear}>Clear</button>
        </div>
      </div>

      <CodeMirror
        height="100px"
        theme={vscodeDark}
        className=" py-5 h-[30rem] mt-5"
        minHeight="25rem"
        onChange={(data) => setCode(data)}
        extensions={[gavathiLang()]}
        value={code}
      />

      <div ref={lodingRef}>
        <h1 className=" text-3xl sm:text-4xl font-extrabold mb-5">Output</h1>
        {loading && <ReactLoading type='balls' height={24} width={24} />}
        <div ref={outputRef} className=" mb-5">
          <OutputTerminal output={output} isErr={isErr} />
        </div>
      </div>

      <Documentation />

    </div>
  )
}

export default Playground
