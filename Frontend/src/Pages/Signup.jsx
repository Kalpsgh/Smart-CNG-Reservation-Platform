import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, Car, Lock, Eye, EyeOff,MapPin,Fuel ,IndianRupee  } from "lucide-react";
import api from "../api/api";
import toast from "react-hot-toast";



export default function Signup() {
const [showUserPassword, setShowUserPassword] = useState(false);
const [showUserConfirm, setShowUserConfirm] = useState(false);

const [showOwnerPassword, setShowOwnerPassword] = useState(false);
const [showOwnerConfirm, setShowOwnerConfirm] = useState(false);
  const navigate = useNavigate();
  const [role, setRole] = useState("user"); // 'user' or 'owner'
const [formData, setFormData] = useState({
  fullName: "",
  email: "",
  mobile: "",
  vehicleNumber: "",
  vehicleType: "",
  password: "",
  confirmPassword: "",
});
const [formDatao, setFormDatao] = useState({
  fullNameO: "",
  emailO: "",
  mobileO: "",
  pumpName: "",
  cngRate: "",
  latitude: "",
longitude: "",
  passwordO: "",
  confirmPasswordO: "",
});
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
const handleOwnerChange = (e) => {
  setFormDatao({
    ...formDatao,
    [e.target.name]: e.target.value,
  });
};


const handleSignup = async (e) => {
  e.preventDefault();
  try {
    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters long.");
      
    }
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }
    if (formData.mobile.length !== 10) {
      return toast.error("Mobile number must be 10 digits");
    }
    const vehicleRegex = /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/;
    
    if (!vehicleRegex.test(formData.vehicleNumber.toUpperCase())) {
        return toast.error("Enter a valid vehicle number (e.g., MH12AB1234)");
    }
      const res = await api.post("/auth/signup", {
        fullName: formData.fullName,
        email: formData.email,
        mobile: formData.mobile,
        vehicleNumber: formData.vehicleNumber,
        vehicleType: formData.vehicleType,
        password: formData.password,
    });
    console.log("Response:", res);
    
    toast.success(res.data.message);

    navigate("/login");
    
  } catch (err) {

    console.log(err);
    
    return toast.error(err.response?.data?.message ||
      err.message ||
      "Signup Failed");
  
  }
};

