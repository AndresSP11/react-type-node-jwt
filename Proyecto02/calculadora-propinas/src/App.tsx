import MenuItem from "./components/MenuItem"
import { menuItems } from "./data/db"


function App() {

  console.log(menuItems)

  return (
    <>
      <header className=" bg-teal-400 py-5">
        <h1 className=" text-center text-4xl font-semibold">Calculadora de Propinas y consumo</h1>
      </header>
      <main className=" max-w-7xl mx-auto grid md:grid-cols-2">
        
        <div>
          <h2>Menú</h2>
          {
            menuItems.map((item)=>
            <MenuItem
            key={item.id}
            item={item}
            ></MenuItem>
            )
          }
        </div>
        <div>
          <h2>Consumo</h2>
          
        </div>
        
      </main>
    </>
  )
}

export default App
