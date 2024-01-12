import { Fragment } from "react";

const OutputTerminal = ({ output, isErr }) => {
    const lines = output.split('\n');
    const processedOutput = lines.map((line, index) => (
        <Fragment key={index}>
            {index > 0 && <br />}
            {index < lines.length - 1 && <span>&#62; </span>}
            {isErr ? <span className=" text-red-600">{line}</span> : <span>{line}</span>}
        </Fragment>
    ));
    

    return (
        <div className="bg-black text-white p-4 rounded whitespace-pre-line overflow-x-auto h-72">
            <span>&#62;</span>
            {isErr && <span className=" text-red-600">&#62;Are bhawa error ala 😕<br/></span>}
            {processedOutput}
        </div>
    );
}

export default OutputTerminal