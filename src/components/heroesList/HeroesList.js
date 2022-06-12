import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { createSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { heroesFetching, heroesFetched, heroesFetchingError, filtersFetched } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

//ВСЕ ВЫПОЛНЕНО !!!!

const HeroesList = () => {
    const {heroesLoadingStatus} = useSelector(state => state.heroesReducer)  

    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/filters")
                .then(data => dispatch(filtersFetched(data)))
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

        // eslint-disable-next-line
    }, []);
    const filteredHeroesSelector = createSelector(
        (state) => state.filterReducer.filtered,
        (state) => state.heroesReducer.heroes,
        (filter, heroes) =>{
            if(filter === 'all'){
                console.log('sa')
                return heroes
            }else{
                return heroes.filter(i =>{
                    return i.element === filter
                })
            }
        }
    );
    
    const filterHeroes = useSelector(filteredHeroesSelector)

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }
        return arr.map(({id, ...props}) => {
            return <HeroesListItem key={id} id={id} {...props}/>
        })
    }

  

   // const newHeroes = filter(filtered, heroes)

    

    const elements = renderHeroesList(filterHeroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;