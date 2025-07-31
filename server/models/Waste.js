import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema.Types

const wasteSchema = new mongoose.Schema({
    owner: {type: ObjectId, ref:'User'},
    wasteName: {type: String, required: true},
    weight: {type: Number, required: true},
    image: {type: String, required:true},
    email: {type: String, required: true},
    proDate: {type: Date, required: true},
    price: {type: Number, required: true},
    location: {type: String, required:true},
    chemUsage: {type: String, required:true},
    isAvailable: {type: Boolean, default:true, required:true},
}, {timestamps: true})

const Waste = mongoose.model('Waste', wasteSchema)

export default Waste