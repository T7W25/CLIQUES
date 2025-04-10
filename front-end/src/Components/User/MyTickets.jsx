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

const MyTickets = () => {
    const { users } = useContext(UserContext);
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deleting, setDeleting] = useState(false);

    const fetchTickets = async () => {
        try {
            if (!users?._id) return;

            const res = await axios.get(`${baseurl}/web-api/ticket/client/${users._id}`);
            if (res.data && res.data.data) {
                setTickets(res.data.data);
            } else {
                setError("No ticket data found.");
            }
        } catch (err) {
            console.error("Error fetching tickets:", err);
            setError("Something went wrong while fetching tickets.");
        } finally {
            setLoading(false);
        }
    };

    const deleteTicket = async (ticketId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this ticket?");
        if (!confirmDelete) return;

        try {
            setDeleting(true);
            const res = await axios.delete(`${baseurl}/web-api/ticket/delete/${ticketId}`);
            if (res.data.success) {
                setTickets(prev => prev.filter(t => t._id !== ticketId));
            } else {
                alert("Failed to delete ticket.");
            }
        } catch (err) {
            console.error("Error deleting ticket:", err);
            alert("Something went wrong.");
        } finally {
            setDeleting(false);
        }
    };

    useEffect(() => {
        fetchTickets();
        // eslint-disable-next-line
    }, [users]);

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="content">
                <Container fluid>
                    <Row className="mb-4">
                        <Col><h4>🎫 My Tickets</h4></Col>
                    </Row>

                    {loading ? (
                        <div className="text-center">
                            <Spinner animation="border" />
                            <p>Loading tickets...</p>
                        </div>
                    ) : error ? (
                        <Alert variant="danger">{error}</Alert>
                    ) : tickets.length === 0 ? (
                        <p>No tickets found.</p>
                    ) : (
                        tickets.map((ticket) => (
                            <Card key={ticket._id} className="mb-3 shadow-sm appointment-card">
                                <Card.Body>
                                    <Row>
                                        <Col md={6}>
                                            <h5>📋 Ticket Info</h5>
                                            <p><strong>Status:</strong> {ticket.status}</p>
                                            <p><strong>Message:</strong> {ticket.message}</p>
                                            <p><strong>Created:</strong> {new Date(ticket.createdAt).toLocaleString()}</p>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => deleteTicket(ticket._id)}
                                                disabled={deleting}
                                            >
                                                {deleting ? "Deleting..." : "🗑️ Delete Ticket"}
                                            </Button>
                                        </Col>
                                        <Col md={3}>
                                            <h5>📅 Appointment Details</h5>
                                            <p><strong>Date:</strong> {new Date(ticket.appointment.appointment_datetime).toLocaleDateString()}</p>
                                            <p><strong>Time:</strong> {new Date(ticket.appointment.appointment_datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                            <p><strong>Fees:</strong> ${ticket.appointment.fees}</p>
                                            <p><strong>Status:</strong> {ticket.appointment.status}</p>
                                        </Col>
                                        <Col md={3}>
                                            <h5>👨‍🔧 Service Provider</h5>
                                            <p><strong>Name:</strong> {ticket.appointment.serviceProvider?.name}</p>
                                            <p><strong>Email:</strong> {ticket.appointment.serviceProvider?.email}</p>
                                            <p><strong>Phone:</strong> {ticket.appointment.serviceProvider?.phone}</p>
                                            <p><strong>City:</strong> {ticket.appointment.serviceProvider?.city}</p>
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

export default MyTickets;
