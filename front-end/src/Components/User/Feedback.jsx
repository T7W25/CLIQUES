import React, { useContext, useState } from "react";
import UserContext from "../../Context/User/userContext";
import Sidebar from "./Sidebar";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
    const { register } = useContext(UserContext);
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "Admin",
        address: ""
    });

    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        await register(formData, setErrorMessage, navigate);
    };

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="content">
                <Row>
                    <Col><h4 className="mb-4">Add Feedback</h4></Col> 
                </Row>
                <div className="row">
                    <div className="col-md-6">
                        {errorMessage && (
                            <div className="alert alert-info p-2 mt-2 font-12" role="alert">
                                {errorMessage}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <label>Name:</label>
                            <input type="text" name="name" onChange={handleChange} className="form-control" required />

                            <label>Email:</label>
                            <input type="email" name="email" onChange={handleChange} className="form-control" required />
 
                            <label>Message:</label>
                            <textarea name="address" onChange={handleChange} className="form-control" required ></textarea>

                            <button type="submit" className="btn-theme mt-3">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feedback;
