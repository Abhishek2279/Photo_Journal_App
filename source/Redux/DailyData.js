import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

const options = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
};

const initialState = {
    dailyUpdate: [],
    maxTemp: null,
    minTemp: null,
};

const DataSlice = createSlice({
    name: 'dailyData',
    initialState,
    reducers: {
        addData: (state, action) => {
            const day1 = moment(action.payload.date);
            const day2 = moment(state.dailyUpdate[0]?.date)
            if (day1?.date() === day2?.date()) {
                state.dailyUpdate[0] = action.payload
            }
            else {

                state.dailyUpdate = [action.payload, ...state.dailyUpdate];
            }
            if (!state.maxTemp || action.payload.temperature > state.maxTemp) {
                state.maxTemp = {
                    temp: action.payload.temperature,
                    date: action.payload.date?.toLocaleDateString('en-US', options)
                };
            }
            if (!state.minTemp || action.payload.temperature < state.minTemp) {
                state.minTemp = {
                    temp: action.payload.temperature,
                    date: action.payload.date?.toLocaleDateString('en-US', options)
                };
            }
        },
        updateData: (state, action) => {
            state.dailyUpdate[0] = action.payload
            if (!state.maxTemp || action.payload.temperature > state.maxTemp) {
                state.maxTemp = {
                    temp: action.payload.temperature,
                    date: action.payload.date?.toLocaleDateString('en-US', options)
                };
            }
            if (!state.minTemp || action.payload.temperature < state.minTemp) {
                state.minTemp = {
                    temp: action.payload.temperature,
                    date: action.payload.date?.toLocaleDateString('en-US', options)
                };
            }
        },
    },
});

export const addData = DataSlice.actions.addData;
export const updateData = DataSlice.actions.updateData;
export const dailyUpdate = state => state.dailyData.dailyUpdate;
export const maxTemp = state => state.dailyData.maxTemp;
export const minTemp = state => state.dailyData.minTemp;
export default DataSlice;
