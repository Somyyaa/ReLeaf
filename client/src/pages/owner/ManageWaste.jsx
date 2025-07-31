import React, { useEffect, useState } from "react";
import { assets} from "../../assets/assets";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ManageWaste = () => {

    const {isOwner, axios, currency} = useAppContext() 
    // const currency = import.meta.env.VITE_CURRENCY
    const [wastes, setWastes] = useState([])

    const fetchOwnerWaste = async () => {
        // setWastes(dummyWasteData)
        try {
            const {data} = await axios.get('/api/owner/wastes')
            if(data.success){
                setWastes(data.wastes)
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const deleteWaste = async (wasteId) => {
        try {
            const confirm = window.confirm('Are you sure you want to delete this post?')
            if(!confirm) return null
            const {data} = await axios.post('/api/owner/delete-waste', {wasteId})
            if(data.success){
                toast.success(data.message)
                fetchOwnerWaste()
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        isOwner && fetchOwnerWaste()
    },[isOwner])
    return(
        <div className="px-4 pt-10 md:px-10 w-full">
            <Title title="Manage posted Residue" subTitle="View all listed residue, or remove them from the booking platform."/>
            <div className="max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6">
                <table className="w-full border-collapse text-left text-sm text-gray-600">
                    <thead className="text-gray-500">
                        <tr>
                            <th className="p-3 font-medium">Residue</th>
                            <th className="p-3 font-medium max-md:hidden">Weight</th>
                            <th className="p-3 font-medium">Price/kg</th>
                            <th className="p-3 font-medium">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {wastes.map((waste, index)=>(
                            <tr key={index} className="border-t border-borderColor">
                                <td className="p-3 flex items-center gap-3">
                                    <img src={waste.image} alt="" className="h-12 w-12 aspect-square rounded-md object-cover"/>
                                    <div className="max-md:hidden">
                                        <p className="font-medium">{waste.wasteName}</p>
                                    </div>
                                </td>
                                <td className="p-3 max-md:hidden">{waste.weight} kg</td>
                                <td className="p-3">{currency}{waste.price}</td>
                                <td className="flex items-center p-3">
                                    <img onClick={()=> deleteWaste(waste._id)} src={assets.delete_icon} alt="" className="cursor-pointer"/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManageWaste