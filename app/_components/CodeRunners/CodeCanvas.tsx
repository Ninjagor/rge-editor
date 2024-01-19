"use client";
import React, { useRef, useEffect, useState } from 'react';
// @ts-expect-error
import * as r from "rge.js";

import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';

import ConsoleCapture from 'capture-console-logs';

import { updateCodeContent } from '@/lib/redux/features/codeContent/codeContentSlice';


const CodeCanvas = () => {
    const code = useAppSelector((state) => state.codeContentSlice.code)
    const dispatch = useAppDispatch();

    const [consoleShown, setConsoleShown] = useState<boolean>(false);

    const consoleRef = useRef<HTMLParagraphElement | null>(null);

    useEffect(() => {
        const storedCode = localStorage.getItem("codeContent");
    
        if (storedCode) {
          dispatch(updateCodeContent(storedCode));
        }
      }, [dispatch]);
  const canvasRef = useRef(null);
  useEffect(() => {
    const evaluateCode = async(code: any) => {
      const cc = new ConsoleCapture();
      cc.start()
      try {
        await eval(code as string);
      }
      catch(error) {
        console.log(error)
      }
      cc.stop()
      console.log(cc.getCaptures())
      if (consoleRef.current !== null && consoleRef.current !== undefined) {
        for (let i = 0; i < cc.getCaptures().length; i++) {

          consoleRef.current.innerHTML += `${cc.getCaptures()[i].args[0]}`
          consoleRef.current.innerHTML += `<br>`
        }
      }
    }

    // const hello = fetchD()
    // Takes the canvas ID and expected FPS.
    const rge = new r.Engine('gameCanvas', 120);
    (window as any).r = r;
    evaluateCode(code as string)

    return () => {
        // Safely dispose of RGE when component is unmounted.
        rge.stop()
    }
  }, [code])
  return (
    <>
    <button className="my-3 bg-black text-white px-4 py-2 rounded-full" onClick={() => {setConsoleShown(prev => !prev); console.log("hi")}}>{consoleShown ? "Hide Console" : "Show Console"} <span className="text-sm opacity-70">(beta)</span></button>
    <div className="w-full max-w-[1500px] h-full min-h-[650px]">
      <canvas
        ref={canvasRef}
        id="gameCanvas"
        // Set your desired canvas size
        style={{ border: '1px solid rgba(0, 0, 0, 0.2)', borderRadius: '5px' }}
      />
    </div>

    {/* {consoleShown && ( */}
      {/* <> */}
          <div  className={`absolute top-[50%] left-[50%] w-[75%] h-[50%] max-w-[75%] overflow-y-auto z-[100] items-center justify-start flex-col bg-white border-[1px] border-neutral-300 rounded-lg mt-auto mb-auto py-7 px-8 ${consoleShown==true ? "!flex" : "hidden"}`} style={{ transform: 'translate(-50%, -50%)' }}>
            <h1 className="text-3xl font-semibold tracking-tight text-neutral-700 mb-12">Console</h1>
            <p ref={consoleRef}></p>
            {consoleRef.current?.textContent == "" && <p>No errors found 😁</p>}
          </div>
      {/* </> */}
    {/* )} */}

    </>
  )
}

export default CodeCanvas