const handleOwnerSignup = async (e) => {
  e.preventDefault();

  try {
    if (formDatao.passwordO.length < 6) {
      return toast.error("Password must be at least 6 characters long.");
    }

    if (formDatao.passwordO !== formDatao.confirmPasswordO) {
      return toast.error("Passwords do not match.");
    }

    if (!/^\d{10}$/.test(formDatao.mobileO)) {
      return toast.error("Enter a valid 10-digit mobile number.");
    }

    if (isNaN(formDatao.cngRate)) {
      return toast.error("CNG Rate must be a valid number.");
    }

    const latitude = Number(formDatao.latitude);
    const longitude = Number(formDatao.longitude);

    if (isNaN(latitude) || latitude < -90 || latitude > 90) {
      return toast.error("Latitude must be between -90 and 90.");
    }

    if (isNaN(longitude) || longitude < -180 || longitude > 180) {
      return toast.error("Longitude must be between -180 and 180.");
    }

    const loadingToast = toast.loading("Creating Pump Owner Account...");

    const res = await api.post("/auth/signup-owner", {
      fullName: formDatao.fullNameO,
      email: formDatao.emailO,
      mobile: formDatao.mobileO,
      pumpName: formDatao.pumpName,
      cngRate: formDatao.cngRate,
      latitude: formDatao.latitude,
      longitude: formDatao.longitude,
      password: formDatao.passwordO,
    });

    toast.dismiss(loadingToast);

    toast.success(
      res.data.message || "Pump Owner Registered Successfully!"
    );

    navigate("/login");

  } catch (err) {
    console.log(err);

    toast.dismiss();

    toast.error(
      err.response?.data?.message ||
      err.message ||
      "Signup Failed"
    );
  }
};
  return (
    <div className="min-h-screen flex bg-green-50 dark:bg-slate-950 items-center justify-center p-4 transition-colors">
      <div className="w-full max-w-lg">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl dark:shadow-2xl">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Create Account</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Register to continue</p>
<div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-6 mt-3">
  {["user", "owner"].map((r) => (
    <button
      key={r}
      type="button"
      onClick={() => setRole(r)}
      className={`flex-1 py-2 text-sm font-bold capitalize rounded-lg transition-all ${
        role === r ? "bg-white dark:bg-slate-700 shadow-sm" : "text-slate-500"
      }`}
    >
      {r}
    </button>
  ))}

</div>
          {role === "user" && (
         <form
            onSubmit={handleSignup}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6"
            >
              
  
            {/* Full Name */}
            <div className="sm:col-span-2">
              <label className="text-slate-600 dark:text-slate-400 text-xs font-medium">Full Name</label>
              <div className="mt-1.5 flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg px-3">
                <User className="text-slate-500 dark:text-slate-400" size={16} />
                <input
                 type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
                  className="bg-transparent py-2.5 px-3 outline-none w-full text-slate-900 dark:text-white text-sm placeholder:text-slate-400"
                required
                />
              </div>
            </div>

            {/* Email */}
            <div className="sm:col-span-2">
              <label className="text-slate-600 dark:text-slate-400 text-xs font-medium">Email</label>
              <div className="mt-1.5 flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg px-3">
                <Mail className="text-slate-500 dark:text-slate-400" size={16} />
                <input
                  type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  className="bg-transparent py-2.5 px-3 outline-none w-full text-slate-900 dark:text-white text-sm placeholder:text-slate-400"
                required
                />
              </div>
            </div>

            {/* Mobile */}
            <div>
              <label className="text-slate-600 dark:text-slate-400 text-xs font-medium">Mobile Number</label>
              <div className="mt-1.5 flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg px-3">
                <Phone className="text-slate-500 dark:text-slate-400" size={16} />
                <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="9876543210"
                  className="bg-transparent py-2.5 px-3 outline-none w-full text-slate-900 dark:text-white text-sm placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Vehicle Number */}
            <div>
              <label className="text-slate-600 dark:text-slate-400 text-xs font-medium">Vehicle Number</label>
              <div className="mt-1.5 flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg px-3">
                <Car className="text-slate-500 dark:text-slate-400" size={16} />
                <input
                   type="text"
                    name="vehicleNumber"
                    value={formData.vehicleNumber}
                    onChange={handleChange}
                    placeholder="MH12AB1234"
                  className="bg-transparent py-2.5 px-3 outline-none w-full text-slate-900 dark:text-white text-sm uppercase placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Vehicle Type */}
            <div className="sm:col-span-2">
              <label className="text-slate-600 dark:text-slate-400 text-xs font-medium">Vehicle Type</label>
              <select 
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                className="mt-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-lg py-2.5 px-3 text-slate-900 dark:text-white text-sm outline-none border border-slate-200 dark:border-none appearance-none" required>
                <option value="">Select Vehicle Type</option>
                <option value="Car">Car</option>
                <option value="Auto Rickshaw">Auto Rickshaw</option>
                <option value="Taxi">Taxi</option>
                <option value="Bus">Bus</option>
              </select>
            </div>

            {/* Password */}
            <div>
              <label className="text-slate-600 dark:text-slate-400 text-xs font-medium">Password</label>
              <div className="mt-1.5 flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg px-3">
                <Lock className="text-slate-500 dark:text-slate-400" size={16} />
                <input
                  type={showUserPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                     minLength={6}
                  className="bg-transparent py-2.5 px-3 outline-none w-full text-slate-900 dark:text-white text-sm placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowUserPassword(!showUserPassword)}
                  className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  {showUserPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-slate-600 dark:text-slate-400 text-xs font-medium">Confirm Password</label>
              <div className="mt-1.5 flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg px-3">
                <Lock className="text-slate-500 dark:text-slate-400" size={16} />
                <input
                  type={showUserConfirm  ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                     minLength={6}
                  className="bg-transparent py-2.5 px-3 outline-none w-full text-slate-900 dark:text-white text-sm placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowUserConfirm(!showUserConfirm)}
                  className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  {showUserConfirm  ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="sm:col-span-2 flex items-center gap-2 mt-2">
              <input type="checkbox" id="terms" className="accent-green-600 w-4 h-4 rounded cursor-pointer" />
              <label htmlFor="terms" className="text-slate-600 dark:text-slate-400 text-xs cursor-pointer">
                I agree to the Terms & Conditions
              </label>
            </div>

            {/* Button */}
            <button 
              type="submit" 
              className="sm:col-span-2 w-full mt-2 py-2.5 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors"
                
            >
              Create Account
            </button>
          </form>
)}
 {role === "owner" && (
         <form
            onSubmit={handleOwnerSignup}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6"
            >
              
  
            {/* Full Name */}
            <div>
              <label className="text-slate-600 dark:text-slate-400 text-xs font-medium">Full Name</label>
              <div className="mt-1.5 flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg px-3">
                <User className="text-slate-500 dark:text-slate-400" size={16} />
                <input
                 type="text"
                name="fullNameO"
                value={formDatao.fullNameO}
                onChange={handleOwnerChange}
                placeholder="Enter full name"
                  className="bg-transparent py-2.5 px-3 outline-none w-full text-slate-900 dark:text-white text-sm placeholder:text-slate-400"
                required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-slate-600 dark:text-slate-400 text-xs font-medium">Email</label>
              <div className="mt-1.5 flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg px-3">
                <Mail className="text-slate-500 dark:text-slate-400" size={16} />
                <input
                  type="email"
                    name="emailO"
                    value={formDatao.emailO}
                    onChange={handleOwnerChange}
                    placeholder="abc@example.com"
                  className="bg-transparent py-2.5 px-3 outline-none w-full text-slate-900 dark:text-white text-sm placeholder:text-slate-400"
                required
                />
              </div>
            </div>

            {/* Mobile */}
            <div>
              <label className="text-slate-600 dark:text-slate-400 text-xs font-medium">Mobile Number</label>
              <div className="mt-1.5 flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg px-3">
                <Phone className="text-slate-500 dark:text-slate-400" size={16} />
                <input
                    type="tel"
                    name="mobileO"
                    value={formDatao.mobileO}
                    onChange={handleOwnerChange}
                    placeholder="9876543210"
                  className="bg-transparent py-2.5 px-3 outline-none w-full text-slate-900 dark:text-white text-sm placeholder:text-slate-400"
                />
              </div>
              </div>
            <div>
              <label className="text-slate-600 dark:text-slate-400 text-xs font-medium">Pump Name</label>
              <div className="mt-1.5 flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg px-3">
                <Fuel className="text-slate-500 dark:text-slate-400" size={16} />
                <input
                 type="text"
                name="pumpName"
                value={formDatao.pumpName}
                onChange={handleOwnerChange}
                placeholder="e.g. Shell CNG"
                  className="bg-transparent py-2.5 px-3 outline-none w-full text-slate-900 dark:text-white text-sm placeholder:text-slate-400"
                required
                />
            
              </div>
            </div>


            

     
          <div>
              <label className="text-slate-600 dark:text-slate-400 text-xs font-medium">CNG Rate (₹/kg)</label>
              <div className="mt-1.5 flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg px-3">
                <IndianRupee  className="text-slate-500 dark:text-slate-400" size={16} />
                <input
                 type="text"
                name="cngRate"
                value={formDatao.cngRate}
                onChange={handleOwnerChange}
                placeholder="75.00"
                  className="bg-transparent py-2.5 px-3 outline-none w-full text-slate-900 dark:text-white text-sm placeholder:text-slate-400"
                required
                />
            
              </div>
            </div>

   {/* Latitude */}
<div>
  <label className="text-slate-600 dark:text-slate-400 text-xs font-medium">
    Latitude
  </label>

  <div className="mt-1.5 flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg px-3">
    <MapPin className="text-slate-500 dark:text-slate-400" size={16} />

    <input
      type="number"
      step="any"
      name="latitude"
      value={formDatao.latitude}
      onChange={handleOwnerChange}
      placeholder="18.5204"
      className="bg-transparent py-2.5 px-3 outline-none w-full text-slate-900 dark:text-white text-sm placeholder:text-slate-400"
      required
    />
  </div>
</div>

{/* Longitude */}
<div>
  <label className="text-slate-600 dark:text-slate-400 text-xs font-medium">
    Longitude
  </label>

  <div className="mt-1.5 flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg px-3">
    <MapPin className="text-slate-500 dark:text-slate-400" size={16} />

    <input
      type="number"
      step="any"
      name="longitude"
      value={formDatao.longitude}
      onChange={handleOwnerChange}
      placeholder="73.8567"
      className="bg-transparent py-2.5 px-3 outline-none w-full text-slate-900 dark:text-white text-sm placeholder:text-slate-400"
      required
    />
  </div>
</div>

            {/* Password */}
            <div>
              <label className="text-slate-600 dark:text-slate-400 text-xs font-medium">Password</label>
              <div className="mt-1.5 flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg px-3">
                <Lock className="text-slate-500 dark:text-slate-400" size={16} />
                <input
                  type={showOwnerPassword  ? "text" : "password"}
                    name="passwordO"
                    value={formDatao.passwordO}
                    onChange={handleOwnerChange}
                    placeholder="Password"
                  className="bg-transparent py-2.5 px-3 outline-none w-full text-slate-900 dark:text-white text-sm placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowOwnerPassword(!showOwnerPassword)}
                  className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  {showOwnerPassword  ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-slate-600 dark:text-slate-400 text-xs font-medium">Confirm Password</label>
              <div className="mt-1.5 flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg px-3">
                <Lock className="text-slate-500 dark:text-slate-400" size={16} />
                <input
                  type={showOwnerConfirm ? "text" : "password"}
                    name="confirmPasswordO"
                    value={formDatao.confirmPasswordO}
                    onChange={handleOwnerChange}
                    placeholder="Confirm Password"
                  className="bg-transparent py-2.5 px-3 outline-none w-full text-slate-900 dark:text-white text-sm placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowOwnerConfirm(!showOwnerConfirm)}
                  className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  {showOwnerConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="sm:col-span-2 flex items-center gap-2 mt-2">
              <input type="checkbox" id="terms" className="accent-green-600 w-4 h-4 rounded cursor-pointer" />
              <label htmlFor="terms" className="text-slate-600 dark:text-slate-400 text-xs cursor-pointer">
                I agree to the Terms & Conditions
              </label>
            </div>

            {/* Button */}
            <button 
              type="submit" 
              className="sm:col-span-2 w-full mt-2 py-2.5 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors"
                
            >
              Create Account
            </button>
          </form>
)}
          {/* Login Link */}
          <div className="text-center mt-6 text-sm">
            <span className="text-slate-600 dark:text-slate-400">Already have an account?</span>
            <button 
              onClick={() => navigate("/login")}
              className="ml-2 text-green-600 dark:text-green-400 font-medium hover:underline"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}