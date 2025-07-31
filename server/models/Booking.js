import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema.Types

const bookingSchema = new mongoose.Schema({
    waste:{type: ObjectId, ref:"Waste", required:true},
    user: {type: ObjectId, ref:"User", required:true},
    owner:{type: ObjectId, ref:"User", required:true},
    pickupDate: {type:Date, required:true},
    price: {type: Number, required: true},
    weight: {type: Number, required: true},
    status: {type:String, enum: ["pending", "confirmed", "cancelled"], default: "pending"},
}, {timestamps: true})

const Booking = mongoose.model('Booking', bookingSchema)

export default Booking