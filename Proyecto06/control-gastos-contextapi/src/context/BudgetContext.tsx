/* En este caso vamos a pasar los useReducer */

/* En el return tenemos que pasar los datos para que sea en el estado Global, en este caso la parte  */

import { createContext, useReducer, ReactNode } from "react"
import { budgetReducer,BudgetState,initialState } from "../reducers/budget-reducer"
import { BudgetActions } from "../reducers/budget-reducer"

type BudgetContextProps={
    state:BudgetState
    dispatch:React.Dispatch<BudgetActions>
}

type BudgetProviderProps={
    children:ReactNode
}

export const BudgetContext=createContext<BudgetContextProps>(null!)

export const BudgetProvider=({children}:BudgetProviderProps)=>{
    /* Vamos a importar la data para que cuando se de el caso poder hacer universal todo la data */

    const [state,dispatch]=useReducer(budgetReducer,initialState);

    return(
        <BudgetContext.Provider
            value={{
                state,
                dispatch
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}