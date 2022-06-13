import React from "react";
import {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { heroesAdd } from "../heroesList/heroesSlice";
import { useHttp } from "../../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";
// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option> желательно сформировать на базе
// данных из фильтров


//ВСЕ ВЫПОЛНЕНО!


const HeroesAddForm = () => {
    const {filters} = useSelector(state => state.filter)
    let [inputs, setInputs] = useState({
        name: '',
        text: '',
        element: '', 
        id: ''
    })


const dispatch = useDispatch()
const onSubmitForm = (e) =>{
    e.preventDefault()
    
    dispatch(heroesAdd(inputs))
    request('http://localhost:3001/heroes/', 'POST', JSON.stringify(inputs))
    setInputs({
        name: '',
        text: '',
        element: '', 
        id: ''
    })
}
const {request} = useHttp()


    return (
        <form className="border p-4 shadow-lg rounded"
        onSubmit={onSubmitForm}
        >
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    value={inputs.name}
                    onChange={(e) =>{
                        let id = uuidv4()
                        setInputs({
                            ...inputs,
                            name: e.target.value,
                            id: id
                        })
                      
                    }}
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    onChange={(e) =>{
                        setInputs({
                            ...inputs,
                            text: e.target.value
                        })
                    }}
                    value={inputs.text}
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    onChange={(e) =>{
                        
                        setInputs({
                            ...inputs,
                            element: e.target.value
                        })
                    }}
                    required
                    className="form-select" 
                    id="element" 
                    name="element">
                    <option>Выберите элемент героя...</option>
                    {filters.map((i, index) =>{
                        if(index > 0) return <option key={index} value={i.value}>{i.label}</option>
                       
                    })}
                   
                </select>
            </div>

            <button  type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;