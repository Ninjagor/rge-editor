import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
  code: string | null;
}

const initialState = { code: `// Welcome to the online RGE.js editor/playground!
// Type your code here, then press the play icon to run it!` } as CounterState

const codeContentSlice = createSlice({
  name: 'codeContent',
  initialState,
  reducers: {
    updateCodeContent(state, action: PayloadAction<string | null>) {
      state.code = action.payload
    },
  },
})

export const { updateCodeContent } = codeContentSlice.actions
export default codeContentSlice.reducer