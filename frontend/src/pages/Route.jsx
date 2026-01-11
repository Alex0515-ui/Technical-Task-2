import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./Admin";
import MainPage from "./MainPage";

function Routing() {

    return (
    <BrowserRouter>
    <Routes>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/" element={<MainPage/>}/>
    </Routes>
    </BrowserRouter>
    );
    
}

export default Routing;