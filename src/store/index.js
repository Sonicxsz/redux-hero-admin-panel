import { configureStore } from '@reduxjs/toolkit';
import filter from '../components/heroesFilters/filterSlice';
import heroes from '../components/heroesList/heroesSlice';

const stringMiddleware = () => (next) => (action) =>{
        if(typeof action === 'string'){
            return next({type: action})
        }else{
            return next(action)
        }
    }

const store = configureStore({
    reducer: {filter, heroes},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production'
})
console.log(store.getState())


// }
// const store = createStore(
//     combineReducers({heroesReducer, filterReducer}),
//     compose(applyMiddleware(ReduxThunk, stringMiddleware),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     )

// );

export default store;