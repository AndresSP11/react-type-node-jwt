import React, { useState } from 'react'

import type { MenuItem, OrderItem } from '../types';
const useOrder = () => {
    
    const [order,setOrder]=useState<OrderItem[]>([]);

    /* Los items que se mandan en esta ocasion tienen que ser definidos */
    function addItem(item:MenuItem){
        
        const searchElement=order.findIndex((elemento)=>elemento.id==item.id);
        
        if(searchElement>=0){
            const newProductos:OrderItem[]=order.map((elemento)=>{
                if(elemento.id==item.id){
                    return({
                        ...elemento,
                        quantity:elemento.quantity+1
                    })
                }else{
                    return(elemento);
                }
            })
            setOrder(newProductos);
        }else{
            const newItem:OrderItem={...item,quantity:1};
        setOrder([...order,newItem]);
        }
        
        
    }
    console.log(order);




    return{
        addItem,
        order
    }
}
export default useOrder
