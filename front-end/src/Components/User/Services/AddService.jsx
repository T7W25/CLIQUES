import React, { useContext, useState, useEffect } from "react";
import ServiceContext from "../../../Context/Service/serviceContext";
import Sidebar from "../Sidebar";
import { Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import baseurl from "../../../config"; // adjust path as needed

const AddService = () => {
    const { addService } = useContext(ServiceContext);
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        category: "",
        title: "",
        price: "",
        description: "",
        duties: "",
        availability: "",
        images: [] // For storing uploaded files
    });

    const [errorMessage, setErrorMessage] = useState("");

    // Fetch categories
    useEffect(() => {
        fetch(`${baseurl}/api/category/show`)
            .then((res) => res.json())
            .then((data) => setCategories(data.data || []))
            .catch((err) => console.error("Error fetching categories:", err));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, images: e.target.files });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        await addService(formData, setErrorMessage, navigate);
    };

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="content">
                <Row>
                    <Col><h4 className="mb-4">Add Service</h4></Col>
                    <Col className="text-right">
                        <Link to="/manage-services" className="btn btn-dark">Show Services</Link>
                    </Col>
                </Row>
                <div className="row">
                    <div className="col-md-6">
                        {errorMessage && (
                            <div className="alert alert-info p-2 mt-2 font-12" role="alert">
                                {errorMessage}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <label>Category:</label>
                            <select name="category" onChange={handleChange} className="form-control" required>
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                ))}
                            </select>

                            <label>Title:</label>
                            <input type="text" name="title" onChange={handleChange} className="form-control" required />

                            <label>Price:</label>
                            <input type="text" name="price" onChange={handleChange} className="form-control" required />

                            <label>Description:</label>
                            <textarea name="description" onChange={handleChange} className="form-control" required></textarea>

                            <label>Duties:</label>
                            <textarea name="duties" onChange={handleChange} className="form-control" required></textarea>

                            <label>Availability:</label>
                            <textarea name="availability" onChange={handleChange} className="form-control" required></textarea>

                            <label>Upload Images:</label>
                            <input type="file" name="images" onChange={handleFileChange} className="form-control" multiple accept="image/*" />

                            <button type="submit" className="btn-theme mt-3">Add Service</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddService;
