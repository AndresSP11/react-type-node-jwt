import Header from './components/Header'
import Guitar from './components/Guitar';
import { useCart } from './hooks/useCart';


function App() {

    const {guitarras,cart,submitCar,eliminarGuitar,decreaseQuantity,incrementQuantity,vaciarCarrito,isEmpty,cartTotal}=useCart();

  return (
    <>
    <Header
    cart={cart}
    eliminarGuitar={eliminarGuitar}
    incrementQuantity={incrementQuantity}
    decreaseQuantity={decreaseQuantity}
    vaciarCarrito={vaciarCarrito}
    isEmpty={isEmpty}
    cartTotal={cartTotal}
    ></Header>
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
            { guitarras.map(guitarra=>(
                <Guitar
                guitarra={guitarra}
                key={guitarra.id}
                submitCar={submitCar}
                >       
                </Guitar>
            ))}
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>

    </>
  )
}

export default App
