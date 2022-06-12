const initialState = {
    filters: [],
    filtered: 'all'
}

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_FILTER':
            return{
                ...state,
                filtered: action.payload
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload
            }    
        default: return state
    }
}

export default filterReducer;