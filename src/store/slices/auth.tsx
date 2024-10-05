import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
export interface IsLoggedinState {
  isLoggedin: boolean;
}

const initialState: IsLoggedinState = {
  isLoggedin: localStorage.getItem('isLoggedin') === 'true' || false,
};

export const isLoggedinSlice = createSlice({
  name: 'isLoggedin',
  initialState,
  reducers: {
    setIsLoggedin: (state, action: PayloadAction<boolean>) => {
      state.isLoggedin = action.payload;
      localStorage.setItem('isLoggedin', String(state.isLoggedin));
    },
  },
});

export const { setIsLoggedin } = isLoggedinSlice.actions;

export const checkIsLoggedin = (state: RootState) =>
  state.isLoggedin.isLoggedin;

export default isLoggedinSlice.reducer;
