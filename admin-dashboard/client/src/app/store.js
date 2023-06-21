import { configureStore } from '@reduxjs/toolkit'
import globalReducer from 'feature'
import { api } from 'feature/api';

const store = configureStore({
    reducer: {
        global: globalReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefault) => getDefault().concat(api.middleware)
})

export default store