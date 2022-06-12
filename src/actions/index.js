export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const filtersFetched = (filters) =>{
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

export const filtering = (activeFilter) =>{
    return {
        type: 'CHANGE_FILTER',
        payload: activeFilter
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesDelete = (heroes) => {
 return {
     type: 'HEROES_DELETE',
     payload: heroes
 }
}

export const heroesAdd = (heroes) =>{
    return  {
        type: 'HEROES_ADD',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}