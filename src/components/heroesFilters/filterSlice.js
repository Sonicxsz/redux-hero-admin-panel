import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filters: [],
    filtered: 'all'
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filtering: (state, action) => {
            state.filtered = action.payload},
        filtersFetched: (state, action) => {state.filters = action.payload}
    }
})



const {actions, reducer} = filtersSlice;

export default reducer

export const {
    filtering,
    filtersFetched
} = actions
