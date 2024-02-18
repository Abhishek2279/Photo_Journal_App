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
            if (state.maxTemp === null || state.minTemp === null) {
                state.maxTemp = {
                    temp: action.payload.temperature,
                    date: action.payload.date?.toLocaleDateString('en-US', options)
                };
                state.minTemp = {
                    temp: action.payload.temperature,
                    date: action.payload.date?.toLocaleDateString('en-US', options)
                };
            } else {
                if (action.payload.temperature > state.maxTemp.temp) {

                    state.maxTemp = {
                        temp: action.payload.temperature,
                        date: action.payload.date?.toLocaleDateString('en-US', options)
                    };
                }
                if (action.payload.temperature < state.minTemp.temp) {
                    state.minTemp = {
                        temp: action.payload.temperature,
                        date: action.payload.date?.toLocaleDateString('en-US', options)
                    };
                }
            }
        },
    },
});

export const addData = DataSlice.actions.addData;
export const dailyUpdate = state => state.dailyData.dailyUpdate;
export const maxTemp = state => state.dailyData.maxTemp;
export const minTemp = state => state.dailyData.minTemp;
export default DataSlice;
