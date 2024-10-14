import { Activity } from "../types"
import { categories } from "../data/categories";


type ActivityListProps={
    activities:Activity[],

}


export default function ActivityList({activities}:ActivityListProps){
    console.log(activities);

    const categoryName=useMemo()


    return(
        <>
            <h2 className=" text-4xl font-bold text-slate-600 text-center">
                Comida y Actividad
            </h2>
            {
                activities.map(activity=>(
                    <div key={activity.id} className=" px-5 py-10 bg-white mt-5 flex justify-between">
                        <div className=" space-y-2 relative">
                            <p>{activity.category}</p>
                            <p className=" text-2xl font-bold pt-5">
                                {activity.name}
                            </p>
                            <p className=" font-black text-4xl text-lime-500">
                                <span>{activity.calories} Calorias</span>
                            </p>
                        </div>
                        
                        <div >

                        </div>
                    </div>
                ))
            }
        </>
    )
}