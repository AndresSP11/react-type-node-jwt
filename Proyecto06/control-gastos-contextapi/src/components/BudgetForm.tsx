import { useMemo, useState } from "react"

export default function BudgetForm() {

    const [budget,setBudget]=useState(0)

    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        setBudget(+e.target.value);
    }

    const isValid=useMemo(()=>{
        return isNaN(budget) || budget<=0;
    },[budget])

  return (
    /* En esta parte vamos a crear el Formulario. */
    <>
    {/* Space-y-5 ,   */}
        <form className=" space-y-5" action="">
            <div className=" flex flex-col space-y-5">
                <label htmlFor="budget" className=" text-4xl text-blue-600 font-bold text-center">
                    Definir Presupuesto
                </label>
                <input 
                    id="budget"
                    type="number"
                    className=" w-full bg-white rounded-lg border border-gray-300 p-2 opacity-40 text-black"
                    placeholder="Define tu Presupuesto"
                    name="budget" 
                    value={budget}
                    onChange={(e)=>handleChange(e)}
                    
                />
            </div>

            <input 
                type="submit"
                value='Definir Presupuesto'
                className=" bg-blue-600 hover:bg-blue-700 cursor-pointer w-full rounded-lg p-2 text-white font-bold uppercase disabled:opacity-40"
                disabled={isValid}
                />

        </form>
    </>
  )
}
