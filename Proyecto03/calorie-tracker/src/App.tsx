import { useEffect, useMemo, useReducer } from "react"
import Form from "./components/Form"
import { activityReducer,initialState } from "./reducers/activity-reducer"
import ActivityList from "./components/ActivityList";
import CalorieTracker from "./components/CalorieTracker";

function App() {
  /* Declarando al aprte del useReducer */

  /* En este caso recuerda quela parte del App.tsx esta en base al torno General
  perocon ello ahora mandaremos
  ya que el State contiene activeId y las Activities */
  const[state,dispatch]=useReducer(activityReducer,initialState);

  useEffect(()=>{
    localStorage.setItem('activities',JSON.stringify(state.activities))
  },[state.activities])

  const canRestartApp=()=>useMemo(()=>state.activities.length,[state.activities]);

  return (
    <>
      <header className=" bg-lime-600 text-emerald-400 py-3">
        {/* En esta parte del tipado es la ocasion que se esta mandando... */}
        <div className=" max-w-4xl mx-auto flex justify-between">
          <h1 className=" text-center text-lg font-bold text-white uppercase">Contador de Calorias</h1>

          <button className=" bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm"
          /* Invocando la funcion */
          disabled={!canRestartApp()}
          onClick={()=>dispatch({type:'restart-app'})}
          >
            Reiniciar App
          </button>
        </div>
      </header>

      <section className=" bg-lime-500 py-20 px-5">
        <div className="border-black max-w-4xl mx-auto">
          <Form
          dispatch={dispatch}
          state={state}
          >

          </Form>
        </div>
      </section>


{/* Calorie Tracker */}
      <section className=" bg-gray-800 py-10">
        <div className=" max-w-4xl mx-auto">
          <CalorieTracker
          activities={state.activities}
          ></CalorieTracker>
        </div>
      </section>


      <section className=" p-10 mx-auto max-w-4xl">
        <ActivityList
        dispatch={dispatch}
        activities={state.activities}>


        </ActivityList>
      </section>


    </>
  )
}

export default App
