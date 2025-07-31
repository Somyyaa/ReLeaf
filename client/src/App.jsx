import React, { useState } from "react";
import NavBar from "./components/NavBar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import WasteDetails from "./pages/WasteDetails";
import Wastes from "./pages/Wastes";
import MyBookings from "./pages/MyBookings";
import Footer from "./components/Footer";
import Layout from "./pages/owner/Layout";
import Dashboard from "./pages/owner/Dashboard";
import AddWaste from "./pages/owner/AddWaste";
import ManageWaste from "./pages/owner/ManageWaste";
import ManageBooking from "./pages/owner/ManageBookings";
import Login from "./components/Login";
import Chatbot from "./pages/Chatbot";
import {Toaster} from 'react-hot-toast'
import { useAppContext } from "./context/AppContext";

const App = () => {
  const {showLogin} = useAppContext()
  const isOwnerPath = useLocation().pathname.startsWith('/owner')
  const isHome = location.pathname === '/';
  return(
    <>
    <Toaster />
    {showLogin && <Login/>}
      {!isOwnerPath && <NavBar/>}

     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/waste-details/:id' element={<WasteDetails/>}/>
      <Route path='/Wastes' element={<Wastes/>}/>
      <Route path='/my-bookings' element={<MyBookings/>}/>
      <Route path='/owner' element={<Layout/>}>
      <Route index element={<Dashboard/>}/>
      <Route path="add-waste" element={<AddWaste/>}/>
      <Route path="manage--waste" element={<ManageWaste/>}/>
      <Route path="manage-bookings" element={<ManageBooking/>}/>
      </Route>
     </Routes>

     {isHome && <Chatbot/>}

    {!isOwnerPath && <Footer />}

    </>
  )
}

export default App;