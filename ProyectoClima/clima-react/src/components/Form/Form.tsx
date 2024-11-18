import React, { useState } from 'react'
import { countries } from '../data/countries'
import styles from './Form.module.css'
import Alert from '../Alert/Alert'
import { SearchType } from '../../types'


type FormProps={
    fetchWeather:(search: SearchType) => Promise<void>
}



export default function Form({fetchWeather}:FormProps) {

    const [search,setSearch]=useState({
        city:'',
        country:''
    })

    const [alert,setAlert]=useState('')

    /* El tipo de handle change para cambiar 
    funcion que en automatico se va cambiar */
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>)=>{
        /* En esta parte del e.target.name en este caso  */
        setSearch({
            ...search,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit=(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        /* Funcion para verificar si hay o no campos vacios */
        let objetoVacio=Object.values(search);
        /* Esto es lo que va hacer una parte... es l osiguietes ['valor2','valor1'] , la lectura */
        if(objetoVacio.includes('')){
            /* En este caso esta haciedno qeu valide la parte del mensaje pero lo apsaremos por via prop */
            setAlert('Llenar los campos necesarios porfavor');
            return
        }
        fetchWeather(search);
        

    }

  return (
    <form action="" className={styles.form}
        onSubmit={handleSubmit}
    >
        {alert && <Alert>{alert}</Alert>}
        <div className={styles.field}>
            <label htmlFor="city">Ciudad</label>
            <input 
                id='city'
                type='text'
                name='city'
                placeholder='Ciudad'
                value={search.city}
                onChange={(e)=>handleChange(e)}
            />
        </div>

        <div className={styles.field}>
            <label htmlFor="country">País: </label>
            <select name="country" id="country"
            value={search.country}
            onChange={(e)=>handleChange(e)}>

                <option value="" className={styles.opciones}>-- Seleccione un Pais --</option>
                {
                    countries.map(country=>(
                        <option 
                        key={country.code}
                        value={country.code} className={styles.opciones}>
                            {country.name}
                        </option>
                    ))
                }
            </select>
        </div>

        <input type="submit" value='consultar Clima' className={styles.submit}/>
    </form>
  )
}
