import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Doctors, DoctorDetails, Contact, Home, Login, Services, Signup } from '../pages';

const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctors/:id" element={<DoctorDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/services" element={<Services />} />
        </Routes>
    );
};

export default Routers;
