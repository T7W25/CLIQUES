import React from "react";
import { Routes, Route } from "react-router-dom";
import "./master.css";

import Header from "./Common/Header";
import Footer from "./Common/Footer";
import Page404 from "./Components/Error";
import Home from "./Components/Pages/Home";
import Aboutus from "./Components/Pages/Aboutus";
import Login from "./Components/Pages/Login";
import Dashboard from "./Components/User/Dashboard";
import Settings from "./Components/User/Settings";
import Profile from "./Components/User/Profile";
import Contact from "./Components/Service/Contact";
import Users from "./Components/User/Users";
import AddUser from "./Components/User/AddUser";
import Category from "./Components/User/Categories/Category";
import AddCategory from "./Components/User/Categories/AddCategory";
import EditCategory from "./Components/User/Categories/EditCategory";
// import ManageServices from "./Components/User/Services/ManageServices";
// import AddService from "./Components/User/Services/AddService";
// import EditService from "./Components/User/Services/EditService";
import ExploreServices from "./Components/Pages/ExploreServices";
import ServiceDetail from "./Components/Pages/ServiceDetail";
import Register from "./Components/Pages/Register";
// import Feedback from "./Components/User/Feedback";
import ProtectedRoute from "./Components/ProtectedRoute";
import Unauthorized from "./Components/Error/Unauthorized"; // Optional if you want a 403 page
import ManageBookings from "./Components/User/ManageBookings";
import MyBookings from "./Components/User/MyBookings";
import MyTickets from "./Components/User/MyTickets";
import MyReviews from "./Components/User/MyReviews";
import TrackEarnings from "./Components/User/TrackEarnings";
import PaymentHistory from "./Components/User/PaymentHistory";
import MyPayments from "./Components/User/MyPayments";
import ManageTickets from "./Components/User/ManageTickets";
import AdminTickets from "./Components/User/AdminTickets";
import ManageServiceProvider from "./Components/User/ManageServiceProvider";
import ManageReviews from "./Components/User/ManageReviews";
import MyChat from "./Components/User/MyChat";

function Master() {
  return (
    <>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/explore-services" element={<ExploreServices />} />
        <Route path="/service/:id" element={<ServiceDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<Page404 />} />

        {/* ✅ Role Protected Routes */}

        {/* Admin Only */}
        <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/admin-tickets" element={<AdminTickets />} />
          {/* <Route path="/manage-services" element={<ManageServices />} /> */}
        </Route>


        {/* Service Category Manager Only */}
        <Route element={<ProtectedRoute allowedRoles={["Admin", "Service Category Manager"]} />}>
          <Route path="/categories" element={<Category />} />
          <Route path="/category/add" element={<AddCategory />} />
          <Route path="/category/edit/:id" element={<EditCategory />} />
          {/* <Route path="/manage-services" element={<ManageServices />} /> */}
        </Route>

        {/* Service Provider Only */}
        <Route element={<ProtectedRoute allowedRoles={["Admin", "Service Provider"]} />}>
          {/* <Route path="/manage-services" element={<ManageServices />} />
          <Route path="/service/add" element={<AddService />} />
          <Route path="/service/edit/:id" element={<EditService />} /> */}

          <Route path="/manage-bookings" element={<ManageBookings />} />
          <Route path="/payment-history" element={<PaymentHistory />} />
          <Route path="/track-earnings" element={<TrackEarnings />} />
          <Route path="/my-chat" element={<MyChat />} />
        </Route>

        {/* Client Only */}
        <Route element={<ProtectedRoute allowedRoles={["Client"]} />}>
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/my-payments" element={<MyPayments />} />
          <Route path="/my-tickets" element={<MyTickets />} />
          <Route path="/my-reviews" element={<MyReviews />} /> 
        </Route>

        {/* Moderator Only */}
        <Route element={<ProtectedRoute allowedRoles={["Moderator"]} />}>
          <Route path="/manage-tickets" element={<ManageTickets />} />
          <Route path="/manage-service-provider" element={<ManageServiceProvider />} />
          <Route path="/manage-reviews" element={<ManageReviews />} />
        </Route>

        {/* Shared Routes (All logged-in roles) */}
        <Route element={<ProtectedRoute allowedRoles={["Admin", "Client", "Service Provider", "Moderator", "Service Category Manager"]} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default Master;
