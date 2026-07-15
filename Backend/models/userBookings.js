import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OwnerProfile",
      required: true,
    },

    vehicleNumber: {
      type: String,
      required: true,
    },

    vehicleType: {
      type: String,
      enum: ["Sedan", "SUV", "Hatback", "Commercial"],
      required: true,
    },

    bookingDate: {
      type: Date,
      required: true,
    },

    slot: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Completed",
        "Cancelled",
      ],
      default: "Pending",
    },

    qrToken: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Booking", bookingSchema);