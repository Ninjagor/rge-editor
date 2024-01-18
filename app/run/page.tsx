import React from "react"
import CodeCanvas from "../_components/CodeRunners/CodeCanvas"

export default function Code() {
    return (
        <>
        <div className="w-full h-[90vh] flex items-center justify-center px-7 py-[100px] flex-col min-h-[700px]">
            <CodeCanvas />
        </div>
        </>
    )
  }
  