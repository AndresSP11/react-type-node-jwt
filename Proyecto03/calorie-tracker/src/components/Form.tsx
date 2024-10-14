import React, { act, Dispatch, useReducer, useState } from 'react'
import { categories } from '../data/categories'
import { Activity } from '../types';
import { ActivityActions } from '../reducers/activity-reducer';
 
import {v4 as uuidv4} from 'uuid';


/* No olvidar del tipado de la forma que estabmos haciendoo antiguamente */

type FormProps={
    dispatch:Dispatch<ActivityActions>
}

const initialState={
    id:uuidv4(),
    category:1,
        name:'',
        calories:0
}

export default function Form({dispatch}:FormProps) {

    const [activity,setActivity]=useState<Activity>(initialState);
   

    /* Esta tipando el evento. */
    const handleChange=(e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> )=>{
         const isNumberField=['category','calories'].includes(e.target.id)
        /* Esta forma  */
        console.log(activity);
        setActivity({...activity,
            [e.target.id]:isNumberField ?+e.target.value:e.target.value})
    }

    const isValidActivity=()=>{
        const {name,calories}=activity;
        console.log(name.trim()!=='' && calories>0);
        return name.trim()!=='' && calories>0
    }

    const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{

        e.preventDefault();

        dispatch({type:"save-activity",payload:{newActivity:activity}})

        setActivity({
            ...initialState,
            id:uuidv4()
        })
    }

  return (
    <form 
     className=' space-y-5 bg-white shadow-2xl p-10 rounded-lg'
     onSubmit={handleSubmit}
    >
        <div className=' grid grid-cols-1 gap-3'>
            <label htmlFor="category" className=' font-bold'>Categoria: </label>
            <select 
                id='category'
                className=' border border-slate-300 p-2 rounded-lg w-full bg-white'
                value={activity.category}
                onChange={handleChange}
                >
                {/* Aqui esta haciendo al parte de las categorias */}
                {categories.map((category)=>(<>
                    <option 
                        key={category.id}
                        value={category.id}>{category.name}</option>
                </>))}
            </select>
        </div>

        <div className=' grid grid-cols-1 gap-3'>
            <label htmlFor="name" className=' font-bold'> Actividad:</label>
            <input
            id='name'
            type='text'
            className='border border-slate-300 p-2 rounded-lg'
            placeholder=' Ej. Comida, Jugo de Naranja, Ensalada, Ejercicios, Pesas, Bicicleta '
            value={activity.name}
            onChange={handleChange}
            />
        </div>

        <div className=' grid grid-cols-1 gap-3'>
            <label htmlFor="calories" className=' font-bold'> Calorias:</label>
            <input
            id='calories'
            type='number'
            className='border border-slate-300 p-2 rounded-lg'
            placeholder='Calorias. Ej, 300 o 500 '
            value={activity.calories}
            onChange={handleChange}
            />
        </div>            

        <input 
            type="submit"
            className=' bg-gray-800 hover:bg-gray-900 w-full font-black p-2 text-white cursor-pointer disabled:opacity-10'
            value={activity.category===1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
            disabled={!isValidActivity()} />

    </form>    
)
}
