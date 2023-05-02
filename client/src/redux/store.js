import {configureStore} from '@reduxjs/toolkit';
import {alertSlice} from "./features/alertSlice";
import { userSlice } from './features/userSlice';
import { adminSlice } from './features/adminSlice';
import { scheduleSlice } from './features/scheduleSlice';

export default configureStore({
    reducer: {
        alerts: alertSlice.reducer,
        user: userSlice.reducer,
        admin: adminSlice.reducer,
        schedule: scheduleSlice.reducer
    }
});

