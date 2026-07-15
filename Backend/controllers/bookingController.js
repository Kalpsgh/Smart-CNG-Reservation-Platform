import Booking from "../models/userBookings.js";
import crypto from "crypto";

export const createBooking = async(req,res)=>{

    console.log(req.body);
    const booking = await Booking.create({
        userId:req.user.id,

        ownerId:req.body.pumpId,

        bookingDate:req.body.bookingDate,

        slot:req.body.bookingTime,

        vehicleNumber:req.body.vehicleNumber,

        vehicleType:req.body.vehicleType,

        amount:req.body.bookingAmount,

        paymentStatus:"Paid",

        qrToken:crypto.randomUUID()

    });

    res.status(201).json({

        message:"Booking Successful",

        booking

    });

}

import OwnerProfile from "../models/OwnerProfile.js";

export const getAllPumps = async (req, res) => {

    try {

        const pumps = await OwnerProfile.find();
        console.log(pumps)
        res.status(200).json(pumps);

    } catch (err) {

        res.status(500).json({
            message: err.message,
        });

    }

};


import UserBookings from "../models/userBookings.js";

export const getAvailableSlots = async (req, res) => {
  try {
    const { ownerId } = req.params;
    const { date } = req.query;
    const allSlots = [
      "8:00 AM",
      "8:30 AM",
      "9:00 AM",
      "9:30 AM",
      "10:00 AM",
      "10:30 AM",
      "11:00 AM",
      "11:30 AM",
      "12:00 PM",
      "12:30 PM",
      "1:00 PM",
      "1:30 PM",
      "2:00 PM",
      "2:30 PM",
      "3:00 PM",
      "3:30 PM",
      "4:00 PM",
      "4:30 PM",
      "5:00 PM",
      "5:30 PM",
      "6:00 PM",
      "6:30 PM",
      "7:00 PM",
      "7:30 PM",
    ];

    // Create start & end of selected day
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    const bookings = await UserBookings.find();

    bookings.forEach((b) => {
    console.log({
        ownerId: b.ownerId.toString(),
        bookingDate: b.bookingDate,
        slot: b.slot,
    });
    });
    const slots = await Promise.all(
      allSlots.map(async (slot) => {
        const booked = await UserBookings.countDocuments({
          ownerId,
          bookingDate: {
            $gte: start,
            $lte: end,
          },
          slot: slot, 
        });
   
        return {
          time: slot,
          booked,
          available: Math.max(0, 10 - booked),
          isFull: booked >= 10,
        };
      })
    );

    res.status(200).json(slots);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};


export const getMyBookings = async (req, res) => {
  try {

    const bookings = await UserBookings.find({
      userId: req.user.id,
    })
      .populate({
            path: "ownerId",
            select: "pumpName latitude longitude cngRate",
            })
            .sort({ bookingDate: -1 });

      console.log(bookings)
    res.status(200).json(bookings);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


export const verifyBooking = async (req, res) => {
  try {

    const { qrToken } = req.body;

    const booking = await UserBookings.findOne({
      qrToken,
    });

    if (!booking) {
      return res.status(404).json({
        message: "Invalid QR Code",
      });
    }

    if (booking.status === "Completed") {
      return res.status(400).json({
        message: "Booking already completed",
      });
    }

    booking.status = "Completed";

    await booking.save();

    res.json({
      message: "Booking Verified Successfully",
      booking,
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};

export const getOwnerBookings = async (req, res) => {
  try {

    const ownerProfile = await OwnerProfile.findOne({
      userId: req.user.id,
    });

    const bookings = await UserBookings.find({
      ownerId: ownerProfile._id,
    })
      .populate("userId", "fullName mobile vehicleNumber")
      .sort({ bookingDate: -1 });

    res.status(200).json(bookings);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};





export const getOwnerDashboard = async (req, res) => {
  try {

    const owner = await OwnerProfile.findOne({
      userId: req.user.id,
    });

    if (!owner) {
      return res.status(404).json({
        message: "Owner not found",
      });
    }

    const activeBookings = await Booking.countDocuments({
      ownerId: owner._id,
      status: {
        $in: ["Pending", "Confirmed"],
      },
    });

    const completedBookings = await Booking.countDocuments({
      ownerId: owner._id,
      status: "Completed",
    });

    const cancelledBookings = await Booking.countDocuments({
      ownerId: owner._id,
      status: "Cancelled",
    });

    res.json({
      activeBookings,
      completedBookings,
      cancelledBookings,
      stationStatus: "Online",
      currentPressure: "200 Bar",
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};
export const updatePumpStatus = async (req,res)=>{

    try{

        const owner = await OwnerProfile.findOne({
            userId:req.user.id
        });

        owner.isOpen = req.body.isOpen;
        owner.closureReason = req.body.closureReason;
        owner.closedFrom = req.body.closedFrom || null;
        owner.closedTo = req.body.closedTo || null;

        await owner.save();

        res.json({
            message:"Pump status updated"
        });

    }
    catch(err){

        res.status(500).json({
            message:err.message
        });

    }

}


export const getPumpStatus = async (req, res) => {
  try {

    const owner = await OwnerProfile.findOne({
      userId: req.user.id,
    });

    if (!owner) {
      return res.status(404).json({
        message: "Pump not found",
      });
    }

    res.status(200).json(owner);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};
export const getUserDashboard = async (req, res) => {
  try {

    const year = Number(req.query.year) || new Date().getFullYear();

    const start = new Date(year, 0, 1);   // Jan 1
    const end = new Date(year + 1, 0, 1); // Jan 1 next year

    const bookings = await Booking.find({
      userId: req.user.id,
      bookingDate: {
        $gte: start,
        $lt: end,
      },
    }).sort({ bookingDate: -1 });

    const totalBookings = bookings.length;

    const activeBookings = bookings.filter(
      b => b.status === "Pending" || b.status === "Confirmed"
    ).length;

    const monthlyBookings = {};

    bookings.forEach((booking) => {
      const month = new Date(booking.bookingDate).toLocaleString("en-US", {
        month: "short",
      });

      monthlyBookings[month] = (monthlyBookings[month] || 0) + 1;
    });

    const months = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ];

    const chartData = months.map(month => ({
      name: month,
      bookings: monthlyBookings[month] || 0,
    }));

    const recentBookings = bookings.slice(0, 5);

    res.json({
      totalBookings,
      activeBookings,
      averageMonthly: (totalBookings / 12).toFixed(1),
      chartData,
      recentBookings,
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};