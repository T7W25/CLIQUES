import React, { useContext, useEffect, useState } from "react";
import { Col, Row, Spinner, Alert, Card } from "react-bootstrap";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import UserContext from "../../Context/User/userContext";
import Sidebar from "./Sidebar";
import axios from "axios";
import baseurl from "../../config"; // adjust path as needed

const TrackEarnings = () => {
    const { users } = useContext(UserContext);
    const [earningsData, setEarningsData] = useState([]);
    const [totalEarnings, setTotalEarnings] = useState(0);
    const [todayEarnings, setTodayEarnings] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(""); 

    useEffect(() => {
        const fetchEarnings = async () => {
            try {
                const res = await axios.get(`${baseurl}/web-api/appointment/earnings/provider/${users._id}`);
                setEarningsData(res.data.dailyEarnings || []);
                setTotalEarnings(res.data.totalEarnings || 0);
                setTodayEarnings(res.data.todayEarnings || 0);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch earnings data");
                setLoading(false);
            }
        };

        if (users && users._id) {
            fetchEarnings();
        }
    }, [users]);

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="content">
                <Row className="mb-4">
                    <Col><h4 className="fw-bold">📊 Track Earnings</h4></Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <Card className="p-3 rounded-4 shadow-sm bg-success-subtle border-success">
                            <h6 className="text-success">All Time Earnings</h6>
                            <h3 className="fw-bold">$ {totalEarnings}</h3>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card className="p-3 rounded-4 shadow-sm bg-primary-subtle border-primary">
                            <h6 className="text-primary">Today's Earnings</h6>
                            <h3 className="fw-bold">$ {todayEarnings}</h3>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col md={12}>
                        <Card className="shadow rounded-4 p-4">
                            <h5 className="mb-3">Earnings Overview (Daily)</h5>

                            {loading && (
                                <div className="text-center py-5">
                                    <Spinner animation="border" variant="primary" />
                                    <p className="mt-3">Loading chart...</p>
                                </div>
                            )}

                            {error && <Alert variant="danger">{error}</Alert>}

                            {!loading && !error && earningsData.length === 0 && (
                                <Alert variant="info">No earnings data found.</Alert>
                            )}

                            {!loading && earningsData.length > 0 && (
                                <ResponsiveContainer width="100%" height={350}>
                                    <LineChart data={earningsData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Line
                                            type="monotone"
                                            dataKey="totalEarnings"
                                            stroke="#007bff"
                                            strokeWidth={3}
                                            activeDot={{ r: 6 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            )}
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default TrackEarnings;
