import React, { useContext, useEffect } from "react";
import UserContext from "../../Context/User/userContext";
import Sidebar from "./Sidebar";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import $ from "jquery"; // Import jQuery
import "datatables.net-bs4"; // DataTables Bootstrap styling
import "datatables.net-buttons-bs4"; // DataTables buttons styling
import "datatables.net-buttons/js/buttons.html5"; // Export to CSV, Excel, PDF
import "datatables.net-buttons/js/buttons.print"; // Print button
import "datatables.net-buttons/js/buttons.colVis"; // Column visibility control
import "jszip"; // Required for Excel export
import "pdfmake"; // Required for PDF export
import "pdfmake/build/vfs_fonts"; // Required for PDF fonts
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";
import "datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css";
import baseurl from "../../config"; // adjust path as needed

const Users = () => {
    const { allUsers, getAllUsers } = useContext(UserContext);

    useEffect(() => {
        getAllUsers();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (allUsers.length > 0) {
            setTimeout(() => {
                $("#usersTable").DataTable({
                    destroy: true, // Destroy any existing table before reloading
                    responsive: true,
                    dom: 'Bfrtlip', // Adds Buttons (B) to the UI
                    buttons: [
                        {
                            extend: 'copy',
                            text: 'Copy'
                        },
                        {
                            extend: 'csv',
                            text: 'Export CSV',
                        },
                        {
                            extend: 'excel',
                            text: 'Export Excel',
                        },
                        {
                            extend: 'pdf',
                            text: 'Export PDF',
                        },
                        {
                            extend: 'print',
                            text: 'Print',
                        }
                    ]
                });
            }, 500);
        }
    }, [allUsers]);

    // Delete User
    const deleteUser = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                const response = await fetch(`${baseurl}/auth/user/delete/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const result = await response.json();
                if (result.success) {
                    alert("User deleted successfully!");
                    // getAllUsers(); // optional if you reload
                    window.location.reload(); // ✅ reload the page
                } else {
                    alert("Failed to delete user.");
                }
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
    };


    // Update Status of User
    const toggleStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === "Active" ? "Suspended" : "Active";
        if (window.confirm(`Are you sure you want to ${newStatus.toLowerCase()} this user?`)) {
            try {
                const response = await fetch(`${baseurl}/auth/user/status/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ status: newStatus })
                });

                const result = await response.json();
                if (result.success) {
                    alert(`User ${newStatus.toLowerCase()} successfully!`);
                    getAllUsers(); // Refresh users list
                } else {
                    alert("Failed to update status.");
                }
            } catch (error) {
                console.error("Error updating user status:", error);
            }
        }
    };


    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="content">
                <Row>
                    <Col><h4 className="mb-4">Manage Users</h4></Col>
                    <Col className="text-right"><Link to="/users/add" className="btn btn-dark">Add User</Link></Col>
                </Row>

                <hr />
                <table id="usersTable" className='table table-bordered table-striped'>
                    <thead>
                        <tr>
                            <th>Role</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="text-center">
                                    <div className="alert alert-warning">No Data Available</div>
                                </td>
                            </tr>
                        ) : (
                            allUsers.map((user) => (
                                <tr key={user._id}>
                                    <td>
                                        <span className="bg-info badge">
                                            {user.role}
                                        </span>
                                    </td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.address}</td>
                                    <td>
                                        <span className={`badge ${user.status === "Active" ? "bg-success" : "bg-secondary"}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td>
                                        <Button
                                            className={`btn btn-${user.status === "Active" ? "warning" : "success"} btn-sm mr-2`}
                                            onClick={() => toggleStatus(user._id, user.status)}
                                        >
                                            {user.status === "Active" ? "Suspend" : "Active"}
                                        </Button> &nbsp;
                                        <Button className="btn btn-danger btn-sm" onClick={() => deleteUser(user._id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
