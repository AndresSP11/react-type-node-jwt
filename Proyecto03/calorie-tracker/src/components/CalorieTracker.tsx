import React, { useMemo } from 'react'
import type { Activity } from "../types"
import CalorieDisplay from './CalorieDisplay'

type CalorieTrackerProps={
    activities: Activity[]

}

export default function CalorieTracker({activities}:CalorieTrackerProps) {
    /* En esta parte del total, actividad se va pasar la parte de category */
    const caloriesConsumed=useMemo(()=>activities.reduce((total,activity)=>activity.category===1 ? total + activity.calories : total,0),[activities])
    const ejercicioConsumed=useMemo(()=>activities.reduce((total,activity)=>activity.category===2 ? total + activity.calories : total,0),[activities])

    const netCalorias=useMemo(()=>caloriesConsumed-ejercicioConsumed,[activities])


  return (
    <>
        <h2 className=' text-4xl font-black text-white text-center'>Resumen de Calorias</h2>

        <div className=' flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10'>

            <CalorieDisplay
            calories={caloriesConsumed  }
            text="Consumidas"
            >
            </CalorieDisplay>

            <CalorieDisplay
            calories={ejercicioConsumed  }
            text="Calorias Quemadas"
            >
            </CalorieDisplay>

            <CalorieDisplay
            calories={netCalorias  }
            text="Total de Calorias"
            >
            </CalorieDisplay>
        </div>

        <p className=' text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center'>{caloriesConsumed}</p>
    </>
  )
}
