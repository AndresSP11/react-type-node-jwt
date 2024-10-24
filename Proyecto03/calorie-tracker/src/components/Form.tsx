import React, { act, Dispatch, useReducer, useState,useEffect } from 'react'
import { categories } from '../data/categories'
import { Activity } from '../types';
import { ActivityActions, ActivityState } from '../reducers/activity-reducer';
/* Tipado por parte del UseReducer */ 
/* Vamos a identificar la parte del useEffect paraque antes qeu cargue state verifique si hay una actividad en el ID */
import {v4 as uuidv4} from 'uuid';
/* No olvidar del tipado de la forma que estabmos haciendoo antiguamente */

/* Tipar la data de TypeScript */
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

    /* Primero lo tipa en base a la actividad, luego de ello da el valor inicial */
    const [activity,setActivity]=useState<Activity>(initialState);

    /* useEffect la parte Fromulario par aque se actualice  */
    /* tanto focmo para el que inivic aomoc para el que hda click al bvoton de deditar se conforma por ello */
    useEffect(()=>{
        if(state.activeId){
            /* console.log(state.activeId); */
            /* En este caso la parte de la seleccion se esta dandode forma que cuando 
            se tenga  */
            const selectedActivity=state.activities.filter(stateActivity=>stateActivity.id===state.activeId)[0];
            /* Una vez definida la parte de la actividad, 
            el selecetedActivity subira al item filtrado pero en parte el id inical*/
            /* rECORDAR QUE EL FILTER TE VA BRINDAR EN UN ARREGLO LOS OBJETOS QUE CUMPLEN CON DICHA SELECCION */           
            setActivity(selectedActivity);
        }
        /* Cada vez que surja un cambio en el activeId, cambia eso ahi */
    },[state.activeId])

    /* En este caso la parte de el tipado, es por parte del input al que vamos a estar */
    /* MULTIFUNCIONAL */

    /* En este caso al parte de definicion de los inputs son 3 entradas... Corroborrara sdebido a que los 
    numeros en el string los considera como numero */
    const handleChange=(e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> )=>{
        /* De este arreglo... el includes es que el que valide si exitste uno igua la ese? */
        const isNumberField=['category','calories'].includes(e.target.id)
        /* Esta forma es tener la copia de todo la actividad y actualizara el dato [] y convertirlo
        en base aisi es numero o no*/
        console.log(activity);
        setActivity({...activity,[e.target.id]:isNumberField ?+e.target.value:e.target.value})
    }

    /* Esta funcion del isValidActivity l oque va realizar es cambiar el estado del boton si se encuentra lleno los campos, en la parte
    del disabled es lo que se va usar en la parte de los campos Validacion del front */
    const isValidActivity=()=>{
        /* Destructuring activity.... */
        const {name,calories}=activity;
        console.log(name.trim()!=='' && calories>0);
        /* La validacion la parte de si es verdadero o falso en base a la inputs mandados en el form */
        return name.trim()!=='' && calories>0
        /* En esta parte no se seabe si va retornar verdadero o falso */

    }
    

    const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        /* El e.preventDefault evita que se recargue la parte de la pagina debido al hacer click a un submit */
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
                /* Los valores del input  */
                value={activity.category}
                onChange={handleChange}
                >
                {/* Aqui esta haciendo al parte de las categorias */}
                {categories.map((category)=>(<>
                    <option 
                        key={category.id}
                        value={category.id}>{category.name}
                    </option>
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
            disabled={!isValidActivity()} 
        />

    </form>    
)
}
