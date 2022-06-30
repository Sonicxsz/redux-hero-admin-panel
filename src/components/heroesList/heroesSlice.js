import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const heroesAdapter = createEntityAdapter();

const initialState = heroesAdapter.getInitialState({
    heroesLoadingStatus: 'idle',
})


export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes',
    async () =>{
        const {request} = useHttp();
        return await request("http://localhost:3001/heroes")
    }
)
 
const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroesAdd: (state, action) => {
            heroesAdapter.addOne(state, action.payload) 
        },
        heroesDelete:( state, action) => {
            heroesAdapter.removeOne(state, action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => {state.heroesLoadingStatus = 'loading'})
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                heroesAdapter.setAll(state, action.payload);
                state.heroesLoadingStatus = 'idle'
            })
            .addCase(fetchHeroes.rejected, state => {
                state.heroesLoadingStatus = 'error'
            })
    }
})




const {actions, reducer} = heroesSlice;

export default reducer;

const {selectAll} = heroesAdapter.getSelectors(state => state.heroes)

export const filteredHeroesSelector = createSelector(
    (state) => state.filter.filtered,
    selectAll,
    (filter, heroes) =>{
        if(filter === 'all'){
            return heroes
        }else{
            return heroes.filter(i =>{
                return i.element === filter
            })
        }
    }
);

export const {
    heroesAdd,
    heroesDelete
} = actions;


       
        
     