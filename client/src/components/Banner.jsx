import React from "react";
import { assets } from "../assets/assets";
import {motion} from 'motion/react'

const Banner = () => {
    return(
        <motion.div 
        initial={{opacity:0, y:50}}
        whileInView={{opacity:1, y:0}}
        transition={{duration:0.6}}
        className="flex flex-col md:flex-row md:items-start items-center justify-between px-8 min-md:pl-14 pt-10 pb-10 bg-gradient-to-r from-[#63D471] to-[#A8FF9E]
max-w-6xl mx-3 md:mx-auto rounded-2xl overflow-hidden">

            <div className="text-white">
                <h2 className="text-3xl font-medium">Stop Burning And Start Earning</h2>
                <p className="mt-2">Want to get rid of your Agro-waste?</p>
                <p className="max-w-130">With ReLeaf, turn waste into wealth by seamlessly listing it for reuse. We connect farmers and businesses to buyers who transform residues into valuable resources. Join the circular economy—where every byproduct finds its purpose and adds value to the planet and your pocket.</p>
                {/* <p className="max-w-130">Transforming agricultural waste into wealth where every very byproduct finds its purpose.</p> */}

                {/* <button className="px-6 py-2 bg-white hover:bg-slate-100 transition-all text-primary rounded-lg text-sm mt-4 cursor-pointer">
                    List the Agro-waste
                </button> */}
            </div>

            <div className="mt-8 md:mt-0 md:w-1/3 w-full flex justify-center mx-20">
                <motion.img 
                initial={{opacity:0, x:50}}
                whileInView={{opacity:1, x:0}}
                transition={{duration:0.6, delay:0.4}}
                src={assets.banner_farm_image} alt="car" className="rounded-xl w-full max-w-[300px] h-auto object-cover shadow-md" />
            </div>

            
        </motion.div>
    )
}

export default Banner