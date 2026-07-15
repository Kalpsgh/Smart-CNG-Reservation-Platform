import mongoose from "mongoose";

const ownerProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    pumpName: {
      type: String,
      required: true,
      trim: true,
    },

    cngRate: {
      type: Number,
      required: true,
    },

    latitude: {
      type: Number,
      required: true,
    },

    longitude: {
      type: Number,
      required: true,
    },

    isApproved: {
      type: Boolean,
      default: false,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },

    closureReason: {
      type: String,
      enum: [
        "",
        "Gas Unavailable",
        "Maintenance",
        "Power Failure",
        "Holiday",
        "Other",
      ],
      default: "",
    },

    closedFrom: {
      type: Date,
      default: null,
    },

    closedTo: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("OwnerProfile", ownerProfileSchema);