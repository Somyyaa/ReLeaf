import Booking from "../models/Booking.js";
import Waste from "../models/Waste.js";


// api to check availability of waste for a given location
export const checkAvailabilityOfWaste = async (req, res) => {
    try {
        const { location } = req.body

        // fetch all available waste for the given location
        const availableWastes = await Waste.find({
            location: { $regex: new RegExp(location, "i") },
            isAvailable: true
        });

        res.json({success: true, availableWastes})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// api to create booking

export const createBooking = async(req, res)=>{
    try {
        const {_id} = req.user;
        const {waste, pickupDate} = req.body

        const wasteData = await Waste.findById(waste)

        if (!wasteData || !wasteData.isAvailable) {
            return res.json({success:false, message: "Waste is not available"});
        }

        await Booking.create({waste, owner: wasteData.owner, user: _id, pickupDate, price: wasteData.price, weight: wasteData.weight})

        res.json({ success: true, message: "Booking created successfully" })
    } catch (error) {
         console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// api to list user bookings

export const getUserBookings = async(req, res)=>{
    try {
        const {_id} = req.user
        const bookings = await Booking.find({user: _id}).populate("waste").sort({createdAt: -1})

        res.json({success:true, bookings})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}


// api to get owner bookings
export const getOwnerBookings = async(req, res)=>{
    try {
       if(req.user.role != 'owner'){
        return res.json({success: false, message: "Unauthorized"})
       }

       const bookings = await Booking.find({owner: req.user._id}).populate('waste user').select("-user.password").sort({createdAt: -1})

       res.json({success: true, bookings})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// api to change booking status

export const changeBookingStatus = async(req, res)=>{
    try {
       const {_id} = req.user
       const {bookingId, status} = req.body

       const booking = await Booking.findById(bookingId)

       if(booking.owner.toString() !== _id.toString()){
        return res.json({success: false, message: "Unauthorized"})
       }

       booking.status = status
       await booking.save();

       if (status === "confirmed") {
            const waste = await Waste.findById(booking.waste._id);
            waste.isAvailable = false;
            await waste.save();
        }

       res.json({success: true, message: "Status updated"})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}
