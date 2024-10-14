import { act } from "react"
import { Activity } from "../types"

export type ActivityActions=
    /* Lo de la derecha el payload, es el newActivity , pero activity lleno , pero la parte del tipado es Activity.  */
    { type:'save-activity', payload:{newActivity:Activity}}
/* Tipado */
type ActivityState={
    activities : Activity[]
}
/* Declarando el tipado */
export const initialState:ActivityState={
    activities:[]
}
/* AQQUI ARRIBA ESTA LAS ACTIVIDATES = activities */
export const activityReducer=(
    state: ActivityState=initialState,
    action: ActivityActions
)=>{
    if(action.type==='save-activity'){
        //Este codigo maneja la logica para actualizar el state
        /* console.log("Imprimiendo al parte del action");
        console.log(action.type);
        console.log(action.payload.newActivity); */
        return {
            ...state,
            activities:[...state.activities,action.payload.newActivity],
            auth:false
        }



    }
    return state
}