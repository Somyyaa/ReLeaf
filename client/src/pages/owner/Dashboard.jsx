import React, { useEffect, useState } from "react";
import { assets, dummyDashboardData } from "../../assets/assets";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Dashboard = () => {

    const {axios, isOwner, currency} = useAppContext()

    // const currency = import.meta.env.VITE_CURRENCY

    const [data, setData] = useState({
        totalBookings: 0,
        pendingBookings: 0,
        completedBookings:0,
        recentBookings: [],
        monthlyRevenue: 0,
        totalWeight: 0
    })

    const dashboardCards =[
        {title: "Total Bookings", value:data.totalBookings, icon: assets.listIconColored},
        {title: "Pending Bookings", value:data.pendingBookings, icon: assets.cautionIconColored},
        {title: "Confirmed Bookings", value:data.completedBookings, icon: assets.listIconColored},
    ]

    // const fetchDashboardData = async()=>{
    //     try {
    //         const {data} = await axios.get('/api/owner/dashboard')
    //         if(data.success){
    //             setData(data.dashboardData)
    //         }
    //         else{
    //             toast.error(data.message)
    //         }
    //     } catch (error) {
    //         toast.error(error.message)
    //     }
    // }

    const fetchDashboardData = async () => {
    try {
        const response = await axios.get('/api/owner/dashboard');
        const resData = response.data;

        if(resData.success){
            const bookings = resData.dashboardData.recentBookings;

            // Calculate totals only from confirmed bookings
            const totalRevenue = bookings
                .filter(b => b.status === "confirmed")
                .reduce((sum, b) => sum + b.waste.price * b.waste.weight, 0);

            const totalWeightSold = bookings
                .filter(b => b.status === "confirmed")
                .reduce((sum, b) => sum + b.waste.weight, 0);

            // Update data state with calculated values
            setData({
                ...resData.dashboardData,
                monthlyRevenue: totalRevenue,
                totalWeight: totalWeightSold
            });
        } else {
            toast.error(resData.message);
        }
    } catch (error) {
        toast.error(error.message);
    }
};

    useEffect(()=>{
        if(isOwner){
            fetchDashboardData()
        }
        // setData(dummyDashboardData)
    },[isOwner])


    return(
        <div className="px-4 pt-10 md:px-10 flex-1">
            <Title title="Admin Dashboard" subTitle="Monitor overall performance including bookings, revenue and recent activities."/>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 max-w-3xl">
                {dashboardCards.map((card, index)=>(
                    <div key={index} className="flex gap-2 items-center justify-between p-4 rounded-md border border-borderColor">
                        <div>
                            <h1 className="text-xs text-gray-500">{card.title}</h1>
                            <p className="text-lg font-semibold">{card.value}</p>
                        </div>
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                            <img src={card.icon} alt="" className="w-4 h-4"/>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* recent bookings */}
                <div className="p-4 md:p-6 border border-borderColor rounded-md max-w-lg w-full">
                    <h1 className="text-lg font-medium">Recent Bookings</h1>
                     <p className="text-gray-500">Latest Customer Bookings</p>
                     {data.recentBookings.map((booking, index)=>(
                        <div key={index} className="mt-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                                    <img src={assets.listIconColored} alt="" className="h-5 w-5"/>
                                </div>

                                <div>
                                    <p>{booking.waste.wasteName} - {booking.waste.weight} kg</p>
                                    <p className="text-sm text-gray-500">{booking.createdAt.split('T')[0]}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 font-medium">
                                <p className="text-sm text-gray-500">{currency}{booking.waste.price}/kg</p>
                                <p className="pc-3 py-0.5 border border-borderColor rounded-full text-sm">{booking.status}</p>
                            </div>
                        </div>
                     ))}
                </div>
                {/* revenue and wt */}
                <div>
                    <div className="p-4 md:p-6 mb-6 border border-borderColor rounded-md w-fullmd:max-w-xs">
                    <h1 className="text-lg font-medium">Total Revenue</h1>
                    <p className="text-gray-500">Revenue for until now</p>
                    <p className="text-3xl mt-6 font-semibold text-primary">{currency}{data.monthlyRevenue}</p>
                </div>
                <div className="p-4 md:p-6 mb-6 border border-borderColor rounded-md w-fullmd:max-w-xs">
                    <h1 className="text-lg font-medium">Total Waste Sold</h1>
                    <p className="text-gray-500">Total waste sold until now</p>
                    <p className="text-3xl mt-6 font-semibold text-primary">{typeof data.totalWeight === 'number' ? data.totalWeight : 0} kg</p>
                </div>
                </div>
                
            </div>


        </div>
    )
}

export default Dashboard