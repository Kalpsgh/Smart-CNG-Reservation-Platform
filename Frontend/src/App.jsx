import { Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<Home />} />

        <Route path="login" element={<Login />} />

        <Route path="signup" element={<Signup />} />

      </Route>
    </Routes>
  );
}