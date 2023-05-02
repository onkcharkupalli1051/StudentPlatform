import {createSlice} from '@reduxjs/toolkit'

export const scheduleSlice = createSlice({
    name:'schedule',
    initialState:{
        schedule:null
    },
    reducers:{
        setSchedule: (state, action) => {
            state.schedule = action.payload
        }
    }
})

export const {setSchedule} = scheduleSlice.actions