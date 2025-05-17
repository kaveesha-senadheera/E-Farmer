import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Home/Home";
import RetailUser from "./Components/UserLogin/RetailUser";
import Login from "./Components/UserLogin/Login";
import Admin from "./Components/UserLogin/Admin";
import DisplayRetailUser from "./Components/UserLogin/DisplayRetailUser";
import UserProfile from './Components/UserLogin/UserProfile';
import Support from './Components/Support/Support';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<RetailUser />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/users" element={<DisplayRetailUser />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/support" element={<Support />} />
    </Routes>
  );
}

export default App;
