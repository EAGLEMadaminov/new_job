import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    changeSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
});

export const { changeSearchValue } = bookSlice.actions;
export default bookSlice.reducer;
