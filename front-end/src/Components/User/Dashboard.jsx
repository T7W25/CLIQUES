import React, { useContext } from "react";
import UserContext from "../../Context/User/userContext";
import Sidebar from "./Sidebar";
import { Card, Row, Col } from "react-bootstrap";

function Dashboard() {
    const { users } = useContext(UserContext);

    if (!users) {
        return <h3 className="text-center mt-4">Loading user data...</h3>;
    }

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="content p-4">
                <h3 className="mb-4 text-capitalize">Welcome back, <span className="text-primary">{users.name}</span>!</h3>

                <Row>
                    <Col md={6}>
                        <Card className="shadow-sm border-0 rounded-4 p-3">
                            <h5 className="mb-3 text-secondary">
                                <i className="fa fa-user-circle me-2"></i>
                                Account Details
                            </h5>
                            <ul className="list-unstyled fs-6">
                                <li className="mb-2">
                                    <i className="fa fa-envelope me-2 text-muted"></i>
                                    <strong>Email:</strong> {users.email}
                                </li>
                                <li className="mb-2">
                                    <i className="fa fa-phone me-2 text-muted"></i>
                                    <strong>Phone:</strong> {users.phone}
                                </li>
                                <li className="mb-2">
                                    <i className="fa fa-user-tag me-2 text-muted"></i>
                                    <strong>Role:</strong> {users.role}
                                </li>
                                <li className="mb-2">
                                    <i className="fa fa-map-marker-alt me-2 text-muted"></i>
                                    <strong>Address:</strong> {users.address}
                                </li>
                            </ul>
                        </Card>
                    </Col>

                    <Col md={6}>
                        <Card className="shadow-sm border-0 rounded-4 p-3 bg-light h-100 d-flex justify-content-center align-items-center text-center">
                            <div>
                                <img
                                    src={users.profilePicture || "/assets/img/default-user.png"}
                                    alt="Profile"
                                    className="rounded-circle mb-3"
                                    style={{ width: "120px", height: "120px", objectFit: "cover" }}
                                />
                                <p className="text-muted">Profile Picture</p>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Dashboard;
