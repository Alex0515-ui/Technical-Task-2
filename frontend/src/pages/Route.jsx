import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<div className="flex h-screen items-center justify-center">404 - Страница не найдена</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;