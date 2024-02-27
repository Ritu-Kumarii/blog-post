// src/store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedAuthor: '',
};


const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action) => {
      state.selectedAuthor = action.payload;
    },
  },
});


export const { setAuthor } = authorSlice.actions;

const store = configureStore({
  reducer: {
    author: authorSlice.reducer,
  },
});

export default store;
