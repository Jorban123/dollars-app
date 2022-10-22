import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type languages = {
    [key: string]: string
}

const lang: languages = {
    'ru': 'RUB',
    'en': 'USD',
    'en-US': 'USD'
}

export const defaultCurSlice = createSlice({
    name: 'defaultCur',
    initialState: {
        value: lang[navigator['language']]
    },
    reducers: {
      changeCur: (state: {value: string}, action: PayloadAction<string>) => {
        state.value = action.payload
      }
    },
  })

export const { changeCur } = defaultCurSlice.actions

export const selectDefaultCur = (state: {defaultCur: {value: string}}) => state.defaultCur.value

export default defaultCurSlice.reducer