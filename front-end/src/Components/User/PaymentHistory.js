import React, { useContext, useEffect, useState } from "react";
import { Col, Row, Spinner, Alert, Card, Table, Badge } from "react-bootstrap";
import UserContext from "../../Context/User/userContext";
import Sidebar from "./Sidebar";
import axios from "axios";
import baseurl from "../../config"; // adjust path as needed

const PaymentHistory = () => {
    const { users } = useContext(UserContext);
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
 
    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const res = await axios.get(`${baseurl}/web-api/appointment/show/provider/${users._id}`);
                setPayments(res.data.data || []);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Failed to load payment history.");
                setLoading(false);
            }
        };

        if (users && users._id) {
            fetchPayments();
        }
    }, [users]);

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="content">
                <Row className="mb-4">
                    <Col><h4 className="fw-bold">💳 Payment History</h4></Col>
                </Row>

                <Row>
                    <Col md={12}>
                        <Card className="shadow rounded-4 p-4">
                            <h5 className="mb-3">Client Payment Details</h5>

                            {loading && (
                                <div className="text-center py-5">
                                    <Spinner animation="border" variant="primary" />
                                    <p className="mt-3">Loading payment data...</p>
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
                                                <th>Client Name</th>
                                                <th>Email</th>
                                                <th>Phone</th>
                                                <th>Date</th>
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
                                                    <td>{item.client?.name || "N/A"}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.phone}</td>
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

export default PaymentHistory;
