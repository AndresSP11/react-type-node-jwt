

const tipOptions = [
    {
      id: 'tip-10',
      value: .10,
      label: '10%'
    },
    {
      id: 'tip-20',
      value: .20,
      label: '20%'
    },
    {
      id: 'tip-50',
      value: .50,
      label: '50%'
    },
  ]

type TipPorcentageFormProps={
    setTip: React.Dispatch<React.SetStateAction<number>>
    tip:number
 }

export default function TipPorcentageForm({setTip,tip}:TipPorcentageFormProps) {
  return (
    <div>
        <h3 className=' font-black text-2xl'>Propina:</h3>
        <form>
            {tipOptions.map((tipOption)=>(
                <div>
                    <label htmlFor={tipOption.id}>{tipOption.label}</label>
                    <input 
                    id={tipOption.id} 
                    type="radio" 
                    name="tip"
                    value={tipOption.value}
                    /* Hay dos formas una en la cual la parte del e+ , como tambien se puede colocar valuAsNumber */
                    /* En este caso sirve mas utilizaar la parte de + */
                    onChange={(e)=>setTip(+e.target.value)}
                    /* En esta parte cada vez que se de click en una de esas funciones cambiara a la parte del OnChange */
                    checked={tipOption.value===tip}
                    /* En este caso se va mantener checkeado o mantenido el valor conforme se mande ahi */
                    />
                </div>)
                
                
            )}
        </form>
    </div>
  )
}


