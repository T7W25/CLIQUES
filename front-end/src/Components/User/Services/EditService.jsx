import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { Col, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import baseurl from "../../../config"; // adjust path as needed

const EditService = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        category: "",
        title: "",
        price: "",
        description: "",
        duties: "",
        availability: ""
    });

    const [categories, setCategories] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    // Fetch service details by ID
    useEffect(() => {
        const fetchService = async () => {
            try {
                const res = await fetch(`${baseurl}/api/service/getedititem/${id}`);
                const data = await res.json();
                if (res.ok) {
                    setFormData({
                        category: data.category,
                        title: data.title,
                        price: data.price,
                        description: data.description,
                        duties: data.duties,
                        availability: data.availability
                    });
                } else {
                    setErrorMessage(data.error || "Service not found.");
                }
            } catch (err) {
                setErrorMessage("Something went wrong fetching service.");
            }
        };
        fetchService();
    }, [id]);

    // Fetch category list
    useEffect(() => {
        const fetchCategories = async () => {
            const res = await fetch(`${baseurl}/api/category/show`);
            const data = await res.json();
            setCategories(data.data || []);
        };
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("category", formData.category);
            formDataToSend.append("title", formData.title);
            formDataToSend.append("description", formData.description);
            formDataToSend.append("duties", formData.duties);
            formDataToSend.append("availability", formData.availability);
            formDataToSend.append("price", formData.price);

            const response = await fetch(`${baseurl}/api/service/update/${id}`, {
                method: "PUT",
                body: formDataToSend
            });

            const result = await response.json();

            if (result.success) {
                alert("Service updated successfully!");
                navigate("/manage-services");
            } else {
                setErrorMessage("Update failed.");
            }
        } catch (error) {
            console.error("Update error:", error);
            setErrorMessage("Something went wrong during update.");
        }
    };


    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="content">
                <Row>
                    <Col><h4 className="mb-4">Edit Service</h4></Col>
                    <Col className="text-right">
                        <Link to="/manage-services" className="btn btn-dark">Back to Services</Link>
                    </Col>
                </Row>

                <div className="row">
                    <div className="col-md-6">
                        {errorMessage && (
                            <div className="alert alert-info p-2 mt-2 font-12">
                                {errorMessage}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <label>Category:</label>
                            <select name="category" value={formData.category} onChange={handleChange} className="form-control" required>
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                ))}
                            </select>

                            <label>Title:</label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} className="form-control" required />

                            <label>Price:</label>
                            <input type="text" name="price" value={formData.price} onChange={handleChange} className="form-control" required />

                            <label>Description:</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} className="form-control" required></textarea>

                            <label>Duties:</label>
                            <textarea name="duties" value={formData.duties} onChange={handleChange} className="form-control" required></textarea>

                            <label>Availability:</label>
                            <textarea name="availability" value={formData.availability} onChange={handleChange} className="form-control" required></textarea>

                            <button type="submit" className="btn btn-primary mt-3">Update Service</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditService;
