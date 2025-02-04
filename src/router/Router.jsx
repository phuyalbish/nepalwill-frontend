import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "@/views/LandingPage";
import AboutUs from "@/views/AboutUs.jsx";
import Gallery from "@/views/Gallery";
const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default Router;
