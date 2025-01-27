import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "@/views/LandingPage";
import AboutUs from '@/views/AboutUs.jsx';
const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/aboutus" element={<AboutUs />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default Router;
