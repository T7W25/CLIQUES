import React, { useContext, useState } from "react";
import UserContext from "../../Context/User/userContext";
import { Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';

const Register = () => {
    const { register: registerUser } = useContext(UserContext); // Renamed to avoid conflict
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit = async (data) => {
        setErrorMessage("");
        await registerUser(data, setErrorMessage, navigate, true);
    };

    return (
        <div className="main-section">
            <section className="container">
                <div className="pt-5 pb-5">
                    <Row>
                        <Col md={{ span: 6, offset: 3 }}>
                            <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="form shadow p-4" method="post">
                                <h3>Register</h3>
                                <hr />

                                {errorMessage && (
                                    <div className="alert alert-danger p-2 mt-2 font-12" role="alert">
                                        {errorMessage}
                                    </div>
                                )}

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="form-control-label">Full Name</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="Enter Name"
                                                id="name"
                                                {...register("name", {
                                                    required: "Name is required!",
                                                    pattern: {
                                                        value: /^[a-zA-Z\s]{2,}$/,
                                                        message: "Enter a valid name!"
                                                    }
                                                })}
                                            />
                                            {errors.name && (
                                                <span className='alert p-1 mt-2 font-12 alert-warning' role="alert">
                                                    {errors.name.message}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="form-control-label">Email Address</label>
                                            <input
                                                className="form-control"
                                                type="email"
                                                placeholder="Enter Email Address"
                                                id="email"
                                                {...register("email", {
                                                    required: "Email is required!",
                                                    pattern: {
                                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                        message: "Enter a valid email address!"
                                                    }
                                                })}
                                            />
                                            {errors.email && (
                                                <span className='alert p-1 mt-2 font-12 alert-warning' role="alert">
                                                    {errors.email.message}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="form-control-label">Phone Number</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="Enter Phone Number"
                                                id="phone"
                                                {...register("phone", {
                                                    required: "Phone number is required!",
                                                    pattern: {
                                                        value: /^[0-9]{10}$/,
                                                        message: "Enter a valid 10-digit phone number!"
                                                    }
                                                })}
                                            />
                                            {errors.phone && (
                                                <span className='alert p-1 mt-2 font-12 alert-warning' role="alert">
                                                    {errors.phone.message}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="form-control-label">Password</label>
                                            <input
                                                className="form-control"
                                                type="password"
                                                placeholder="Enter Password"
                                                id="password"
                                                {...register("password", {
                                                    required: "Password is required!",
                                                    minLength: {
                                                        value: 8,
                                                        message: "Password must be at least 8 characters long!"
                                                    }
                                                })}
                                            />
                                            {errors.password && (
                                                <span className='alert p-1 mt-2 font-12 alert-warning' role="alert">
                                                    {errors.password.message}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className="form-control-label">Address</label>
                                            <textarea
                                                className="form-control"
                                                placeholder="Enter Address"
                                                id="address"
                                                {...register("address", {
                                                    required: "Address is required!"
                                                })}
                                            ></textarea>
                                            {errors.address && (
                                                <span className='alert p-1 mt-2 font-12 alert-warning' role="alert">
                                                    {errors.address.message}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className="form-control-label">City (Ontario)</label>
                                            <select
                                                className="form-control"
                                                id="city"
                                                {...register("city", {
                                                    required: "City is required!"
                                                })}
                                            >
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
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className="form-control-label d-block">Select Role</label>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    id="roleClient"
                                                    value="Client"
                                                    {...register("role", { required: "Please select a role!" })}
                                                />
                                                <label className="form-check-label" htmlFor="roleClient">Client</label>
                                            </div>

                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    id="roleServiceProvider"
                                                    value="Service Provider"
                                                    {...register("role", { required: "Please select a role!" })}
                                                />
                                                <label className="form-check-label" htmlFor="roleServiceProvider">Service Provider</label>
                                            </div>

                                            {errors.role && (
                                                <span className="alert p-1 mt-2 font-12 alert-warning d-block" role="alert">
                                                    {errors.role.message}
                                                </span>
                                            )}
                                        </div>

                                        <div className="form-group mt-4">
                                            <button type="submit" className="btn-theme">Register Now</button>
                                        </div>
                                    </div>

                                    <hr className='mt-2' />
                                    <div className='text-center mt-2'>
                                        <Link className='btn btn-success w-50' to="/login">Already have an account - Login Now</Link>
                                    </div>
                                </div>
                            </form>
                        </Col>
                    </Row>
                </div>
            </section>
        </div>
    )
};

export default Register;
