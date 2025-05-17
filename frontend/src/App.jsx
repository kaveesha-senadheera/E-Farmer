import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateReview from "./pages/CreateReview";
import ShowReview from "./pages/ShowReview"; // Updated import name
import EditReview from "./pages/EditReview"; // Updated import name
import DeleteReview from "./pages/DeleteReview"; // Updated import name
import Navbar from "./components/home/Navbar";
import Admin from "./pages/Admin";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reviews/create" element={<CreateReview />} />
        <Route path="/reviews/admin" element={<Admin />} />
        <Route path="/reviews/details/:id" element={<ShowReview />} />
        <Route path="/reviews/edit/:id" element={<EditReview />} />
        <Route path="/reviews/delete/:id" element={<DeleteReview />} />
      </Routes>
    </>
  );
};

export default App;
