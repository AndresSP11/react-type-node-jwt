import { act } from "react"
import { Activity } from "../types"

export type ActivityActions=
    /* Lo de la derecha el payload, es el newActivity , pero activity lleno , pero la parte del tipado es Activity.  */
    { type:'save-activity', payload:{newActivity:Activity}} |
    
    { type:'set-activeId', payload:{id:Activity['id']}}
    /* En este caso estamos definiendo  */
    /* Tipado */
export type ActivityState={
    activities : Activity[],
    activeId:Activity['id']
}
/* Declarando el tipado, esta es la parte del tipado*/
export const initialState:ActivityState={
    
   /* ESTAS SON MIS VARAIBLES DEFINIDAS... AQUI VA ESTAR */ 
    activities:[],
    activeId:''

}
/* AQQUI ARRIBA ESTA LAS ACTIVIDATES = activities */
export const activityReducer=(
    state: ActivityState=initialState,
    action: ActivityActions
)=>{
    if(action.type==='save-activity'){  /* En este caso si se puede un return eden base a las condicioonales que se determinan */
        let updatedActivities:Activity[]=[];
        /* Verificaremos la parte de si existe o no un identificador activo,que es el activeId */
       if(state.activeId){  
            /* En este caso vamos a ver updatedActivities */
            updatedActivities=state.activities.map(activity=>(activity.id===state.activeId ? action.payload.newActivity:activity));
       }else{
            /* Recordar que se esta pasando la data drecibida por newAxctivity */
            updatedActivities=[...state.activities,action.payload.newActivity];
       }

        //Este codigo maneja la logica para actualizar el state
        /* console.log("Imprimiendo al parte del action");
        console.log(action.type);
        console.log(action.payload.newActivity); */
        /* Vas a tenre la copia del State */
        return {
            ...state,
            /* Copias ade todsa als actividades y agregar el nuevo payload */
            activities:updatedActivities,
            auth:false
        }
    }
    if(action.type==='set-activeId'){
        return{
            ...state,
            activeId: action.payload.id
        }
    }


    return state
}