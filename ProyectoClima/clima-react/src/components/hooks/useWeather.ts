/* En esta parte ira la funciopn para poder exportar desde la funcion padre inicial */

/* npm i axios */
import axios from "axios"
import { number, set, z } from "zod";
 
/* Importando */
import { SearchType} from "../../types";
import { useMemo, useState } from "react";



//## CUARTA FORMA , VALIBOT LA PARTE DE TIPADO





/* Lo que va hacer es que contenga un similar menciona el profesor */
/* function isWeatherResponse(weather:unknown){
    return(
        Boolean(weather) &&
        typeof weather==='object' && 
        typeof (weather as Weather).name==='string' &&
        typeof (weather as Weather).main.temp  ==='number' &&
        typeof (weather as Weather).main.temp_max==='number' &&
        typeof (weather as Weather).main.temp_min==='number' &&
       
    )
} */
/* La entrada es un objeto por parte del ZOD*/

//###LA TERCERA FORMA
const Weather=z.object({
    name:z.string(),
    main:z.object({
        temp:z.number(),
        temp_min:z.number(),
        temp_max:z.number()
    })
})
export type Weather=z.infer<typeof Weather>

/* Recordar que no puede haber 2 temperaturas */

/* #### 4to data #### */

/* const WeatherSchema=object({
    name: string(),
    main: object({  
        temp:number(),
        temp_max:number(),
        temp_min:number()
    })
}) */

/* type Weather = Output<typeof WeatherSchema> */

    const initialState={  
        name:'',
        main:{
            temp:0,
            temp_min:0,
            temp_max:0
        }
    }

export default function useWeather() {

    const [weather,setWeather]=useState<Weather>(initialState)
  
    const [loading,setLoading]=useState(false)

    const [notFound,setNotFound]=useState(false)

    /* En este caso la funcion async es para que el llamado pueda tomar 1 o 2 segundos 
    en este caso depende del caso del internet tambien de cada persona. */

    /* En en este caso la parte del void cambia debido a que se va pasar algo y se va recibir data */

    const fetchWeather= async(search:SearchType)=>{
        const appId=import.meta.env.VITE_API_KEY;
        /* Aqui es donde se le da el positivo a la parte del Spinner */
        setLoading(true)
        setWeather(initialState);
        try {
            /* Tenemos que ocultar la API_KEY por seguridad a que nose haga uso de nuestra variable */
            

            const geoUrl=`http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`
            setNotFound(false);
            /* En este caso la parte del method Get es por defecto pero se puede hacer uso del metodo POST  */
            const {data}=await axios(geoUrl);
            
            if(!data[0]){
                setNotFound(true);
                return
            }

            
            const lat=data[0].lat;
            const lon=data[0].lon;

            console.log('Imprime los datos vacios si o no');
            
            
            

            const weatherUrl=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`
            /* En esta parte recordemos que la data de la api no esta tipada entonces en ese caso vamos a tiparlo */

            /* ##################  Castear el Type      ################# */
            /* Recuerda qeu en este caso solo se tip[o y se obtuvo la data que ese va ser el valor que se va dar] */
           /*  const {data:weatherResult}=await axios<Weather>(weatherUrl);
            console.log('La data de la clima es...');
            //Recordar que la parte del weatherResult es la parte de la data. 
            console.log(weatherResult.main.temp);
            console.log(weatherResult.name);
            console.log(weatherResult.main.temp_max);
             */
            /* ### EN ESTA PARTE TE LO DA BIEN GOZU SI EXISTE UN OBJETO CON UNA ESTUCTURA SIMILAR A PARTE DE ELLO ### */

            //### LA TERCERA PARTE DEL DESARROLLO
            const {data:weatherResult}=await axios(weatherUrl);
           
            const result=Weather.safeParse(weatherResult);
            //En este caso la parte de 
            if(result.success){
                console.log('Proceso Finalizado');
                
                setWeather(result.data);
            } 

            /*  const result=isWeatherResponse(weatherResult)

            console.log(result);
             */

            /* ### EL MUNDO   ### */
            /* const {data:weatherResult}=await axios(weatherUrl);
            //El resultado del weather  
            const result=parse(WeatherSchema,weatherResult)
            console.log('Determinando el valor'); */
            
            /* console.log(result); */

        } catch (error) {
            console.log(error);
        }finally{
            
            setLoading(false)
        }
    }
    /* Funcion que comprueba si hay algo o no. */
    const hasWeatherData=useMemo(()=>weather.name,[weather])

    return {
        weather,
        fetchWeather,
        notFound,
        hasWeatherData,
        loading
    
    }
}
