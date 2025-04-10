import React from 'react';
import { useForm } from 'react-hook-form';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log("Form Data Submitted:", data);
        alert('Thank you for contacting us!');
        reset();
    }

    return (
        <div className="main-section py-5 bg-light min-vh-100">
            <section className="container bg-white p-5 shadow rounded">
                <div className="row g-4">
                    {/* Left Side - Contact Info */}
                    <div className="col-md-4">
                        <h4 className="text-primary mb-4">Contact Information</h4>
                        <div className="d-flex align-items-start mb-3">
                            <FaMapMarkerAlt size={20} className="text-primary me-3 mt-1" />
                            <div>
                                <h6 className="mb-1">Our Address</h6>
                                <p className="mb-0 text-muted">123 Business Street, Tech City, TX 75001</p>
                            </div>
                        </div>
                        <div className="d-flex align-items-start mb-3">
                            <FaPhoneAlt size={18} className="text-primary me-3 mt-1" />
                            <div>
                                <h6 className="mb-1">Phone</h6>
                                <p className="mb-0 text-muted">+1 (123) 456-7890</p>
                            </div>
                        </div>
                        <div className="d-flex align-items-start mb-3">
                            <FaEnvelope size={20} className="text-primary me-3 mt-1" />
                            <div>
                                <h6 className="mb-1">Email</h6>
                                <p className="mb-0 text-muted">support@example.com</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Contact Form */}
                    <div className="col-md-8">
                        <div className="text-left mb-4">
                            <h3 className="text-primary fw-bold">Send Us a Message</h3>
                            <p className="text-muted">We usually respond within 24 hours.</p>
                        </div>
                        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} method="post">
                            <div className="row g-4">
                                <div className="col-md-6">
                                    <label className="form-label">Full Name</label>
                                    <input
                                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                        type="text"
                                        placeholder="Enter your full name"
                                        {...register("name", {
                                            required: true,
                                            pattern: /^[A-Za-z\s]+$/
                                        })}
                                    />
                                    {errors.name && <div className="invalid-feedback">Please enter a valid name.</div>}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Email Address</label>
                                    <input
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        type="email"
                                        placeholder="you@example.com"
                                        {...register("email", {
                                            required: true,
                                            pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
                                        })}
                                    />
                                    {errors.email && <div className="invalid-feedback">Please enter a valid email.</div>}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Phone Number</label>
                                    <input
                                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                        type="tel"
                                        placeholder="123-456-7890"
                                        {...register("phone", {
                                            required: true,
                                            pattern: /^[0-9]{10}$/
                                        })}
                                    />
                                    {errors.phone && <div className="invalid-feedback">Enter a valid 10-digit phone number.</div>}
                                </div>

                                <div className="col-md-12">
                                    <label className="form-label">Your Message</label>
                                    <textarea
                                        className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                                        rows="5"
                                        placeholder="Type your message here..."
                                        {...register("message", {
                                            required: true,
                                            minLength: 10
                                        })}
                                    ></textarea>
                                    {errors.message && <div className="invalid-feedback">Please write at least 10 characters.</div>}
                                </div>

                                <div className="col-md-12 text-end">
                                    <button type="submit" className="btn btn-primary px-4 py-2">Send Message</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
