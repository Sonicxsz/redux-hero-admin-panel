import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const filterAdapter = createEntityAdapter();

const initialState = filterAdapter.getInitialState({
    filtered: 'all'
})

export const getFilters = createAsyncThunk(
    'filter/getfilter',
    async() =>{
        const {request} = useHttp();
        return await request("http://localhost:3001/filters")
    }

)

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filtering: (state, action) => {
            state.filtered = action.payload},
    },
    extraReducers: (builder) =>{
        builder
            .addCase(getFilters.pending, () =>{})
            .addCase(getFilters.fulfilled, (state, action) => {
                filterAdapter.setAll(state, action.payload)
            })
            .addCase(getFilters.rejected, () =>{console.log('rejectfilter')})
    }
})




const {actions, reducer} = filtersSlice;

export default reducer
export const {selectAll} = filterAdapter.getSelectors(state => state.filter)
export const {
    filtering,
    filtersFetched
} = actions
