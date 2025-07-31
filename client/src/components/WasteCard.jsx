import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const WasteCard = ({waste}) => {  /*car<->waste*/

    const currency = import.meta.env.VITE_CURRENCY
    const navigate = useNavigate()
    return(
        <div onClick={()=>{navigate(`/waste-details/${waste._id}`); scrollTo(0, 0)}} className="group rounded-xl overflow-hidden shadow-lg hover:-translate-y-1 transition-all duration-500 cursor-pointer">

            <div className="relative h-40 overflow-hidden">
                <img src={waste.image} alt="waste image" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />

                {/* {waste.isAvailable && <p className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2.5 py-1 rounded-full">Available Now</p>} */}

                <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg">

                <span className="font-semibold">{currency}{waste.price}</span>
                <span className="text-sm text-white/80">/kg</span>
                </div>

            </div>



            <div className="p-4 sm:p-5">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="text-lg font-medium">{waste.wasteName}</h3>
                        <p className="text-muted-foreground text-sm">{waste.weight} kg</p>
                    </div>
                </div>

                <div className="mt-4 flex flex-col gap-2 text-gray-600">

                    <div className="flex items-center text-sm text-muted-foreground">
                        <img src={assets.location_icon} alt="" className="h-4 mr-2"/>
                        <span>{waste.location}</span>
                    </div>

                    <div className="flex items-center text-sm text-muted-foreground">
                        <img src={assets.gmail_logo} alt="" className="h-4 mr-2"/>
                        <span>{waste.email}</span>
                    </div>

                </div>

            </div>


        </div>
    )
}

export default WasteCard