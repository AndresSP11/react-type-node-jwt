import React from 'react'
import { OrderItem } from '../types'
import { formatCurrency } from '../helpers'

type OrdertContentsProps={
    order:OrderItem[]
}


const OrderContents = ({order}:OrdertContentsProps) => {
  return (
    
    <div>
      <h2 className="text-4xl font-bold">Consumo</h2>
        <div className=' space-y-3 mt-5'>
            {order.length===0 ? (<p>No hay algo</p>) : (
              order.map(item=>(
                <div className=' border rounded-lg p-2'
                key={item.id}>
                  <p className=' text-lg'>{item.name}-{formatCurrency(item.price)}</p>
                  <p className=' font-black '>Cantidad: {item.quantity} - ${formatCurrency(item.price)}</p>
                  
                </div>
              ))
            )}
        </div>
    </div>
    
  )
}

export default OrderContents
