import { Routes, Route, Navigate } from "react-router-dom";
import RetailUser from "./Components/UserLogin/RetailUser";
import Login from "./Components/UserLogin/Login";
import Admin from "./Components/UserLogin/Admin";
import DisplayRetailUser from "./Components/UserLogin/DisplayRetailUser";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" />} />  {/* ✅ Redirect to register page */}
      <Route path="/register" element={<RetailUser />} />
      <Route path="/users" element={<DisplayRetailUser />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />

    </Routes>
  );
}

export default App;
