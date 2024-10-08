import { useEffect, useState } from 'react'

import Header from './components/Header'
import Guitar from './components/Guitar';
import { db } from './data/guitarras';


function App() {

    const initialCart=()=>{
        const localStorageCart=localStorage.getItem('cart');
        /* En este caso descubre si hay algo o no */
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }


  const [guitarras,setGuitarras]=useState(db);
  /* Aqui se pasa la parte de localStorageCart */
  const [cart,setCart]=useState(initialCart);

    const AUTH_MAX=5;
    const LOW_MAX=1;

    useEffect(()=>{
        localStorage.setItem('cart',JSON.stringify(cart));
    },[cart]);

  const submitCar=(item)=>{
    /* En esta ocasión arrojará la parte de error  */
    const itemExists=cart.findIndex(guitar=>item.id==guitar.id);
    /* Estaremos buscando el indice del array que cumpla para poder tomar el carro luego como referencia */
    console.log("Agregando carrito");
    if(itemExists>=0){
        /* Por buena practica no tenemos que tocar el state directamente */
        /* La parte de valicion para que no ocupe mas de una guitarra cuando se presione el boton de agregar al carrito */
        const updateCart=[...cart];/* Obteniendo la copia */
        if(updateCart[itemExists].quantity<AUTH_MAX){
            updateCart[itemExists].quantity++
        }
        setCart(updateCart);
    }else{
        item.quantity=1;
        setCart([...cart,item])
    }
}
/* Eliminación de carrera  */

    const incrementQuantity=(id)=>{
        /* const itemExists=cart.findIndex(guitar=>id==guitar.id);
        const nuevoArreglo=cart.map(item=>{
        if(item.id==id && AUTH_MAX>item.quantity){
            const nuevoElemento=cart[itemExists];
            nuevoElemento.quantity++
            return nuevoElemento;
            
        }else{
            return item;
        }   
        }) */
        //setCart(nuevoArreglo);
        const nuevoItems=cart.map(item=>{
            if(item.id==id && AUTH_MAX>item.quantity){
                return{
                    ...item,
                    quantity:item.quantity+1
                }
            }
            return item
        })
        setCart(nuevoItems);
    }
    const decreaseQuantity=(id)=>{
        //const itemExists=cart.findIndex(guitar=>id==guitar.id);
        /* Aqui estamos obteniendo  */
        //const nuevoArreglo=cart.map(item=>{
        //if(item.id==id && item.quantity>LOW_MAX){
        //    const nuevoElemento=cart[itemExists];
            /* En este caso estamos capturando el valor del elemento */
        //    nuevoElemento.quantity--
        //    return nuevoElemento;
        //}else{
        //    return item;
        //}   
        //})
        //setCart(nuevoArreglo);
        const nuevoItems=cart.map(item=>{
            if(item.id==id && item.quantity>LOW_MAX){
                return{
                    ...item,
                    quantity:item.quantity-1
                }
            }
            return item
        })
        setCart(nuevoItems);
    }
    const vaciarCarrito=()=>{
        setCart([]);
    }
    const eliminarGuitar=(id)=>{
        const filtrandoGuitarra=cart.filter(guitar=>guitar.id!=id)
        setCart(filtrandoGuitarra);
    }
  return (
    <>
      
    
    <Header
    cart={cart}
    eliminarGuitar={eliminarGuitar}
    incrementQuantity={incrementQuantity}
    decreaseQuantity={decreaseQuantity}
    vaciarCarrito={vaciarCarrito}
    ></Header>
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
            { guitarras.map(guitarra=>(
                <Guitar
                guitarra={guitarra}
                key={guitarra.id}
                setCart={setCart}
                cart={cart}
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
