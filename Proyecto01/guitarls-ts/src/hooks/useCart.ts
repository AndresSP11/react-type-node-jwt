import { useEffect, useMemo, useState } from "react"
import { db } from "../data/guitarras";
import type { Guitar,CartItem } from "../types";
export const useCart = () => {
  
    const initialCart=():CartItem[]=>{
        const localStorageCart=localStorage.getItem('cart');
        /* En este caso descubre si hay algo o no */
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }


  const [guitarras]=useState(db);
  /* Aqui se pasa la parte de localStorageCart */
  const [cart,setCart]=useState(initialCart);

    const AUTH_MAX=5;
    const LOW_MAX=1;

    useEffect(()=>{
        localStorage.setItem('cart',JSON.stringify(cart));
    },[cart]);

  const submitCar=(item:Guitar)=>{
    /* En esta ocasión arrojará la parte de error  */
    const itemExists=cart.findIndex(guitar=>guitar.id==item.id);
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
        /* Estaa parte de la quantity es responsable a la misma variable */
        /* Aqui se le esta agrengado un quantity de cantidad */
        const newItem : CartItem = {...item,quantity:1}
        setCart([...cart,newItem])
    }
}
/* Eliminación de carrera  */

    const incrementQuantity=(id:number)=>{
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
    const decreaseQuantity=(id:number)=>{
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

    const eliminarGuitar=(id:number)=>{
        const nuevoArreglo=cart.filter(item=>item.id!=id);
        setCart(nuevoArreglo);
    }
    /* No tienen nada */
    const isEmpty=useMemo(()=>cart.length===0,[cart]);
    const cartTotal=useMemo(()=>cart.reduce((total,item)=>total+item.quantity*item.price,0),[cart]);



  return{
    guitarras,
    cart,
    submitCar,
    decreaseQuantity,
    incrementQuantity,
    vaciarCarrito,
    eliminarGuitar,
    setCart,
    isEmpty,
    cartTotal

  }
}
