import React, { useEffect, useState, useContext, useRef } from "react"; 
import Sidebar from "./Sidebar";
import { Col, Row, Container, Card, Spinner, Button, Modal, Form } from "react-bootstrap";
import UserContext from "../../Context/User/userContext";
import axios from "axios";
import baseurl from "../../config"; // adjust path as needed

const MyBookings = () => {
    const { users } = useContext(UserContext);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [ticketMessage, setTicketMessage] = useState("");
    const [reviewMessage, setReviewMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [rating, setRating] = useState(5);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updateForm, setUpdateForm] = useState({ date: "", time: "", status: "Cancelled" });
    const [originalStatus, setOriginalStatus] = useState("");
    const [showChatModal, setShowChatModal] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [chatInput, setChatInput] = useState(""); 

    const fetchAppointments = async () => {
        try {
            if (!users?._id) return;
            const res = await axios.get(`${baseurl}/web-api/appointment/show/client/${users._id}`);
            if (res.data && res.data.data) {
                setAppointments(res.data.data);
            }
        } catch (error) {
            console.error("Error fetching appointments", error);
        } finally {
            setLoading(false);
        }
    };

    const handleReviewSubmit = async () => {
        try {
            await axios.post(`${baseurl}/web-api/review/add`, {
                client: users._id,
                appointment: selectedAppointment._id,
                serviceProvider: selectedAppointment.serviceProvider._id,
                rating,
                review: reviewMessage
            });
            alert("✅ Review submitted successfully!");
            setShowReviewModal(false);
            setReviewMessage("");
            setRating(5);
        } catch (error) {
            console.error("Error submitting review", error);
            alert("❌ Failed to submit review. Please try again.");
        }
    };


    useEffect(() => {
        fetchAppointments();
        // eslint-disable-next-line
    }, [users]);

    const handleOpenModal = (appointment) => {
        setSelectedAppointment(appointment);
        setTicketMessage("");
        setShowModal(true);
    };

    const handleSubmitTicket = async () => {
        if (!ticketMessage.trim()) return;

        setSubmitting(true);
        try {
            const payload = {
                client: users._id,
                appointment: selectedAppointment._id,
                message: ticketMessage
            };

            const response = await axios.post(`${baseurl}/web-api/ticket/add`, payload);
            if (response.data.success) {
                alert("🎫 Ticket submitted successfully!");
                setShowModal(false);
            }
        } catch (err) {
            console.error("Ticket submission error:", err);
            alert("Something went wrong while submitting the ticket.");
        } finally {
            setSubmitting(false);
        }
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case "Pending":
                return "bg-warning text-dark"; // 🟡 Yellow
            case "Approved":
                return "bg-success"; // ✅ Green
            case "In Process":
                return "bg-primary"; // 🔧 Blue
            case "Rejected":
                return "bg-danger"; // ❌ Red
            case "Cancelled":
                return "bg-secondary"; // 🚫 Grey
            case "Completed":
                return "bg-dark"; // 🏁 Dark
            default:
                return "bg-info"; // fallback
        }
    };

    // Ref to scroll to bottom smoothly
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Define fetchMessages outside useEffect
    const fetchMessages = async () => {
        if (!selectedAppointment?._id) return;

        try {
            const res = await axios.get(`${baseurl}/chat/messages/${selectedAppointment._id}`);
            setChatMessages(res.data.messages || []);
        } catch (err) {
            console.error("Error fetching chat messages:", err);
        }
    };

    // Fetch messages on open or change
    useEffect(() => {
        if (showChatModal) {
            fetchMessages();
        }
        // eslint-disable-next-line
    }, [showChatModal, selectedAppointment]);

    // Auto-scroll whenever chatMessages change
    useEffect(() => {
        scrollToBottom();
    }, [chatMessages]);

    // Send Message
    const sendMessage = async () => {
        const messageText = chatInput.trim();
        if (!messageText) return;

        try {
            // Optimistically add message before fetching latest
            const tempMessage = {
                content: messageText,
                sender: { _id: users._id },
                timestamp: new Date().toISOString(),
            };
            setChatMessages(prev => [...prev, tempMessage]);

            setChatInput(""); // Clear input immediately

            await axios.post(`${baseurl}/chat/send`, {
                appointmentId: selectedAppointment._id,
                sender: users._id,
                receiver: selectedAppointment.serviceProvider._id,
                message: messageText,
            });

            // Fetch again to ensure we have latest from server
            await fetchMessages();

        } catch (err) {
            console.error("Error sending message:", err);
        }
    };



    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="content">
                <Container fluid>
                    <Row className="mb-4">
                        <Col><h4>📅 My Bookings</h4></Col>
                    </Row>

                    {loading ? (
                        <div className="text-center">
                            <Spinner animation="border" />
                            <p>Loading your appointments...</p>
                        </div>
                    ) : appointments.length === 0 ? (
                        <p>No appointments found.</p>
                    ) : (
                        appointments.map((appt) => (
                            <Card key={appt._id} className="mb-3 shadow-sm appointment-card">
                                <Card.Body>
                                    <Row>
                                        <Col md={6}>
                                            <h5>👨‍🔧 Service Provider</h5>
                                            <p className="text-capitalize"><strong>Name:</strong> {appt.serviceProvider?.name}</p>
                                            <p><strong>Phone:</strong> {appt.serviceProvider?.phone}</p>
                                            <p><strong>Email:</strong> {appt.serviceProvider?.email}</p>
                                            <p><strong>City:</strong> {appt.serviceProvider?.city}</p>
                                        </Col>
                                        <Col md={6}>
                                            <h5>🗓️ Appointment Details</h5>
                                            <p><strong>Date:</strong> {new Date(appt.appointment_datetime).toLocaleDateString()}</p>
                                            <p><strong>Time:</strong> {new Date(appt.appointment_datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                            <p><strong>Fees:</strong> ${appt.fees}</p>
                                            <p>
                                                <strong>Status:</strong>{" "}
                                                <span className={`badge ${getStatusBadgeClass(appt.status)}`}>
                                                    {appt.status}
                                                </span>
                                            </p>
                                        </Col>
                                    </Row>
                                    <hr />
                                    <h6>💳 Payment Info</h6>
                                    <p className="text-capitalize"><strong>Card Holder:</strong> {appt.card_name}</p>
                                    <p><strong>Card Number:</strong> **** **** **** {appt.card_number.slice(-4)}</p>
                                    <p><strong>Card Expiry:</strong> {appt.card_expiry}</p>

                                    <div className="mt-3">
                                        <Button variant="warning" onClick={() => handleOpenModal(appt)}>Create Ticket</Button> &nbsp;
                                        <Button variant="success" onClick={() => { setSelectedAppointment(appt); setShowReviewModal(true); }}>⭐ Add Review</Button> &nbsp;
                                        <Button variant="danger" onClick={() => {
                                            setSelectedAppointment(appt);
                                            const dt = new Date(appt.appointment_datetime);
                                            setOriginalStatus(appt.status || "");
                                            setUpdateForm({
                                                date: dt.toISOString().slice(0, 10),
                                                time: dt.toTimeString().slice(0, 5),
                                                status: appt.status || "",
                                            });
                                            setShowUpdateModal(true);
                                        }}>
                                            Update
                                        </Button> &nbsp;
                                        <Button variant="info" onClick={() => {
                                            setSelectedAppointment(appt);
                                            setShowChatModal(true);
                                        }}>
                                            💬 Live Chat
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))
                    )}

                    {/* Ticket Modal */}
                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Create Ticket</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Control type="hidden" value={users._id} readOnly />
                                <Form.Control type="hidden" value={selectedAppointment?._id} readOnly />
                                <Form.Group>
                                    <Form.Label>Message</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        value={ticketMessage}
                                        onChange={(e) => setTicketMessage(e.target.value)}
                                        placeholder="Describe your issue or request..."
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                            <Button
                                variant="primary"
                                onClick={handleSubmitTicket}
                                disabled={submitting}
                            >
                                {submitting ? "Submitting..." : "Submit Ticket"}
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    {/* Review Modal */}
                    <Modal show={showReviewModal} onHide={() => setShowReviewModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Submit Review</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group className="mb-2">
                                <Form.Label>Rating</Form.Label>
                                <Form.Select
                                    value={rating}
                                    onChange={(e) => setRating(Number(e.target.value))}
                                >
                                    <option value="">Select Rating</option>
                                    <option value="1">1 - Very Bad</option>
                                    <option value="2">2 - Bad</option>
                                    <option value="3">3 - Average</option>
                                    <option value="4">4 - Good</option>
                                    <option value="5">5 - Excellent</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Review Message</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={reviewMessage}
                                    onChange={(e) => setReviewMessage(e.target.value)}
                                />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowReviewModal(false)}>Cancel</Button>
                            <Button variant="success" onClick={handleReviewSubmit}>Submit</Button>
                        </Modal.Footer>
                    </Modal>

                    {/* Update Date time & Status Modal */}
                    <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update Appointment</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={updateForm.date}
                                        onChange={(e) => setUpdateForm({ ...updateForm, date: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Time</Form.Label>
                                    <Form.Control
                                        type="time"
                                        value={updateForm.time}
                                        onChange={(e) => setUpdateForm({ ...updateForm, time: e.target.value })}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Check
                                        type="switch"
                                        id="cancel-switch"
                                        label="Cancel this booking?"
                                        checked={updateForm.status === "Cancelled"}
                                        disabled={originalStatus === "Cancelled" || originalStatus === "Completed"}
                                        onChange={(e) =>
                                            setUpdateForm({
                                                ...updateForm,
                                                status: e.target.checked ? "Cancelled" : originalStatus,
                                            })
                                        }
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>Close</Button>
                            <Button variant="primary" onClick={async () => {
                                try {
                                    const appointment_datetime = `${updateForm.date} ${updateForm.time}`;
                                    await axios.put(`${baseurl}/web-api/appointment/update/${selectedAppointment._id}`, {
                                        appointment_datetime,
                                        status: updateForm.status,
                                    });
                                    alert("Appointment updated successfully!");
                                    setShowUpdateModal(false);
                                    fetchAppointments();
                                } catch (err) {
                                    console.error("Update failed", err);
                                    alert("Failed to update appointment.");
                                }
                            }}>
                                Update Appointment
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    {/* Live Chat Modal */}
                    <Modal show={showChatModal} onHide={() => setShowChatModal(false)} size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title>Chat with {selectedAppointment?.serviceProvider?.name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
                            <div className="chat-box" style={{ padding: '10px' }}>
                                {chatMessages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`d-flex mb-2 ${msg.sender?._id === users._id ? "justify-content-end" : "justify-content-start"}`}
                                    >
                                        <div
                                            className={`p-2 rounded ${msg.sender?._id === users._id ? "bg-primary text-white" : "bg-light text-dark"}`}
                                            style={{ maxWidth: "70%" }}
                                        >
                                            {msg.content || msg.message}
                                            <div style={{ fontSize: "0.75rem", opacity: 0.7, marginTop: "5px" }}>
                                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <input
                                className="form-control"
                                placeholder="Type your message..."
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            />
                            <Button variant="primary" onClick={sendMessage}>Send</Button>
                        </Modal.Footer>
                    </Modal>

                </Container>
            </div>
        </div>
    );
};

export default MyBookings;
