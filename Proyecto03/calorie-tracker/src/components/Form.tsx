import React, { act, Dispatch, useReducer, useState,useEffect } from 'react'
import { categories } from '../data/categories'
import { Activity } from '../types';
import { ActivityActions, ActivityState } from '../reducers/activity-reducer';
/* Tipado por parte del UseReducer */ 
/* Vamos a identificar la parte del useEffect paraque antes qeu cargue state verifique si hay una actividad en el ID */
import {v4 as uuidv4} from 'uuid';
/* No olvidar del tipado de la forma que estabmos haciendoo antiguamente */
type FormProps={
    dispatch:Dispatch<ActivityActions>,
    state:ActivityState  
}

const initialState={
    id:uuidv4(),
    category:1,
    name:'',
    calories:0
}

/* State y dispatch  */
export default function Form({dispatch,state}:FormProps) {

    const [activity,setActivity]=useState<Activity>(initialState);

    /* useEffect la parte Fromulario par aque se actualice  */
    useEffect(()=>{
        if(state.activeId){
            /* console.log(state.activeId); */
            /* En este caso la parte de la seleccion se esta dandode forma que cuando 
            se tenga  */
            const selectedActivity=state.activities.filter(stateActivity=>stateActivity.id===state.activeId)[0];
            /* Recordarqeu la parte de filter va retornar una lista de Objetos */
            /* console.log("Determinando la parte del selected");
            console.log(selectedActivity); */
            setActivity(selectedActivity);
        }
        /* Cada vez que surja un cambio en el activeId, cambia eso ahi */
    },[state.activeId])


    /* Esta tipando el evento, osea esto quiere decir que los cambios qeu ocurran en el Submit va ocurrir esto. */
    const handleChange=(e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> )=>{
        /* De este arreglo... el includes es que el que valide si exitste uno igua la ese? */
        const isNumberField=['category','calories'].includes(e.target.id)
        /* Esta forma  */
        console.log(activity);


        setActivity({...activity,[e.target.id]:isNumberField ?+e.target.value:e.target.value})
    }

    const isValidActivity=()=>{

        const {name,calories}=activity;

        console.log(name.trim()!=='' && calories>0);

        /* La validacion la parte de si es verdadero o falso en base a la inputs mandados en el form */
        return name.trim()!=='' && calories>0
    }


    const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        /* Aqui se esta mandando el evento encesario */
        /* Esta ejecutando la parte del distpach esta funcion que se esta definiendo en el useReducer */

        /* En este parte se convoca la fduncion y se eejectua la accion qeuy se ha madndao en el useReducer */

        dispatch({type:"save-activity",payload:{newActivity:activity}})
        /* Al parecer esta definiendo la parte ninicial del Id para que no tenga problemas a futuro de que no 
        se este convocando un nuevo Id , pero al partecer lo deja todo vacio */
        setActivity({
            /* Se le da las credenciales del initialState yse define unevo ID */
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
