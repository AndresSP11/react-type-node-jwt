import MenuItem from "./components/MenuItem"
import OrderContents from "./components/OrderContents";
import OrderTotals from "./components/OrderTotals";
import TipPorcentageForm from "./components/TipPorcentageForm";
import { menuItems } from "./data/db"
import useOrder from "./hooks/useOrder"


function App() {

  const {addItem,order,removeItem,setTip,tip}=useOrder();

  return (
    <>
      <header className=" bg-teal-400 py-5">
        <h1 className=" text-center text-4xl font-semibold">Calculadora de Propinas y consumo</h1>
      </header>
      <main className=" max-w-7xl mx-auto grid md:grid-cols-2 py-6 gap-4">
        
        <div className=" space-y-2">
          <h2 className=" text-4xl font-bold">Menú</h2>
          {
            menuItems.map((item)=>
            <MenuItem
            key={item.id}
            item={item}
            addItem={addItem}
            ></MenuItem>
            )
          }
        </div>
        <div className=" border border-dashed border-slate-300 p-5 rounded-lg space-y-10">
            <OrderContents
            
            order={order}
            removeItem={removeItem}
            ></OrderContents>

            <TipPorcentageForm
            setTip={setTip}
            tip={tip}
            ></TipPorcentageForm>              

            <OrderTotals
            order={order}></OrderTotals>
        </div>
        
      </main>
    </>
  )
}

export default App
