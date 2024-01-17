"use client";
import React, { useEffect, useState } from 'react';
import { Editor } from '@monaco-editor/react';

import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { updateCodeContent } from '@/lib/redux/features/codeContent/codeContentSlice';

interface CodeEditorInterface {
  height: string;
  customStyles?: string;
}

const CodeEditor = () => {
  const liveCode: string | null = useAppSelector((state) => state.codeContentSlice.code);
  const dispatch = useAppDispatch();
  const [localCode, setLocalCode] = useState<string | null>(liveCode);

  useEffect(() => {
    const storedCode = localStorage.getItem("codeContent");

    if (storedCode) {
      dispatch(updateCodeContent(storedCode));
      setLocalCode(storedCode);
    }
  }, [dispatch]);

  function handleCodeChange(value: string | null, event: any) {
    setLocalCode(value);
  }

  useEffect(() => {
    if (localCode !== liveCode) {
      dispatch(updateCodeContent(localCode));
      localStorage.setItem("codeContent", localCode || "");
    }
  }, [localCode, liveCode, dispatch]);

  return (
    <>
      <div className="mt-[0px]" />
      <Editor
        height="90vh"
        defaultLanguage="javascript"
        defaultValue={"// Hi"}
        language='javascript'
        theme='light'
        value={localCode || ""}
        // @ts-expect-error
        onChange={handleCodeChange}
        options={{
          fontSize: 20,
          minimap: { enabled: false }
        }}
      />
    </>
  );
}

export default CodeEditor;
