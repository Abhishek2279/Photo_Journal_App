import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    location: null,
    camera: null,
};

const PermissionSlice = createSlice({
    name: 'permission',
    initialState,
    reducers: {
        setLocation: (state, action) => {
            state.location = action.payload;
        },
        setcamera: (state, action) => {
            state.adminToken = action.payload;
        },
    },
});

export const setLocation = PermissionSlice.actions.setLocation;
export const setcamera = PermissionSlice.actions.setcamera;
export const locationAccess = state => state.permission.location;
export const camearAccess = state => state.permission.camera;
export default PermissionSlice;
