import React from "react";
import Title from "./Title";
import { assets } from "../assets/assets";
import WasteCard from "./WasteCard";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import {motion} from 'motion/react'

const FeaturedSection = () => {
    const navigate = useNavigate();
    const {wastes} = useAppContext();
    return(
        <motion.div 
        initial={{opacity:0, y:40}}
        whileInView={{opacity:1, y:0}}
        transition={{duration:1, ease:"easeOut"}}
        className="flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32">
            <motion.div
            initial={{opacity:0, y:20}}
        whileInView={{opacity:1, y:0}}
        transition={{duration:1, delay:0.5}}>
                <Title title='Available ByProducts' subTitle='Explore a variety of residue that might be useful for you.'/>
                <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-156">(Reload the page to see the updated residue available now)</p>
            </motion.div>

            <motion.div 
            initial={{opacity:0, y:100}}
            whileInView={{opacity:1, y:0}}
            transition={{delay:0.5, duration:1}}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
                {
                    wastes.slice(0,3).map((waste)=>(
                        <motion.div
                        initial={{opacity:0, scale:0.95}}
            whileInView={{opacity:1, scale:1}}
            transition={{duration:0.4, ease:"easeOut"}}
                        key={waste._id}>
                            <WasteCard waste = {waste} />
                        </motion.div>
                    ))
                }
            </motion.div>
            <motion.button 
            initial={{opacity:0, y:20}}
            whileInView={{opacity: 1, y:0}}
            transition={{delay:0.6, duration:0.4}}
            onClick={()=>{
                navigate('/Wastes'); scrollTo(0, 0)
            }}
            className="flex items-center justify-center gap-2 px-6 py-2 border border-borderColor hover:bg-gray-50 rounded-md mt-18 cursor-pointer">
                Explore <img src={assets.arrow_icon} alt="arrow"/>
            </motion.button>

        </motion.div>
    )
}

export default FeaturedSection