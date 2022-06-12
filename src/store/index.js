import { createStore, combineReducers } from 'redux';
import reducer from '../reducers';
import filterReducer from '../reducers/filters';
import heroesReducer from '../reducers/heroes'


const store = createStore(combineReducers({heroesReducer, filterReducer}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;