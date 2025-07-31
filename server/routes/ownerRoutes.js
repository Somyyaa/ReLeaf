import express, { Router } from 'express'
import { protect } from '../middleware/auth.js'
import { addWaste, changeRoleToOwner, deleteWaste, getDashboardData, getOwnerWastes, toggleWasteAvailability, updateUserImage } from '../controllers/ownerController.js'
import upload from '../middleware/multer.js'

const ownerRouter = express.Router()

ownerRouter.post("/change-role", protect, changeRoleToOwner)
ownerRouter.post("/add-waste", upload.single("image"), protect, addWaste)
ownerRouter.get("/wastes", protect, getOwnerWastes)
ownerRouter.post("/toggle-waste", protect, toggleWasteAvailability)
ownerRouter.post("/delete-waste", protect, deleteWaste)

ownerRouter.get("/dashboard", protect, getDashboardData)
ownerRouter.post('/update-image', upload.single("image"), protect, updateUserImage)

export default ownerRouter