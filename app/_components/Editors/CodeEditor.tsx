"use client";
import React, { useEffect, useState } from 'react';
import { Editor } from '@monaco-editor/react';

import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { updateCodeContent, setStarterCode } from '@/lib/redux/features/codeContent/codeContentSlice';

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
    if (!storedCode || storedCode.trim() == "") {
      dispatch(setStarterCode());
setLocalCode(`// Welcome to the online RGE.js editor/playground!
// Type your code here, then press the play icon to run it! 
// Some example code has been provided for you.

const SceneManager = new r.SceneManager();
const Scene1 = new r.Scene('gameCanvas', 30);

SceneManager.addScene('scene1', Scene1, {
  setup: setup,
  tick: tick,
});

SceneManager.setScene('scene1');

let moving_rectangle;

function setup() {
  const currentEngine = SceneManager.currentEngine;
  currentEngine.addEntity(new r.Text(100, 100, "Hello World!", 25));

  moving_rectangle = new r.Rect(500, 100, 50, 50, "red");
  moving_rectangle.id = "moving_red_rectangle"
  currentEngine.addEntity(moving_rectangle);
  currentEngine.debugEntity(moving_rectangle);
}

function tick() {
  const currentEngine = SceneManager.currentEngine;
  const new_ellipse = new r.Ellipse(currentEngine.mouseX, currentEngine.mouseY, 10, "#a1a1a1");
  currentEngine.addEntity(new_ellipse);
  setTimeout(() => {
  currentEngine.destroyEntity(new_ellipse);
  }, 300);

  if (moving_rectangle.y < 300) moving_rectangle.y += 1;
}`);
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
