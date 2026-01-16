import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React from 'react';
import Admin from './my-react-app/src/Admin';


function App() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/admin" element = {<Admin/>}/>
        </Routes>
        </BrowserRouter>
    );
}