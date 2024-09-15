import React, { useState } from 'react'

const Header = ({cart,eliminarGuitar,decreaseQuantity,incrementQuantity,vaciarCarrito}) => {



  return (
    <header className="py-5 header">
        <div className="container-xl">
            <div className="row justify-content-center justify-content-md-between">
                <div className="col-8 col-md-3">
                    <a href="index.html">
                        <img className="img-fluid" src="./public/img/logo.svg" alt="imagen logo" />
                    </a>
                </div>
                <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                    <div 
                        className="carrito"
                    >
                        <img className="img-fluid" src="./public/img/carrito.png" alt="imagen carrito" />

                        <div id="carrito" className="bg-white p-3">
                            

                            <table className="w-100 table">

                                {cart.length!=0 ? (<thead>
                                    <tr>
                                        <th>Imagen</th>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                        <th>Cantidad</th>
                                        <th></th>
                                    </tr>
                                </thead>) : (<p className="text-center">El carrito esta vacio</p>) }

                                <tbody>
                                    {cart.map((guitar)=>(
                                    <tr key={guitar.id}>
                                        <td>
                                            <img className="img-fluid" src={`./public/img/${guitar.image}.jpg`} alt="imagen guitarra" />
                                        </td>
                                        <td>{guitar.name}</td>
                                        <td className="fw-bold">
                                                ${guitar.price}
                                        </td>
                                        <td className="flex align-items-start gap-4">
                                            <button
                                                type="button"
                                                className="btn btn-dark"
                                                onClick={()=>decreaseQuantity(guitar.id)}
                                            >
                                                -
                                            </button>
                                                {guitar.quantity}
                                            <button
                                                type="button"
                                                className="btn btn-dark"
                                                onClick={()=>incrementQuantity(guitar.id)}
                                            >
                                                +
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-danger"
                                                type="button"
                                                onClick={()=>eliminarGuitar(guitar.id)}
                                            >
                                                X
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                    
                                </tbody>

                            </table>

                            

                            {cart.length!=0 ? 
                            (
                            <div>
                            <p className="text-end">Total pagar: <span className="fw-bold">$899</span></p>
                            <button className="btn btn-dark w-100 mt-3 p-2"
                            onClick={()=>vaciarCarrito()}>
                                Vaciar Carrito
                            </button>
                            </div>) : ''}
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </header>
  )
}

export default Header
