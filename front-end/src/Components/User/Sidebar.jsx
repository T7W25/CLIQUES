import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
    FaHome, FaUser, FaCog, FaBars, FaSignOutAlt, FaUsers, FaList,
    FaCheckDouble,
    FaComments,
    FaCalendarCheck,
    FaShieldAlt,
    FaDollarSign,
    FaMoneyBill,
    FaMoneyCheck
} from "react-icons/fa";
import { FaArrowLeftLong, FaListCheck, FaTicket } from "react-icons/fa6";
import UserContext from "../../Context/User/userContext";
import "../../sidebar.css";

const Sidebar = () => {
    const { users, logout } = useContext(UserContext); // make sure user object is provided in context
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const role = users?.role; // e.g., "Admin", "Service Provider", "Moderator", "Client", "Service Category Manager"

    return (
        <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
            <div className="toggle-btn" onClick={toggleSidebar}>
                {isOpen ? <FaArrowLeftLong /> : <FaBars />}
                <span className="role">{role}</span>
            </div>

            <ul className="sidebar-menu">
                {/* Common for all roles */}
                <li>
                    <Link to="/dashboard">
                        <FaHome /> {isOpen && <span>Dashboard</span>}
                    </Link>
                </li>

                {/* Admin access */}
                {role === "Admin" && (
                    <>
                        <li>
                            <Link to="/users">
                                <FaUsers /> {isOpen && <span>Manage Users</span>}
                            </Link>
                        </li>
                        <li>
                            <Link to="/categories">
                                <FaList /> {isOpen && <span>Manage Categories</span>}
                            </Link>
                        </li>
                        {/* <li>
                            <Link to="/manage-services">
                                <FaListCheck /> {isOpen && <span>Manage Services</span>}
                            </Link>
                        </li> */}
                        <li>
                            <Link to="/admin-tickets">
                                <FaTicket /> {isOpen && <span>Manage Tickets</span>}
                            </Link>
                        </li>
                    </>
                )}


                {/* Service Category Manager access */}
                {role === "Service Category Manager" && (
                    <>
                        <li>
                            <Link to="/categories">
                                <FaList /> {isOpen && <span>Manage Categories</span>}
                            </Link>
                        </li>
                    </>
                )}

                {/* Service Provider access */}
                {role === "Service Provider" && (
                    <>
                        {/* <li>
                            <Link to="/manage-services">
                                <FaListCheck /> {isOpen && <span>Manage Services</span>}
                            </Link>
                        </li> */}
                        <li>
                            <Link to="/manage-bookings">
                                <FaCalendarCheck /> {isOpen && <span>Manage Bookings</span>}
                            </Link>
                        </li>
                        <li>
                            <Link to="/payment-history">
                                <FaMoneyBill /> {isOpen && <span>Payment History</span>}
                            </Link>
                        </li>
                        <li>
                            <Link to="/track-earnings">
                                <FaDollarSign /> {isOpen && <span>Track Earnings</span>}
                            </Link>
                        </li> 
                        <li>
                            <Link to="/my-chat">
                                <FaComments /> {isOpen && <span>Live Chat</span>}
                            </Link>
                        </li>
                    </>
                )}

                {/* Moderator access */}
                {role === "Moderator" && (
                    <>
                        <li>
                            <Link to="/manage-tickets">
                                <FaListCheck /> {isOpen && <span>Manage Tickets</span>}
                            </Link>
                        </li>
                        <li>
                            <Link to="/manage-service-provider">
                                <FaUsers /> {isOpen && <span>Service Provider</span>}
                            </Link>
                        </li>
                        <li>
                            <Link to="/manage-reviews">
                                <FaComments /> {isOpen && <span>Manage Reviews</span>}
                            </Link>
                        </li>
                    </>
                )}


                {/* Client access */}
                {role === "Client" && (
                    <>
                        <li>
                            <Link to="/explore-services">
                                <FaCalendarCheck /> {isOpen && <span>Book a Service</span>}
                            </Link>
                        </li>
                        <li>
                            <Link to="/my-bookings">
                                <FaCheckDouble /> {isOpen && <span>Bookings</span>}
                            </Link>
                        </li>
                        <li>
                            <Link to="/my-payments">
                                <FaMoneyCheck /> {isOpen && <span>Payment History</span>}
                            </Link>
                        </li>
                        <li>
                            <Link to="/my-tickets">
                                <FaShieldAlt /> {isOpen && <span>Tickets</span>}
                            </Link>
                        </li>
                        <li>
                            <Link to="/my-reviews">
                                <FaComments /> {isOpen && <span>Reviews</span>}
                            </Link>
                        </li> 
                    </>
                )}


                {/* Profile & Settings - optional common */}
                <li>
                    <Link to="/profile">
                        <FaUser /> {isOpen && <span>Profile</span>}
                    </Link>
                </li>
                <li>
                    <Link to="/settings">
                        <FaCog /> {isOpen && <span>Settings</span>}
                    </Link>
                </li>

                {/* Logout */}
                <li onClick={logout}>
                    <Link to="#">
                        <FaSignOutAlt /> {isOpen && <span>Logout</span>}
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
