import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { gavathiLang } from "@/packages/gavathilang-parser/gavathilang_highlighter";

const Documentation = () => {

    const codes = {
        variable: `hello gavathilang

bhawa he ahe name = "Sonu Vishwakarma"
bol naa bhawa (name)

bye gavathilang`,
        printCode: `hello gavathilang

bol naa bhawa ("Hello World!!")

bye gavathilang`,
        whileLoop: `hello gavathilang
        
bhawa he ahe start = 0
jewha paryant bhawa start < 10 ahe:
    bol naa bhawa (start)
    bhawa he ahe start += 1

bye gavathilang`,
        ifElse: `hello gavathilang

bhawa he ahe color = "yellow"
jewha bhawa color == "yellow" ahe:
    bol naa bhawa ("Color Yellow")
nahi tar jewha bhawa color == "blue" ahe:
    bol naa bhawa("Color Blue")
nahi tar:
    bol naa bhawa ("Mala nahi mahit")
    
bye gavathilang`
    }

    return (
        <div>
            <h1 className=" text-3xl sm:text-4xl font-extrabold mb-5 mt-20">Documentation</h1>
            <p>Gavathilang is marathi scripting based language which build on top of python so that you can also use python code in same interpreter 🌐✨</p>

            <div className="flex lg:flex-row flex-col lg:flex-wrap lg:gap-32 gap-2 mb-5 justify-center items-center mt-20">
                <div className="mb-5 lg:mb-0">
                    <div className="text-center mb-2">Print Statement</div>
                    <div className="border-b border-white mb-2"></div>
                    <CodeMirror
                        theme={vscodeDark}
                        className="py-5 sm:w-full w-80"
                        minHeight="5rem"
                        onChange={(data) => setCode(data)}
                        extensions={[gavathiLang()]}
                        value={codes.printCode}
                    />
                </div>

                <div className="mb-5 lg:mb-0">
                    <div className="text-center mb-2">Variable declaration</div>
                    <div className="border-b border-white mb-2"></div>
                    <CodeMirror
                        theme={vscodeDark}
                        className="py-5 sm:w-full w-80"
                        minHeight="5rem"
                        onChange={(data) => setCode(data)}
                        extensions={[gavathiLang()]}
                        value={codes.variable}
                    />
                </div>
            </div>

            <div className="flex lg:flex-row flex-col lg:flex-wrap lg:gap-32 gap-2 mb-5 justify-center items-center mt-20">
                <div className="mb-5 lg:mb-0">
                    <div className="text-center mb-2">if...elif..else</div>
                    <div className="border-b border-white mb-2"></div>
                    <CodeMirror
                        theme={vscodeDark}
                        className="py-5 sm:w-full w-80"
                        minHeight="18rem"
                        onChange={(data) => setCode(data)}
                        extensions={[gavathiLang()]}
                        value={codes.ifElse}
                    />
                </div>

                <div className="mb-5 lg:mb-0">
                    <div className="text-center mb-2">While loop</div>
                    <div className="border-b border-white mb-2"></div>
                    <CodeMirror
                        theme={vscodeDark}
                        className="py-5 sm:w-full w-80"
                        minHeight="18rem"
                        onChange={(data) => setCode(data)}
                        extensions={[gavathiLang()]}
                        value={codes.whileLoop}
                    />
                </div>
            </div>
        </div>
    )
}

export default Documentation