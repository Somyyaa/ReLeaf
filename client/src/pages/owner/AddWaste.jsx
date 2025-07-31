import React, { useState } from "react";
import Title from "../../components/owner/Title";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddWaste = () => {

    const { axios, currency } = useAppContext()

    // const currency = import.meta.env.VITE_CURRENCY

    const [image, setImage] = useState(null)
    const [waste, setWaste] = useState({
        wasteName: '',
        weight: 0,
        price: 0,
        location: '',
        email: '',
        proDate: '',
        chemUsage: ''
    })

    const [isLoading, setIsLoading] = useState(false)
    const onSubmitHandler = async (e) => {
        e.preventDefault()
        if (isLoading) return null

        setIsLoading(true)
        try {
            const formData = new FormData()
            formData.append('image', image)
            formData.append('wasteData', JSON.stringify(waste))

            const { data } = await axios.post('/api/owner/add-waste', formData)

            if (data.success) {
                toast.success(data.message)
                setImage(null)
                setWaste({
                    wasteName: '',
                    weight: 0,
                    price: 0,
                    location: '',
                    email: '',
                    proDate: '',
                    chemUsage: ''
                })
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }finally{
            setIsLoading(false)
        }
    }

    return (
        <div className="px-4 py-10 md:px-10 flex-1">
            <Title title="Add new Agro-Residue" subTitle="Fill in detils to list new waste for booking, including pricing and other specifications" />

            <form onSubmit={onSubmitHandler} className="flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl">
                {/* waste img */}
                <div className="flex items-center gap-2 w-full">
                    <label htmlFor="car-image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_icon} alt="" className="h-14 rounded cursor-pointer" />
                        <input type="file" id="car-image" accept="image/*" hidden onChange={e => setImage(e.target.files[0])} />
                    </label>
                    <p className="text-sm text-gray-500">Upload a picture of the waste</p>
                </div>

                {/* name, wt, price */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col w-full">
                        <label>Name the Agro-residue</label>
                        <input type="text" placeholder="e.g. wheat stubble, etc" required className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none" value={waste.wasteName} onChange={e => setWaste({ ...waste, wasteName: e.target.value })} />
                    </div>
                    <div className="flex flex-col w-full">
                        <label>Weight of the Residue (in kg)</label>
                        <input type="number" required className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none" value={waste.weight} onChange={e => setWaste({ ...waste, weight: e.target.value })} />
                    </div>
                    <div className="flex flex-col w-full">
                        <label>Selling Price (in {currency}) per kg</label>
                        <input type="number" required className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none" value={waste.price} onChange={e => setWaste({ ...waste, price: e.target.value })} />
                    </div>

                </div>

                {/* location and email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col w-full">
                        <label>Location of the farm</label>
                        <select onChange={e => setWaste({ ...waste, location: e.target.value })} value={waste.location} className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none">
                            <option value="">Select your farm location</option>
                            <option value="Patiala">Patiala</option>
                            <option value="Amritsar">Amritsar</option>
                            <option value="Firozpur">Firozpur</option>
                            <option value="Ludhiana">Ludhiana</option>
                            <option value="Karnal">Karnal</option>
                            <option value="Ambala">Ambala</option>
                            <option value="Panipat">Panipat</option>
                        </select>
                    </div>
                    <div className="flex flex-col w-full">
                        <label>Your Email</label>
                        <input type="email" placeholder="eg. abc@gmail.com " required className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none" value={waste.email} onChange={e => setWaste({ ...waste, email: e.target.value })} />
                    </div>

                </div>

                {/* pro date */}
                <div>
                    <div className="flex flex-col w-full">
                        <label>Date when the residue was produced</label>
                        <input type="date" required className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none" value={waste.proDate} onChange={e => setWaste({ ...waste, proDate: e.target.value })} />
                    </div>
                </div>

                {/* desc */}

                <div className="flex flex-col w-full">
                    <label>Chemical Usage History</label>
                    <textarea rows={5} placeholder="Write about the chemicals and in what amount were they used while farming" required className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none" value={waste.chemUsage} onChange={e => setWaste({ ...waste, chemUsage: e.target.value })}></textarea>
                </div>

                <button className="flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary text-white rounded-d font-medium w-max cursor-pointer">
                    <img src={assets.tick_icon} alt="" />
                    {isLoading ? 'Listing...' : 'Click to list this residue'}
                </button>
            </form>
        </div>
    )
}

export default AddWaste