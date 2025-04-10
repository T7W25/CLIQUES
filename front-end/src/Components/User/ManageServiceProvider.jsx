import React, { useCallback, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import {
    Col,
    Row,
    Container,
    Spinner,
    Alert,
    Table,
    Button,
    Image,
} from "react-bootstrap";
import axios from "axios";
import baseurl from "../../config"; // adjust path as needed

const ManageServiceProvider = () => { 
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchProviders = useCallback(async () => {
        try {
            const res = await axios.get(`${baseurl}/web-api/service-provider/show`);
            if (res.data.data) {
                setProviders(res.data.data);
            } else {
                setError("Failed to load service providers.");
            }
        } catch (err) {
            console.error("Error fetching service providers:", err);
            setError("Something went wrong while fetching data.");
        } finally {
            setLoading(false);
        }
    }, []);

    const toggleStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === "Active" ? "Suspended" : "Active";
        if (window.confirm(`Are you sure you want to ${newStatus.toLowerCase()} this user?`)) {
            try {
                const response = await fetch(`${baseurl}/auth/user/status/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ status: newStatus })
                });

                const result = await response.json();
                if (result.success) {
                    alert(`User ${newStatus.toLowerCase()} successfully!`);
                    fetchProviders(); // Refresh list
                } else {
                    alert("Failed to update status.");
                }
            } catch (error) {
                console.error("Error updating user status:", error);
                alert("Something went wrong.");
            }
        }
    };

    useEffect(() => {
        fetchProviders();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="content">
                <Container fluid>
                    <Row className="mb-4">
                        <Col><h4>👨‍🔧 Manage Service Providers</h4></Col>
                    </Row>

                    {loading ? (
                        <div className="text-center my-4">
                            <Spinner animation="border" />
                            <p>Loading providers...</p>
                        </div>
                    ) : error ? (
                        <Alert variant="danger">{error}</Alert>
                    ) : providers.length === 0 ? (
                        <Alert variant="warning">No service providers found.</Alert>
                    ) : (
                        <Table responsive bordered hover className="shadow-sm text-center align-middle">
                            <thead className="table-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Profile</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Address</th>
                                    <th>City</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {providers.map((provider, idx) => (
                                    <tr key={provider._id}>
                                        <td>{idx + 1}</td>
                                        <td>
                                            <Image
                                                src={`${provider.profilePicture || "/assets/img/default-user.png"}`}
                                                alt={provider.name}
                                                roundedCircle
                                                width={50}
                                                height={50}
                                                onError={(e) => e.target.src = ""}
                                            />
                                        </td>
                                        <td>{provider.name}</td>
                                        <td>{provider.email}</td>
                                        <td>{provider.phone}</td>
                                        <td>{provider.address}</td>
                                        <td>{provider.city}</td>
                                        <td>
                                            <span className={`badge bg-${provider.status === "Active" ? "success" : "secondary"}`}>
                                                {provider.status}
                                            </span>
                                        </td>
                                        <td>
                                            <Button
                                                size="sm"
                                                variant={provider.status === "Active" ? "danger" : "success"}
                                                onClick={() => toggleStatus(provider._id, provider.status)}
                                            >
                                                {provider.status === "Active" ? "Suspend" : "Activate"}
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Container>
            </div>
        </div>
    );
};

export default ManageServiceProvider;
