import React, { useContext, useEffect, useState } from "react";
import { Col, Row, Spinner, Alert, Card, Table, Badge } from "react-bootstrap";
import UserContext from "../../Context/User/userContext";
import Sidebar from "./Sidebar";
import axios from "axios";
import baseurl from "../../config"; // adjust path as needed

const MyPayments = () => {
    const { users } = useContext(UserContext);
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
 
    useEffect(() => {
        const fetchMyPayments = async () => {
            try {
                const res = await axios.get(`${baseurl}/web-api/appointment/show/client/${users._id}`);
                setPayments(res.data.data || []);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Failed to load your payment history.");
                setLoading(false);
            }
        };

        if (users && users._id) {
            fetchMyPayments();
        }
    }, [users]);

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="content">
                <Row className="mb-4">
                    <Col><h4 className="fw-bold">💳 My Payment History</h4></Col>
                </Row>

                <Row>
                    <Col md={12}>
                        <Card className="shadow rounded-4 p-4">
                            <h5 className="mb-3">Your Appointments & Payments</h5>

                            {loading && (
                                <div className="text-center py-5">
                                    <Spinner animation="border" variant="primary" />
                                    <p className="mt-3">Loading your payments...</p>
                                </div>
                            )}

                            {error && <Alert variant="danger">{error}</Alert>}

                            {!loading && payments.length === 0 && (
                                <Alert variant="info">No payment history found.</Alert>
                            )}

                            {!loading && payments.length > 0 && (
                                <div className="table-responsive">
                                    <Table striped bordered hover>
                                        <thead className="table-dark">
                                            <tr>
                                                <th>#</th>
                                                <th>Service Provider</th>
                                                <th>Appointment Date</th>
                                                <th>Fees</th>
                                                <th>Card Name</th>
                                                <th>Card Number</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {payments.map((item, idx) => (
                                                <tr key={item._id}>
                                                    <td>{idx + 1}</td>
                                                    <td>{item.serviceProvider?.name || "N/A"}</td>
                                                    <td>{new Date(item.appointment_datetime).toLocaleDateString()}</td>
                                                    <td>₹ {item.fees}</td>
                                                    <td>{item.card_name || "-"}</td>
                                                    <td>{item.card_number ? `**** **** **** ${item.card_number.slice(-4)}` : "-"}</td>
                                                    <td>
                                                        <Badge
                                                            bg={
                                                                item.status === "Completed"
                                                                    ? "success"
                                                                    : item.status === "Cancelled"
                                                                    ? "danger"
                                                                    : "warning"
                                                            }
                                                        >
                                                            {item.status}
                                                        </Badge>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            )}
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default MyPayments;
