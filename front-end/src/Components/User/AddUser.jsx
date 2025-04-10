import React, { useContext, useState } from "react";
import UserContext from "../../Context/User/userContext";
import Sidebar from "./Sidebar";
import { Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';

const AddUser = () => {
    const { register: registerUser } = useContext(UserContext);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit = async (data) => {
        setErrorMessage("");
        await registerUser(data, setErrorMessage, navigate, false);
    };

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="content">
                <Row>
                    <Col><h4 className="mb-4">Add User</h4></Col>
                    <Col className="text-right">
                        <Link to="/users" className="btn btn-dark">Show Users</Link>
                    </Col>
                </Row>
                <div className="row">
                    <div className="col-md-6">
                        {errorMessage && (
                            <div className="alert alert-info p-2 mt-2 font-12" role="alert">
                                {errorMessage}
                            </div>
                        )}
                        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                            <div className="form-group">
                                <label>Name:</label>
                                <input type="text" name="name" className="form-control"
                                    id="name"
                                    {...register("name", {
                                        required: "Name is required!",
                                        pattern: {
                                            value: /^[a-zA-Z\s]{2,}$/,
                                            message: "Enter a valid name!"
                                        }
                                    })} />
                                {errors.name && (
                                    <span className='alert p-1 mt-2 font-12 alert-warning' role="alert">
                                        {errors.name.message}
                                    </span>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Email:</label>
                                <input type="email" name="email"
                                    id="email"
                                    {...register("email", {
                                        required: "Email is required!",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: "Enter a valid email address!"
                                        }
                                    })} className="form-control" />
                                {errors.email && (
                                    <span className='alert p-1 mt-2 font-12 alert-warning' role="alert">
                                        {errors.email.message}
                                    </span>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Phone:</label>
                                <input type="text" name="phone"
                                    id="phone"
                                    {...register("phone", {
                                        required: "Phone number is required!",
                                        pattern: {
                                            value: /^[0-9]{10}$/,
                                            message: "Enter a valid 10-digit phone number!"
                                        }
                                    })} className="form-control" />
                                {errors.phone && (
                                    <span className='alert p-1 mt-2 font-12 alert-warning' role="alert">
                                        {errors.phone.message}
                                    </span>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Password:</label>
                                <input type="password" name="password"
                                    id="password"
                                    {...register("password", {
                                        required: "Password is required!",
                                        minLength: {
                                            value: 8,
                                            message: "Password must be at least 8 characters long!"
                                        }
                                    })}
                                    className="form-control" />
                                {errors.password && (
                                    <span className='alert p-1 mt-2 font-12 alert-warning' role="alert">
                                        {errors.password.message}
                                    </span>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Role:</label>
                                <select name="role" id="role"
                                    {...register("role", {
                                        required: "Role is required!"
                                    })} className="form-control">
                                    <option value="Admin">Admin</option>
                                    <option value="Client">Client</option>
                                    <option value="Service Provider">Service Provider</option>
                                    <option value="Moderator">Moderator</option>
                                    <option value="Service Category Manager">Service Category Manager</option>
                                </select>
                                {errors.role && (
                                    <span className='alert p-1 mt-2 font-12 alert-warning' role="alert">
                                        {errors.role.message}
                                    </span>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Address:</label>
                                <input type="text" name="address" id="address"
                                    {...register("address", {
                                        required: "Address is required!"
                                    })}
                                    className="form-control" />
                                {errors.address && (
                                    <span className='alert p-1 mt-2 font-12 alert-warning' role="alert">
                                        {errors.address.message}
                                    </span>
                                )}
                            </div>

                            <div className="form-group">
                                <label className="form-control-label">City (Ontario)</label>
                                <select name="city" className="form-control" id="city"
                                    {...register("city", {
                                        required: "City is required!"
                                    })}>
                                    <option value="">Select City</option>
                                    <option value="Toronto">Toronto</option>
                                    <option value="Ottawa">Ottawa</option>
                                    <option value="Mississauga">Mississauga</option>
                                    <option value="Brampton">Brampton</option>
                                    <option value="Hamilton">Hamilton</option>
                                    <option value="London">London</option>
                                    <option value="Markham">Markham</option>
                                    <option value="Vaughan">Vaughan</option>
                                    <option value="Kitchener">Kitchener</option>
                                    <option value="Windsor">Windsor</option>
                                    <option value="Richmond Hill">Richmond Hill</option>
                                    <option value="Oakville">Oakville</option>
                                    <option value="Burlington">Burlington</option>
                                    <option value="Sudbury">Sudbury</option>
                                    <option value="Barrie">Barrie</option>
                                    <option value="Kingston">Kingston</option>
                                    <option value="Guelph">Guelph</option>
                                    <option value="Thunder Bay">Thunder Bay</option>
                                </select>
                                {errors.city && (
                                    <span className='alert p-1 mt-2 font-12 alert-warning' role="alert">
                                        {errors.city.message}
                                    </span>
                                )}
                            </div>

                            <button type="submit" className="btn-theme mt-3">Add User</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddUser;
