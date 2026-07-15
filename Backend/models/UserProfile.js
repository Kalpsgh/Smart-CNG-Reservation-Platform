import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    vehicleNumber: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },

    vehicleType: {
      type: String,
      required: true,
      enum: ["Car", "Auto Rickshaw", "Taxi", "Bus"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("UserProfile", userProfileSchema);