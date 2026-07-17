  import User from "../models/User.js";
  import UserProfile from "../models/UserProfile.js";
  import OwnerProfile from "../models/OwnerProfile.js";
  import bcrypt from "bcryptjs";
  import jwt from "jsonwebtoken";

  export const register = async (req, res) => {
    try {
      const {
        fullName,
        email,
        mobile,
        vehicleNumber,
        vehicleType,
        password,
      } = req.body;

      const exist = await User.findOne({ email });

      if (exist) {
        return res.status(400).json({
          message: "Email already exists",
        });
      }

      const hash = await bcrypt.hash(password, 10);

      // Create User
      const user = await User.create({
        fullName,
        email,
        mobile,
        password: hash,
        role: "user",
      });

      // Create User Profile
      await UserProfile.create({
        userId: user._id,
        vehicleNumber,
        vehicleType,
      });

      return res.status(201).json({
        message: "Registration Successful",
      });

    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  };



  export const ownerRegister = async (req, res) => {
    try {
      const {
        fullName,
        email,
        mobile,
        pumpName,
        cngRate,
        latitude,
        longitude,
        password,
      } = req.body;

      const exist = await User.findOne({ email });

      if (exist) {
        return res.status(400).json({
          message: "Email already exists",
        });
      }

      const hash = await bcrypt.hash(password, 10);

      const owner = await User.create({
        fullName,
        email,
        mobile,
        password: hash,
        role: "owner",
      });

      await OwnerProfile.create({
        userId: owner._id,
        pumpName,
        cngRate,
        latitude,
        longitude,
      });

      res.status(201).json({
        message: "Owner Registration Successful",
      });

    } catch (err) {
  console.error("Register Error:", err);

  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}
  };


  export const login = async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.status(400).json({
          message: "Invalid Password",
        });
      }

      // Fetch profile based on role
      let profile = null;

      if (user.role === "user") {
        profile = await UserProfile.findOne({ userId: user._id });
      } else if (user.role === "owner") {
        profile = await OwnerProfile.findOne({ userId: user._id });
      }

      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.status(200).json({
        message: "Login Successful",
        token,
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          mobile: user.mobile,
          role: user.role,
        },
        profile,
      });

    } catch (err) {
  console.error("Register Error:", err);

  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}
  };

