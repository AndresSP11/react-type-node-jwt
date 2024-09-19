
import type { Guitar } from '../types';
/* Re */
/* Apartir dela parte de tipado de typscript se va necesitar las funciones qeu estesn definidas. */
type GuitarProps={
    guitarra:Guitar,
    submitCar:(item:Guitar)=>void
}


const Guitar = ({submitCar,guitarra} : GuitarProps ) => {

    const {name,image,description,price}=guitarra;
    return (
    <div className="col-md-6 col-lg-4 my-4 row align-items-center">
                <div className="col-4">
                    <img className="img-fluid" src={`/img/${image}.jpg`} alt="imagen guitarra"/>
                </div>
                <div className="col-8">
                    <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                    <p>{description}</p>
                    <p className="fw-black text-primary fs-3">${price}</p>
                    <button 
                        onClick={()=>submitCar(guitarra)}
                        type="button"
                        className="btn btn-dark w-100 "
                    >Agregar al Carrito</button>
                </div>
        </div>
  )
}

export default Guitar
