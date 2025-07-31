import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import {motion} from 'motion/react'

const WasteDetails = () => {
    const{id} = useParams()
    const {wastes, axios, pickupDate, setPickupDate} = useAppContext()
    const naviagte = useNavigate()
    const[waste, setWaste] = useState(null)
    const currency = import.meta.env.VITE_CURRENCY

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            const {data} = await axios.post('/api/bookings/create', {
                waste: id,
                pickupDate
            })

            if(data.success){
                toast.success(data.message)
                naviagte('/my-bookings')
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        // setWaste(dummyWasteData.find(waste=>waste._id === id))
        setWaste(wastes.find(waste=>waste._id === id))
    },[wastes, id])    //dependency array
    return waste ? (
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16">
            <button onClick={()=>naviagte(-1)} className="flex items-center gap-2 mb-6 text-gray-500 cursor-pointer">
                <img src={assets.arrow_icon} alt="" className="rotate-180 opacity-65"/>
                Back to all available Residue
            </button>


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

                {/* waste img and deets */}
                <motion.div 
                initial={{opacity:0, y:30}}
                animate={{opacity:1, y:0}}
                transition={{duration:0.6}}
                className="lg:col-span-2">
                <motion.img 
                initial={{scale:0.98, opacity:0}}
                animate={{scale:1, opacity:1}}
                transition={{duration:0.5}}
                src={waste.image} alt="" className="w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md"/>
                <motion.div 
                initial={{opacity:0}}
                animate={{opacity:1}}
                transition={{delay:0.2, duration:0.5}}
                className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold">{waste.wasteName}</h1>
                        <p className="text-gray-500 text-lg">{waste.weight} kg</p>
                    </div>
                    <hr className="border-borderColor my-6"/>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[
                            {icon: assets.location_icon, text:`${waste.location}`},
                            {icon: assets.gmail_logo, text: waste.email}
                        ].map(({icon, text})=>(
                            <motion.div 
                            initial={{opacity:0, y:10}}
                            animate={{opacity:1, y:0}}
                            transition={{duration:0.4}}
                            key={text} className="flex flex-col items-center bg-light p-4 rounded-lg"><img src={icon} alt="" className="h-5 mb-2" />
                            {text}
                            </motion.div>    
                        ))}
                    </div>
                    {/* desc */}
                    <div>
                        <h1 className="text-xl font-medium mb-3">Description about Chemical Usage</h1>
                        <p className="text-gray-500">{waste.chemUsage}</p>
                    </div>

                    {/* ProDate */}

                    <h1 className="text-xl font-medium mb-3">Residue was produced on:</h1>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <li className="text-gray-500">{waste.proDate.split('T')[0]}</li></ul>

                </motion.div>
                </motion.div>

                {/* booking */}
                <motion.form 
                initial={{opacity:0, y:30}}
                animate={{opacity:1, y:1}}
                transition={{delay:0.3, duration:0.6}}
                onSubmit={handleSubmit}className="shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500">
                    <p className="flex items-center justify-betweentext-2xl text-gray-800 font-semibold">{currency}{waste.price}<span className="text-base text-gray-800 font-normal">/kg</span></p> 
                    <hr className="border borderColor my-6"/>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="pickup-date">Pickup Date</label>
                        <input value={pickupDate} onChange={(e)=>setPickupDate(e.target.value)} type="date" className="border border-borderColor px-3 py-2 rounded-lg" required id='pickup-date' min={new Date().toISOString().split('T')[0]}/>
                    </div>

                    <button className="w-full bg-primary hover:bg-primary-dull transition-all py-3 fint-medium text-white rounded-xl cursor-pointer">Book Now</button>



                </motion.form>

            </div>
             
        </div>
    ):
    <Loader />
}

export default WasteDetails