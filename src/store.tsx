import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthorState {
  selectedAuthor: string;
}

const initialAuthorState: AuthorState = {
  selectedAuthor: '',
};

const authorSlice = createSlice({
  name: 'author',
  initialState: initialAuthorState,
  reducers: {
    setAuthor: (state, action: PayloadAction<string>) => {
      state.selectedAuthor = action.payload;
    },
  },
});

interface Post {}

const initialPostsState: Post[] = []

const postsSlice = createSlice({
  name: "posts",
  initialState: initialPostsState,
  reducers: {
    loadPosts: (_, action: PayloadAction<Post[]>) => {
      return action.payload;
    },
  },
});

export const { setAuthor } = authorSlice.actions;
export const { loadPosts } = postsSlice.actions;

const store = configureStore({
  reducer: {
    author: authorSlice.reducer,
    posts: postsSlice.reducer,
  },
});

export default store;
