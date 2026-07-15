import express from "express";
import {
  createBooking
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";
import { getAllPumps } from "../controllers/bookingController.js";
import { getAvailableSlots } from "../controllers/bookingController.js";
import { getMyBookings ,verifyBooking ,getOwnerBookings ,getOwnerDashboard ,updatePumpStatus,getPumpStatus,getUserDashboard} from "../controllers/bookingController.js";
const router = express.Router();


router.post("/create", protect, createBooking);
router.get("/all", getAllPumps);
router.get("/available-slots/:ownerId", getAvailableSlots);
router.get("/user-bookings", protect, getMyBookings);
router.post("/verify-booking", protect, verifyBooking);
router.get("/owner-bookings", protect, getOwnerBookings);
router.get("/owner-dashboard", protect, getOwnerDashboard); 
router.get("/my-status", protect, getPumpStatus);

router.get(
    "/user-dashboard",
    protect,
    getUserDashboard
);
router.put(
    "/update-status",
    protect,
    updatePumpStatus
);
export default router;