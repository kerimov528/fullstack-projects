import { configureStore } from '@reduxjs/toolkit'
import globalReducer from 'feature'

const store = configureStore({
    reducer: {
        global: globalReducer,
    }
})

export default store