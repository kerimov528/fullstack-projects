import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { Game } from "../../interfaces/Game"

interface GameState {
    games: Game[] | null
    loading: boolean
    singleGame: Game | null
    error: any
}

const initialState: GameState = {
    games: [],
    loading: false,
    singleGame: null,
    error: null
}

export const getGames = createAsyncThunk<Game[]>(
    'games/getGames',
    async (_, thunkApi) => {
        try {
            const response = await axios.get("http://localhost:5000/api/games")
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)

export const createGames = createAsyncThunk<Object, Game[]>(
    "games/createGame",
    async (data, thunkApi) => {
        try {
            const response = await axios.post("http://localhost:5000/api/games/game", data)
            thunkApi.dispatch(getGames())
            return response.data

        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)


export const gameSlice = createSlice({
    name: "games",
    initialState,
    reducers: {
        setGame: (state, action: PayloadAction<Game[]>) => {
            state.games = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getGames.pending, state => {
            state.loading = true
        })
        builder.addCase(getGames.fulfilled, (state, action) => {
            state.loading = false
            state.games = action.payload
        })
    }
})

export default gameSlice.reducer
export const { setGame } = gameSlice.actions