import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import PermissionSlice from './permission';
import DataSlice from './DailyData';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};
const AllReducer = combineReducers({
    permission: PermissionSlice.reducer,
    dailyData: DataSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, AllReducer);

const Store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(Store);
export default Store;

