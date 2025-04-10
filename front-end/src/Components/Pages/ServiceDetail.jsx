import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Spinner, Modal, Alert, Button, Form } from 'react-bootstrap';
import { FaMapMarkerAlt, FaMoneyBillWave, FaClock, FaAward, FaPhoneAlt, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import UserContext from "../../Context/User/userContext";
import axios from 'axios';
import baseurl from "../../config"; // adjust path as needed

const ServiceDetail = () => {
    const { users } = useContext(UserContext);
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [provider, setProvider] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [appointments, setAppointments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [reviews, setReviews] = useState([]);

    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', address: '',
        appointment_time: '09:00',
        fees: '', card_name: '', card_number: '', card_expiry: '', card_cvv: ''
    });

    // 👇 Check login and fetch client data
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        } else if (users) {
            // Prefill form fields from logged-in user
            setFormData(prev => ({
                ...prev,
                name: users.name || '',
                email: users.email || '',
                phone: users.phone || '',
            }));
        }
    }, [users, navigate]); // ✅ include 'navigate' here


    // Fetch Service Provider and Appointment data
    useEffect(() => {
        const fetchProvider = async () => {
            try {
                const res = await fetch(`${baseurl}/web-api/service-provider/getinfo/${id}`);
                const data = await res.json();
                if (data.success) {
                    setProvider(data);
                } else {
                    setError(data.error || 'Failed to load details.');
                }
                setLoading(false);
            } catch (err) {
                setError('Server Error');
                setLoading(false);
            }
        };
        axios.get(`${baseurl}/web-api/appointment/show/provider/${id}`)
            .then(res => {
                const events = res.data.data.map(app => ({
                    title: app.client?.name || 'Appointment',
                    start: app.appointment_datetime
                }));
                setAppointments(events);
            });
        fetchProvider();
    }, [id]);

    // Fetching reviews
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await axios.get(`${baseurl}/web-api/review/show-review/${id}`);
                if (res.data.success) {
                    setReviews(res.data.data);
                }
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };
        fetchReviews();
    }, [id]);


    if (loading) {
        return (
            <Container className="text-center py-5">
                <Spinner animation="border" />
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="py-5">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    const handleDateClick = (arg) => {
        setSelectedDate(arg.dateStr);
        setShowModal(true);
    };

    const handleInputChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmitAppointment = async () => {
        try {
            const response = await axios.post(`${baseurl}/web-api/appointment/add`, {
                client: users._id,
                serviceProvider: id,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                appointment_date: selectedDate,
                appointment_time: formData.appointment_time,
                fees: provider?.data?.pricing || 0,
                card_name: formData.card_name,
                card_number: formData.card_number,
                card_expiry: formData.card_expiry,
                card_cvv: formData.card_cvv
            });

            if (response.data.success) {
                alert('Appointment created successfully!');
                setShowModal(false);
            } else {
                alert(response.data.message || 'Failed to book appointment');
            }
        } catch (err) {
            console.error(err);
            alert('Server Error: Failed to book appointment');
        }
    };

    if (!provider) return <p>Loading...</p>;

    const {
        name, email, phone, city, status, pricing, availability,
        experience, profilePicture, skills, identityProof
    } = provider.data;

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={10}>
                    <Card className="shadow-lg p-4 rounded-4">
                        <Row>
                            <Col md={4} className="text-center mb-4">
                                <img
                                    src={profilePicture || '/assets/img/default-user.png'}
                                    alt={name}
                                    className="img-fluid rounded-circle border border-3 shadow"
                                    style={{ width: '180px', height: '180px', objectFit: 'cover' }}
                                />
                                <h4 className="mt-3 text-capitalize">{name}</h4>
                                <Badge bg={status === 'Active' ? 'success' : 'secondary'}>
                                    {status}
                                </Badge>
                                <div className='mt-2'>
                                    <Link to={`https://wa.me/${phone}`} className='btn btn-success'>
                                        <FaWhatsapp size={20} /> Chat on WhatsApp
                                    </Link>
                                </div>
                            </Col>
                            <Col md={8}>
                                <Row>
                                    <Col md={6}>
                                        <p><FaMapMarkerAlt className="me-2 text-primary" /> <strong>City:</strong> {city}</p>
                                        <p><FaMoneyBillWave className="me-2 text-success" /> <strong>Pricing:</strong> ${pricing}</p>
                                        <p><FaClock className="me-2 text-info" /> <strong>Availability:</strong> {availability}</p>
                                    </Col>
                                    <Col md={6}>
                                        <p><FaAward className="me-2 text-warning" /> <strong>Experience:</strong> {experience} years</p>
                                        <p><FaEnvelope className="me-2 text-dark" /> <strong>Email:</strong> {email}</p>
                                        <p><FaPhoneAlt className="me-2 text-dark" /> <strong>Phone:</strong> {phone}</p>
                                    </Col>
                                </Row>
                                <hr />
                                <h5 className="mb-2">Skills & Expertise</h5>
                                <p>{skills || "No skills listed"}</p>
                                {identityProof && (
                                    <>
                                        <hr />
                                        <h5>Identity Proof</h5>
                                        <a href={identityProof} target="_blank" rel="noreferrer" className="btn btn-outline-primary btn-sm">
                                            View Document
                                        </a>
                                    </>
                                )}
                            </Col>
                        </Row>
                    </Card>

                    {/* Calendar */}
                    <Card className="p-4 shadow-lg rounded-4 mt-5">
                        <h5 className="mb-3">📅 Availability Calendar</h5>
                        <FullCalendar
                            plugins={[dayGridPlugin, interactionPlugin, bootstrap5Plugin]}
                            initialView="dayGridMonth"
                            themeSystem="bootstrap5"
                            events={appointments}
                            dateClick={handleDateClick}
                        />
                    </Card>

                    {/* Booking Modal */}
                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Book Appointment for {selectedDate}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Your Name</Form.Label>
                                    <Form.Control name="name" value={formData.name} onChange={handleInputChange} disabled />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control name="email" value={formData.email} onChange={handleInputChange} disabled />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control name="phone" value={formData.phone} onChange={handleInputChange} disabled />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control name="address" value={formData.address} onChange={handleInputChange} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Time</Form.Label>
                                    <Form.Control type="time" name="appointment_time" value={formData.appointment_time} onChange={handleInputChange} />
                                </Form.Group>
                                <div className='bg-warning p-2 rounded mb-3'>
                                    <h5>Payment Details:</h5>
                                    <p className='mb-0'>You need to pay ${pricing} to book your appointments. </p>
                                </div>
                                <Form.Group className="mb-3">
                                    <Form.Label>Card Holder Name</Form.Label>
                                    <Form.Control name="card_name" value={formData.card_name} onChange={handleInputChange} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Card Number</Form.Label>
                                    <Form.Control name="card_number" value={formData.card_number} onChange={handleInputChange} />
                                </Form.Group>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Card Expiry</Form.Label>
                                            <Form.Control name="card_expiry" placeholder="MM/YY" value={formData.card_expiry} onChange={handleInputChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>CVV</Form.Label>
                                            <Form.Control name="card_cvv" value={formData.card_cvv} onChange={handleInputChange} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Button variant="primary" onClick={handleSubmitAppointment}>
                                    Submit Appointment
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>

                    {/* Reviews */}
                    <Card className="p-4 shadow-lg rounded-4 mt-5">
                        <h5 className="mb-4">⭐ Client Reviews</h5>

                        {reviews.length === 0 ? (
                            <Alert variant="info">No reviews yet for this provider.</Alert>
                        ) : (
                            reviews.map((review, idx) => (
                                <Card key={idx} className="mb-3 border-start border-4 border-primary">
                                    <Card.Body>
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <h6 className="mb-1 text-capitalize">{review.client?.name}</h6>
                                                <small className="text-muted">{new Date(review.createdAt).toLocaleDateString()}</small>
                                            </div>
                                            <div>
                                                {Array(review.rating).fill().map((_, i) => (
                                                    <span key={i} style={{ color: '#ffc107' }}>★</span>
                                                ))}
                                                {Array(5 - review.rating).fill().map((_, i) => (
                                                    <span key={i} style={{ color: '#e4e5e9' }}>★</span>
                                                ))}
                                            </div>
                                        </div>
                                        <p className="mt-2">{review.review}</p>
                                    </Card.Body>
                                </Card>
                            ))
                        )}
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ServiceDetail;

