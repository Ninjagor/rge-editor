"use client";
import React, { useRef, useEffect } from 'react';
// @ts-expect-error
import * as r from "rge.js";

import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';

import { updateCodeContent } from '@/lib/redux/features/codeContent/codeContentSlice';


const CodeCanvas = () => {
    const code = useAppSelector((state) => state.codeContentSlice.code)
    const dispatch = useAppDispatch();

    useEffect(() => {
        const storedCode = localStorage.getItem("codeContent");
    
        if (storedCode) {
          dispatch(updateCodeContent(storedCode));
        }
      }, [dispatch]);
  const canvasRef = useRef(null);
  useEffect(() => {
    // Takes the canvas ID and expected FPS.
    const rge = new r.Engine('gameCanvas', 60);
    (window as any).r = r;
    try {
        eval(code as string);
    } catch(error) {
        alert("An error occured. Check console for details")
        console.log(error)
    }

    return () => {
        // Safely dispose of RGE when component is unmounted.
        rge.stop()
    }
  }, [code])
  return (
    <>
     <canvas
      ref={canvasRef}
      id="gameCanvas"
      // Set your desired canvas size
      width={800}
      height={350}
      style={{ border: '1px solid rgba(0, 0, 0, 0.2)', borderRadius: '5px', width: '100%' }}
    />
    </>
  )
}

export default CodeCanvas