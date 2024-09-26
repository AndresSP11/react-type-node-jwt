import { useMemo } from "react";
import { OrderItem } from "../types"
import { formatCurrency } from "../helpers";

type OrderTotalsProps={
    order:OrderItem[]
    tip:number
    placeHolder:()=>void
}

export default function OrderTotals({order,tip,placeHolder}:OrderTotalsProps) {
  
    const totalPagar=useMemo(()=>order.reduce((total,item)=>total+(item.quantity*item.price),0),[order]);

    const tipAmount=useMemo(()=>totalPagar*tip,[tip,order]);

    const finalPay=useMemo(()=>totalPagar+tipAmount,[tip,order]);

    return (
    <>
        <div className=" space-y-3">
            <h2 className=" font-black text-2xl">Totales y Propina:</h2>
            <p>Subtotal a pagar: {''}
                <span className=" font-bold">{formatCurrency(totalPagar)}</span>
            </p>

            <p>Propina: {''}
                <span className=" font-bold">{formatCurrency(tipAmount)}</span>
            </p>

            <p>Total a Pagar: {''}
                <span className=" font-bold">{formatCurrency(finalPay)}</span>
            </p>
        </div>

        <button className="w-full bg-black font-bold text-white disabled:opacity-10 p-3 "
        disabled={finalPay===0}
        onClick={()=>placeHolder()}>
            Guardar Orden
        </button>
    </>
  )
}
