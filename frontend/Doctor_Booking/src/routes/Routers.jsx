import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Doctors, DoctorDetails, Contact, Home, Login, Services, Signup } from '../pages';
import { MyAccount, DashBoard } from '../Dashboard';
import ProtectedRouter from './ProtectedRouter';
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
            <Route
                path="/user/profile/me"
                element={
                    <ProtectedRouter allowedRoles={['patient']}>
                        <MyAccount />
                    </ProtectedRouter>
                }
            />
            <Route
                path="/doctor/profile/me"
                element={
                    <ProtectedRouter allowedRoles={['doctor']}>
                        <DashBoard />
                    </ProtectedRouter>
                }
            />
        </Routes>
    );
};

export default Routers;
