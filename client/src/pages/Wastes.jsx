import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { assets, dummyWasteData } from "../assets/assets";
import WasteCard from "../components/WasteCard";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import {motion} from 'motion/react'

const Wastes = () => {

    // getting search params from url
    const [searchParams] = useSearchParams()
    const pickupLocation = searchParams.get('pickupLocation')
    const{wastes, axios} = useAppContext()

    const isSearchData = pickupLocation

    const [filteredWastes, setFilteredWastes] = useState([])

    const searchWasteAvailability = async()=>{
        const {data} = await axios.post('/api/bookings/check-availability', {location: pickupLocation})
        if(data.success){
            setFilteredWastes(data.availableWastes)
            if(data.availableWastes.length === 0){
                toast('No residue available at this location')
            }
            return null
        }
    }

    const [input, setInput] = useState('')

    const applyFilter = async()=>{
        if(input===''){
            setFilteredWastes(wastes)
            return null
        }
        const filtered = wastes.slice().filter((waste)=>{
            return waste.wasteName.toLowerCase().includes(input.toLowerCase()) || waste.location.toLowerCase().includes(input.toLowerCase())
        })
        setFilteredWastes(filtered)
    }

    useEffect(()=>{
        isSearchData && searchWasteAvailability()
    },[])

    useEffect(()=>{
        wastes.length > 0 && !isSearchData && applyFilter()
    }, [input, wastes])

    

    return(
        <div>
            <motion.div 
            initial = {{opacity:0, y:30}}
            animate={{opacity:1, y:0}}
            transition={{duration:0.6, ease: "easeOut"}}
            className="flex flex-col items-center py-20 bg-light max-md:px-4">
                <Title title = 'Available Residue' subTitle='Explore a variety of residue that might be useful for you.'/>

                <motion.div 
                initial={{opacity:0, y:20}}
                animate={{opacity:1, y:0}}
                transition={{delay:0.3, duration:0.5}}
                className="flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow">
                    <img src={assets.search_icon} alt="" className="w-4.5 h-4.5 mr-2"/>
                    {/* controlled input field */}
                    <input onChange={(e)=>setInput(e.target.value)} value = {input} type="text" placeholder="Search by residue name or farm location" className="w-full h-full outline-none text-gray-500"/>
                    <img src={assets.filter_icon} alt="" className="w-4.5 h-4.5 ml-2"/>
                </motion.div>
            </motion.div>



            <motion.div 
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{delay:0.6, duration:0.5}}
            className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
                <p className="text-gray-500 xl:px-20 max-w-7xl mx-auto">Showing {filteredWastes.length} Residue items</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
                    {filteredWastes.map((waste, index)=>(
                        <motion.div key={index}
                        initial={{opacity:0, y:20}}
                        animate={{opacity:1, y:0}}
                        transition={{delay:0.1*index, duration:0.4}}>
                            <WasteCard waste={waste} />
                        </motion.div>
                    ))}

                </div>
            </motion.div>
        </div>
    )
}

export default Wastes