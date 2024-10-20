import { useReducer } from "react"
import Form from "./components/Form"
import { activityReducer,initialState } from "./reducers/activity-reducer"
import ActivityList from "./components/ActivityList";

function App() {
  /* Declarando al aprte del useReducer */

  /* En este caso recuerda quela parte del App.tsx esta en base al torno General
  perocon ello ahora mandaremos
  ya que el State contiene activeId y las Activities */
  const[state,dispatch]=useReducer(activityReducer,initialState);

  return (
    <>
      <header className=" bg-lime-600 text-emerald-400 py-3">
        {/* En esta parte del tipado es la ocasion que se esta mandando... */}
        <div className=" max-w-4xl mx-auto flex justify-between">
          <h1 className=" text-center text-lg font-bold text-white uppercase">Contador de Calorias</h1>
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
