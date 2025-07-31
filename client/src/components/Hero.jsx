import React, { useState } from "react";
import { assets, cityList } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import {motion} from 'motion/react'

const Hero = () => {

    const [pickupLocation, setPickupLocation] = useState('')
    // const [pickupLocation, setPickupLocation] = useState('')
    const{navigate} = useAppContext()

    const handleSearch = (e)=>{
        e.preventDefault()
        navigate('/wastes?pickupLocation=' + pickupLocation)
    }

    return (
        <motion.div 
        initial = {{ opacity:0}}
        animate = {{ opacity:1}}
        transition={{duration:0.8}}
        className="h-screen flex flex-col items-center justify-center gap-10 px-4 bg-light text-center">

            <motion.h1  initial = {{y:50, opacity:0}}
                 animate = {{y:0, opacity:1}}
                 transition={{duration:0.8, delay:0.2}}
             className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-green-700 leading-tight max-w-3xl">
                Transforming Agricultural Waste into Opportunity
            </motion.h1>

            <motion.h4 initial = {{y:50, opacity:0}}
                 animate = {{y:0, opacity:1}}
                 transition={{duration:0.8, delay:0.2}}
                 className="text-lg sm:text-xl text-green-600 font-medium italic tracking-wide">
                Connect. Exchange. Empower.
            </motion.h4>

            <motion.form
            initial={{scale:0.95, opacity:0, y:50}}
            animate={{scale: 1, opacity:1, y:0}}
            transition={{duration:0.6, delay:0.4}}
            onSubmit={handleSearch} className='flex justify-center items-center justify-between gap-x-6 p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-xl bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]'>

                <div className='flex flex-col items-center gap-2'>
                    <select
                        required
                        value={pickupLocation}
                        onChange={(e) => setPickupLocation(e.target.value)}
                        className='bg-white text-black text-base font-medium'
                    >
                        <option value="">Location</option>
                        {cityList.map((city) => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>

                    <p className='text-sm text-gray-500'>
                        {pickupLocation ? pickupLocation : 'Select residue by farm location'}
                    </p>
                </div>

                <motion.button
                whileHover={{scale:1.05}}
                whileTap={{scale: 0.95}}
                 className="flex items-center justify-center gap-1 px-9 py-3 max-sm:mt-4 bg-primary-dull hover:bg-primary text-white rounded-full cursor-pointer"> 
                    <img src={assets.search_icon} alt="search" className='brightness-300'/>
                    Search
                </motion.button>

            </motion.form>

        </motion.div>

    )
}

export default Hero