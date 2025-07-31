import React, { useEffect, useState } from "react";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ManageBookings = () => {
    const {currency, axios} = useAppContext()

    // const currency = import.meta.env.VITE_CURRENCY
    const [bookings, setBookings] = useState([])

    const fetchOwnerBookings = async () => {
        // setBookings(dummyMyBookingsData) 
        try {
            const {data} = await axios.get('/api/bookings/owner')
            data.success ? setBookings(data.bookings) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    const changeBookingStatus = async(bookingId, status)=>{
        try {
            const {data} = await axios.post('/api/bookings/change-status', {bookingId, status})
            if(data.success){
                toast.success(data.message)
                fetchOwnerBookings()
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    // useEffect(() => {
    //     fetchOwnerBookings()
    // }, [])

    const{user, isOwner} = useAppContext()
    useEffect(() => {
    if (user && isOwner) {
        fetchOwnerBookings();
    }
}, [user, isOwner]);

 if (!user) {
        return <div className="text-center p-10 text-gray-500">Loading user...</div>;
    }

    if (user && !isOwner) {
        return <div className="text-center p-10 text-red-500 font-semibold">Unauthorized: Owner access only</div>;
    }

    return (
        <div className="px-4 pt-10 md:px-10 w-full">
            <Title title="Manage Bookings" subTitle="View all listed residue, or update their details on the booking platform." />

            <div className="max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6">
                <table className="w-full border-collapse text-left text-sm text-gray-600">
                    <thead className="text-gray-500">
                        <tr>
                            <th className="p-3 font-medium">Residue</th>
                            <th className="p-3 font-medium max-md:hidden">Weight</th>
                            <th className="p-3 font-medium">Total Price</th>
                            <th className="p-3 font-medium max-md:hidden">Payment</th>
                            <th className="p-3 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking, index) => (
                            <tr key={index} className="border-t border-borderColor text-gray-500">
                                <td className="p-3 flex items-center gap-3">
                                    <img src={booking.waste.image} alt="" className="h-12 w-12 aspect=square rounded-md object-cover" />
                                    <p className="font-medium max-md:hidden">{booking.waste.wasteName} </p>

                                </td>

                                <td className="p-3 max-md:hidden">
                                    {booking.waste.weight}
                                </td>


                                <td className="p-3">
                                    {currency}{booking.waste.price * booking.waste.weight}
                                </td>

                                <td className="p-3 max-md:hidden">
                                    <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">offline</span>
                                </td>

                                <td className="p-3">
                                    {booking.status === 'pending' ? (
                                        <select onChange={(e)=>changeBookingStatus(booking._id, e.target.value)} value={booking.status}
                                            className="px-2 py-1.5 mt-1 text-gray-500 border border-borderColor rounded-md outline-none">
                                            <option value="pending">Pending</option>
                                            <option value="cancelled">Cancelled</option>
                                            <option value="confirmed"> Confirmed</option>
                                        </select>
                                    ) : (
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === 'confirmed' ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'}`}>{booking.status}</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManageBookings