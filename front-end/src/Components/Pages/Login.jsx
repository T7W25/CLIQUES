import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import UserContext from '../../Context/User/userContext';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 

const Login = () => {
    const userContext = useContext(UserContext);
    const { login } = userContext;
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit = async (data) => {
        setErrorMessage("");
        await login(data.email, data.password, setErrorMessage);
    };

    return (
        <div className="main-section">
            <section className="container">
                <div className="pt-5 pb-5">
                    <Row>
                        <Col md={{ span: 6, offset: 3 }}>
                            <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="form shadow p-4">
                                <h3>Login</h3>
                                <hr />

                                {errorMessage && (
                                    <div className="alert alert-danger p-2 mt-2 font-12">
                                        {errorMessage}
                                    </div>
                                )}

                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input
                                        className="form-control"
                                        type="email"
                                        placeholder="Enter Email Address"
                                        {...register("email", {
                                            required: "Email is required!",
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: "Enter a valid email address!"
                                            }
                                        })}
                                    />
                                    {errors.email && (
                                        <span className="alert alert-warning p-1 mt-2 font-12">
                                            {errors.email.message}
                                        </span>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        className="form-control"
                                        type="password"
                                        placeholder="Enter Password"
                                        {...register("password", {
                                            required: "Password is required!",
                                            minLength: {
                                                value: 8,
                                                message: "Password must be at least 8 characters!"
                                            }
                                        })}
                                    />
                                    {errors.password && (
                                        <span className="alert alert-warning p-1 mt-2 font-12">
                                            {errors.password.message}
                                        </span>
                                    )}
                                </div>

                                <button type="submit" className="btn-theme w-100 mt-3">Login Now</button>

                                <hr className="mt-4" />
                                <div className="text-center">
                                    <Link className="btn btn-success w-50" to="/register">
                                        Don't have an account? Register Now
                                    </Link>
                                </div>
                            </form>
                        </Col>
                    </Row>
                </div>
            </section>
        </div>
    );
};

export default Login;
