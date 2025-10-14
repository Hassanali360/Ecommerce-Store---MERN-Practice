import {createSlice} from "@reduxjs/toolkit";



const initialState = {
    isAutheenticated: false,
    isLoading : false,
    User : null
}


const authSlice = createSlice({
    name : 'auth', 
    initialState,
    reducers: {
        setUser: (state, actions) => {

        }
    }
})


export const {setUser} = authSlice.actions;
export default authSlice.reducer