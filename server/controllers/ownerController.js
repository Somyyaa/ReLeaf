import imagekit from "../configs/imageKit.js";
import User from "../models/User.js";
import fs from "fs";
import Waste from "../models/Waste.js";
import Booking from "../models/Booking.js";

// api to change role of user
export const changeRoleToOwner = async (req, res) => {
    try {
        const { _id } = req.user;
        await User.findByIdAndUpdate(_id, { role: "owner" })
        res.json({ success: true, message: "Now you can list the agro-waste" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// api to list waste

export const addWaste = async (req, res) => {
    try {
        const { _id } = req.user;
        let waste = JSON.parse(req.body.wasteData)
        const imageFile = req.file;

        // if (waste.proDate) {
        //     const [day, month, year] = waste.proDate.split("-");
        //     waste.proDate = new Date(`${year}-${month}-${day}`);
        // }

        if (waste.proDate) {
            waste.proDate = new Date(waste.proDate); // 'yyyy-mm-dd' is already valid ISO format
        }

        // upload image to imagekit
        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/wastes'
        })

        // optimization through imagekit url transformation
        var optimizedImageURL = imagekit.url({
            path: response.filePath,
            transformation: [
                { width: '1280' }, //width resizing
                { quality: 'auto' }, //auto-compression
                { format: 'webp' } //convert to modern format
            ]
        });

        const image = optimizedImageURL;

        await Waste.create({ ...waste, owner: _id, image })
        // add to mongodb
        res.json({ success: true, message: "Waste Added" })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// api to list farmers waste
export const getOwnerWastes = async (req, res) => {
    try {
        const { _id } = req.user
        const wastes = await Waste.find({ owner: _id })
        res.json({ success: true, wastes })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// api to toggle waste availability
export const toggleWasteAvailability = async (req, res) => {
    try {
        const { _id } = req.user
        const { wasteId } = req.body
        const waste = await Waste.findById(wasteId)
        // checking if waste belongs to the user
        if (waste.owner.toString() !== _id.toString()) {
            return res.json({ success: false, message: "Unauthorized" })
        }

        waste.isAvailable = !waste.isAvailable
        await waste.save()

        res.json({ success: true, message: "Availability toggled" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// api to delte a waste
export const deleteWaste = async (req, res) => {
    try {
        const { _id } = req.user
        const { wasteId } = req.body
        const waste = await Waste.findById(wasteId)
        // checking if waste belongs to the user
        if (waste.owner.toString() !== _id.toString()) {
            return res.json({ success: false, message: "Unauthorized" })
        }

        waste.owner = null
        waste.isAvailable = false;
        await waste.save()

        res.json({ success: true, message: "Waste removed" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// api to get dashboard data
export const getDashboardData = async (req, res) => {
    try {
        const { _id, role } = req.user
        if (role !== 'owner') {
            return res.json({ success: false, message: "Unauthorized" })
        }
        const wastes = await Waste.find({ owner: _id })
        const bookings = await Booking.find({ owner: _id }).populate('waste').sort({ createdAt: -1 })

        const pendingBookings = await Booking.find({ owner: _id, status: "pending" })
        const completedBookings = await Booking.find({ owner: _id, status: "confirmed" })

        // monthly revenue
        const monthlyRevenue = bookings.slice().filter(booking => booking.status === 'confirmed').reduce((acc, booking) =>
            acc + booking.price, 0)

        // calculate total weight sold
        const totalWeight = bookings.slice().filter(booking => booking.status === 'confirmed').reduce((acc, booking) =>
            acc + booking.weight, 0)

        const dashboardData = {
            totalBookings: bookings.length,
            pendingBookings: pendingBookings.length,
            completedBookings: completedBookings.length,
            recentBookings: bookings.slice(0, 4),
            monthlyRevenue,
            totalWeight
        }

        res.json({ success: true, dashboardData })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}


// api to update user image

export const updateUserImage = async (req, res) => {
    try {
        const { _id } = req.user

        const imageFile = req.file;

        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/users'
        })

        // optimization through imagekit url transformation
        var optimizedImageURL = imagekit.url({
            path: response.filePath,
            transformation: [
                { width: '400' }, //width resizing
                { quality: 'auto' }, //auto-compression
                { format: 'webp' } //convert to modern format
            ]
        });

        const image = optimizedImageURL

        await User.findByIdAndUpdate(_id, { image })
        res.json({ success: true, message: "Image updated" })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}