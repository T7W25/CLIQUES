import React, { useContext, useState } from "react";
import CategoryContext from "../../../Context/Category/categoryContext";
import Sidebar from "../Sidebar";
import { Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const AddCategory = () => {
    const { addCategory } = useContext(CategoryContext);
    const navigate = useNavigate();
 
    const [formData, setFormData] = useState({ 
        name: "", 
        description: ""
    });

    const [errorMessage, setErrorMessage] = useState(""); 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }; 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        await addCategory(formData, setErrorMessage, navigate);
    };

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="content">
                <Row>
                    <Col><h4 className="mb-4">Add Category</h4></Col>
                    <Col className="text-right">
                        <Link to="/categories" className="btn btn-dark">Show Categories</Link>
                    </Col>
                </Row>
                <div className="row">
                    <div className="col-md-6">
                        {errorMessage && (
                            <div className="alert alert-info p-2 mt-2 font-12" role="alert">
                                {errorMessage}
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>

                            <label>Name:</label>
                            <input type="text" name="name" onChange={handleChange} className="form-control" required />

                            <label>Description:</label>
                            <textarea name="description" onChange={handleChange} className="form-control" required></textarea>

                            <button type="submit" className="btn-theme mt-3">Add Category</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCategory;
