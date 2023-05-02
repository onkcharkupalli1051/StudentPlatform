import {createSlice} from '@reduxjs/toolkit'

export const adminSlice = createSlice({
    name:'admin',
    initialState:{
        admin:null
    },
    reducers:{
        setAdmin: (state, action) => {
            state.admin = action.payload;
        }
    }
})

export const {setAdmin} = adminSlice.actions