import React, { useContext, useEffect } from "react";
import ServiceContext from "../../../Context/Service/serviceContext";
import Sidebar from "../Sidebar";
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
import baseurl from "../../../config"; // adjust path as needed

const ManageServices = () => {
    const { allServices, getAllServices } = useContext(ServiceContext);

    useEffect(() => {
        getAllServices();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (allServices.length > 0) {
            setTimeout(() => {
                $("#servicesTable").DataTable({
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
    }, [allServices]);

    const deleteService = async (id) => {
        if (window.confirm("Are you sure you want to delete this service?")) {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`${baseurl}/api/service/delete/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        "auth-token": token,
                    }
                });

                const result = await response.json();
                if (result.success) {
                    alert("Service deleted successfully!");
                    getAllServices(); // Refresh services list
                } else {
                    alert("Failed to delete service.");
                }
            } catch (error) {
                console.error("Error deleting service:", error);
            }
        }
    };

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="content">
                <Row>
                    <Col><h4 className="mb-4">Manage Services</h4></Col>
                    <Col className="text-right"><Link to="/service/add" className="btn btn-dark">Add Service</Link></Col>
                </Row>
                <hr />
                <table id="servicesTable" className='table table-bordered table-striped'>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Duties</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(allServices) && allServices.length > 0 ? (
                            allServices.map((service) => (
                                <tr key={service._id}>
                                    <td>{service.categoryDetails && service.categoryDetails.length > 0 ? service.categoryDetails[0].name : 'No Category'}</td>
                                    <td>{service.title}</td>
                                    <td>{service.price}</td>
                                    <td>{service.description}</td>
                                    <td>{service.duties}</td>
                                    <td>
                                        <Link to={`/service/edit/${service._id}`} className="btn btn-primary btn-sm mr-2">Edit</Link>
                                        <Button className="btn btn-danger btn-sm" onClick={() => deleteService(service._id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center">
                                    <div className="alert alert-warning">No Data Available</div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageServices;
