import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
  code: string | null;
}

const initialState = { code: `// Welcome to the online RGE.js editor/playground!
// Type your code here, then press the play icon to run it! ` } as CounterState

const codeContentSlice = createSlice({
  name: 'codeContent',
  initialState,
  reducers: {
    updateCodeContent(state, action: PayloadAction<string | null>) {
      state.code = action.payload
    },
    setStarterCode(state) {
state.code = `// Welcome to the online RGE.js editor/playground!
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
}`
    }
  },
})

export const { updateCodeContent, setStarterCode } = codeContentSlice.actions
export default codeContentSlice.reducer