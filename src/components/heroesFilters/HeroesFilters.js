import { useSelector, useDispatch } from "react-redux";
import { filtering } from "../../actions";
import {useMemo} from 'react'
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active 
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом
// ВСЕ СДЕЛАНО!!!


const HeroesFilters = () => {
    const {filters, filtered} = useSelector(state => state.filterReducer)
    const dispatch = useDispatch()

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {filters.map((i, index) =>{
                        let clazzez = filtered == i.value ? i.clazz + ' active' : i.clazz
                        return <button onClick={() =>{
                            dispatch(filtering(i.value))
                        }} key={index} value={i.value} className={clazzez}>{i.label}</button>
                    })}
                    
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;