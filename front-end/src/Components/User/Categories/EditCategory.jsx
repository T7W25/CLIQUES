import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { Col, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import baseurl from "../../../config"; // adjust path as needed

const EditCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });

    const [errorMessage, setErrorMessage] = useState("");

    // Fetch category details by ID
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await fetch(`${baseurl}/api/category/getedititem/${id}`, {
                    headers: {
                        "auth-token": token
                    }
                });

                const data = await res.json();
                if (res.ok) {
                    setFormData({
                        name: data.name,
                        description: data.description
                    });
                } else {
                    setErrorMessage(data.error || "Category not found.");
                }
            } catch (err) {
                setErrorMessage("Something went wrong fetching category.");
            }
        };
        fetchCategory();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`${baseurl}/api/category/updatecategory/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.success) {
                alert("Category updated successfully!");
                navigate("/categories");
            } else {
                setErrorMessage(result.error || "Update failed.");
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
                    <Col><h4 className="mb-4">Edit Category</h4></Col>
                    <Col className="text-right">
                        <Link to="/categories" className="btn btn-dark">Back to Categories</Link>
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
                            <label>Name:</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" required
                            />

                            <label>Description:</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} className="form-control"
                                required
                            ></textarea>

                            <button type="submit" className="btn btn-primary mt-3">
                                Update Category
                            </button> &nbsp; 
                            <Link to="/categories" className="btn btn-secondary mt-3 ml-5">Cancel</Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditCategory;
