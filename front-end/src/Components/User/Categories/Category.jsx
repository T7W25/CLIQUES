import React, { useContext, useEffect } from "react";
import CategoryContext from "../../../Context/Category/categoryContext";
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

const Category = () => {
    const { allCategorys, getAllCategorys } = useContext(CategoryContext);

    useEffect(() => {
        getAllCategorys();
        // eslint-disable-next-line
    }, [getAllCategorys]);

    useEffect(() => {
        if (allCategorys.length > 0) {
            setTimeout(() => {
                $("#categorysTable").DataTable({
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
    }, [allCategorys]);

    const deleteCategory = async (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`${baseurl}/api/category/deletecategory/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        "auth-token": token,
                    }
                });

                const result = await response.json();
                if (result.success) {
                    alert("Category deleted successfully!");
                    window.location.reload();  // This will refresh the page
                    // getAllCategorys(); // Refresh categorys list
                } else {
                    alert("Failed to delete category.");
                }
            } catch (error) {
                console.error("Error deleting category:", error);
            }
        }
    };

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="content">
                <Row>
                    <Col><h4 className="mb-4">Manage Categories</h4></Col>
                    <Col className="text-right"><Link to="/category/add" className="btn btn-dark">Add Category</Link></Col>
                </Row>

                <hr />
                <table id="categorysTable" className='table table-bordered table-striped'>
                    <thead>
                        <tr> 
                            <th>Title</th> 
                            <th>Description</th> 
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(allCategorys) && allCategorys.length > 0 ? (
                            allCategorys.map((category) => (
                                <tr key={category._id}> 
                                    <td>{category.name}</td> 
                                    <td>{category.description}</td> 
                                    <td>
                                        <Link to={`/category/edit/${category._id}`} className="btn btn-primary btn-sm mr-2">Edit</Link>
                                        &nbsp; 
                                        <Button className="btn btn-danger btn-sm" onClick={() => deleteCategory(category._id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="text-center">
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

export default Category;
