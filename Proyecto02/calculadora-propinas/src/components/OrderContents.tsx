import React from 'react'
import { OrderItem } from '../types'
import { formatCurrency } from '../helpers'

type OrdertContentsProps={
    order:OrderItem[]
    removeItem:(item:OrderItem)=>void
  }


const OrderContents = ({order,removeItem}:OrdertContentsProps) => {
  return (
    
    <div>
      <h2 className="text-4xl font-bold">Consumo</h2>
        <div className=' space-y-3 mt-5'>
            {order.length===0 ? (<p>No hay algo</p>) : (
              order.map(item=>(
                <div className=' border rounded-lg p-2 flex justify-between
                last-of-type:border-b items-center'
                key={item.id}>
                  <div>
                    <p className=' text-lg'>{item.name}-{formatCurrency(item.price)}</p>
                    <p className=' font-black '>Cantidad: {item.quantity} - {formatCurrency(item.price)}</p>
                  </div>
                  
                  
                  <button
                  className=' bg-red-600 rounded-full h-8 w-8 text-white font-bold'
                  onClick={()=>removeItem(item)}
                  >
                    X
                  </button>
                </div>
              ))
            )}
        </div>
    </div>
    
  )
}

export default OrderContents
