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
        setIsLoggedin: (state) => {
            state.isLoggedin = true
            localStorage.setItem("isLoggedin", String(state.isLoggedin));
        },
        setLogout: (state) => {
            state.isLoggedin = false
            localStorage.removeItem("isLoggedin");
            localStorage.removeItem("token");
        }
    }
})

export const { setIsLoggedin, setLogout } = isLoggedinSlice.actions

export const checkIsLoggedin = (state: RootState) =>
  state.isLoggedin.isLoggedin;

export default isLoggedinSlice.reducer;
