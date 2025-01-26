import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "@/views/LandingPage";
const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default Router;
