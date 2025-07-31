import React from "react";
import { assets } from "../assets/assets";
import {motion} from 'motion/react'

const Footer = () => {
    return(
        <footer className="w-full bg-gradient-to-b from-[#FFFFFF] to-[#F0FFF0] text-gray-800">
            <motion.div 
            initial={{opacity:0, y:30}}
            whileInView={{opacity:1, y:0}}
            transition={{duration: 0.6}}
            className="max-w-7xl mx-auto px-6 py-30 flex flex-col items-center">
                <div className="flex items-center space-x-3 mb-6">
                    <motion.img 
                    initial={{opcity:0}}
                    whileInView={{opacity: 1}}
                    transition={{duration:0.5, delay:0.3}}
                    alt="" className="h-11"
                        src={assets.logo} />
                </div>
                <motion.p 
                initial={{opacity:0}}
                whileInView={{opacity: 1}}
                transition={{duration:0.5, delay:0.4}}
                className="text-center max-w-xl text-sm font-normal leading-relaxed">
                    Connecting farms and businesses through smart waste reuse. 
                    Sustainable solutions for a greener tomorrow.
                </motion.p>
            </motion.div>
            <motion.div 
             initial={{opacity:0, y:20}}
            whileInView={{opacity:1, y:0}}
            transition={{duration: 0.6, delay:0.2}}
            className="border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm font-normal">
                    <a href="">ReLeaf</a> ©2025. All rights reserved.
                </div>
            </motion.div>
        </footer>
    )
}

export default Footer