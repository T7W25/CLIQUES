import React, { useEffect, useState, useContext } from "react";
import Sidebar from "./Sidebar";
import {
    Col,
    Row,
    Container,
    Card,
    Spinner,
    Alert,
    Button,
} from "react-bootstrap";
import UserContext from "../../Context/User/userContext";
import axios from "axios";
import baseurl from "../../config"; // adjust path as needed

const ManageReviews = () => {
    const { users } = useContext(UserContext);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deleting, setDeleting] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");
    const [statusVariant, setStatusVariant] = useState("success"); // or "danger"

    const fetchReviews = async () => {
        try {
            if (!users?._id) return;

            const res = await axios.get(`${baseurl}/web-api/review/show`);
            if (res.data && res.data.data) {
                setReviews(res.data.data);
            } else {
                setError("No review data found.");
            }
        } catch (err) {
            console.error("Error fetching reviews:", err);
            setError("Something went wrong while fetching reviews.");
        } finally {
            setLoading(false);
        }
    };

    const deleteReview = async (reviewId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this review?");
        if (!confirmDelete) return;

        try {
            setDeleting(true);
            const res = await axios.delete(`${baseurl}/web-api/review/delete/${reviewId}`);
            if (res.data.success) {
                setReviews(prev => prev.filter(t => t._id !== reviewId));
            } else {
                alert("Failed to delete review.");
            }
        } catch (err) {
            console.error("Error deleting review:", err);
            alert("Something went wrong.");
        } finally {
            setDeleting(false);
        }
    };

    const updateReviewStatus = async (reviewId, newStatus) => {
        if (!['Active', 'Inactive'].includes(newStatus)) {
            setStatusMessage("Invalid status selected.");
            setStatusVariant("danger");
            return;
        }

        try {
            const res = await axios.put(`${baseurl}/web-api/review/update-status/${reviewId}`, { status: newStatus });

            if (res.data.success) {
                setReviews(prev =>
                    prev.map(r =>
                        r._id === reviewId ? { ...r, status: newStatus } : r
                    )
                );
                setStatusMessage(`Review marked as ${newStatus}.`);
                setStatusVariant("success");
            } else {
                setStatusMessage("Failed to update review status.");
                setStatusVariant("danger");
            }
        } catch (err) {
            console.error("Error updating status:", err);
            setStatusMessage("Something went wrong.");
            setStatusVariant("danger");
        }

        // Clear message after 3 seconds
        setTimeout(() => setStatusMessage(""), 3000);
    };



    useEffect(() => {
        fetchReviews();
        // eslint-disable-next-line
    }, [users]);

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;
        const totalStars = 5;

        return (
            <>
                {[...Array(fullStars)].map((_, i) => (
                    <span key={`full-${i}`} style={{ color: '#ffc107' }}>★</span>
                ))}
                {halfStar && <span style={{ color: '#ffc107' }}>☆</span>}
                {[...Array(totalStars - fullStars - (halfStar ? 1 : 0))].map((_, i) => (
                    <span key={`empty-${i}`} style={{ color: '#ddd' }}>★</span>
                ))}
            </>
        );
    };


    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="content">
                <Container fluid>
                    <Row className="mb-4">
                        <Col><h4>🎫 My Reviews</h4></Col>
                    </Row>
                    {statusMessage && (
                        <Alert variant={statusVariant} onClose={() => setStatusMessage("")} dismissible>
                            {statusMessage}
                        </Alert>
                    )}

                    {loading ? (
                        <div className="text-center">
                            <Spinner animation="border" />
                            <p>Loading reviews...</p>
                        </div>
                    ) : error ? (
                        <Alert variant="danger">{error}</Alert>
                    ) : reviews.length === 0 ? (
                        <p>No reviews found.</p>
                    ) : (
                        reviews.map((review) => (
                            <Card key={review._id} className="mb-3 shadow-sm appointment-card">
                                <Card.Body>
                                    <Row>
                                        <Col md={6}>
                                            <h5>📋 Review Info</h5>
                                            <p><strong>Client Name:</strong> {review.client.name}</p>
                                            <p><strong>Client Email:</strong> {review.client.email}</p>
                                            <p><strong>Message:</strong> {review.review}</p>
                                            <p><strong>Rating:</strong> {renderStars(review.rating)}</p>
                                            <p><strong>Created:</strong> {new Date(review.createdAt).toLocaleString()}</p>
                                            <Row className="mt-3">
                                                <Col md={4}>
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => deleteReview(review._id)}
                                                        disabled={deleting}
                                                    >
                                                        {deleting ? "Deleting..." : "🗑️ Delete Review"}
                                                    </Button>
                                                </Col>
                                                <Col>
                                                    <p>
                                                        <strong>Update Status:</strong>{" "}
                                                        <select
                                                            value={review.status}
                                                            onChange={(e) => updateReviewStatus(review._id, e.target.value)}
                                                            className="form-select form-select-sm d-inline-block w-auto"
                                                        >
                                                            <option value="Active">Active</option>
                                                            <option value="Inactive">Inactive</option>
                                                        </select>
                                                    </p>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col md={3}>
                                            <h5>📅 Appointment Details</h5>
                                            <p><strong>Date:</strong> {new Date(review.appointment.appointment_datetime).toLocaleDateString()}</p>
                                            <p><strong>Time:</strong> {new Date(review.appointment.appointment_datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                            <p><strong>Fees:</strong> ${review.appointment.fees}</p>
                                            <p><strong>Status:</strong> {review.appointment.status}</p>
                                        </Col>
                                        <Col md={3}>
                                            <h5>📅 Service Provider</h5>
                                            <p><strong>Name:</strong> {review.serviceProvider.name}</p> 
                                            <p><strong>Email:</strong> {review.serviceProvider.email}</p> 
                                            <p><strong>Phone:</strong> {review.serviceProvider.phone}</p> 
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>

                        ))
                    )}
                </Container>
            </div>
        </div>
    );
};

export default ManageReviews;
