import React, { useCallback, useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Col, Row, Modal, Button, Container, Form } from "react-bootstrap";
import UserContext from "../../Context/User/userContext";
import axios from "axios";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import baseurl from "../../config"; // adjust path as needed

const ManageBookings = () => {
    const { users } = useContext(UserContext);
    const [appointments, setAppointments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedAppointments, setSelectedAppointments] = useState([]);
    const [selectedDateStr, setSelectedDateStr] = useState("");
    const [updatedAppointments, setUpdatedAppointments] = useState({}); 

    const statusOptions = ["Pending", "Approved", "In Process", "Rejected", "Cancelled", "Completed"];

    // ✅ useCallback prevents the function from being recreated on every render
    const fetchAppointments = useCallback(() => {
        if (!users?._id) return;

        axios.get(`${baseurl}/web-api/appointment/show/provider/${users._id}`)
            .then(res => {
                const data = res.data.data || [];

                const mapped = data.map(app => ({
                    id: app._id,
                    title: `${app.client?.name || "Client"}`,  // checkmark only
                    start: app.appointment_datetime, // FullCalendar uses `start`
                    extendedProps: app
                }));

                setAppointments(mapped);
            })
            .catch(err => console.error("Fetch error:", err));
    }, [users?._id]);

    // ✅ Runs once on load or when user ID changes
    useEffect(() => {
        fetchAppointments();
    }, [fetchAppointments]);

    
    const handleDateClick = (arg) => {
        const clickedDateStr = arg.dateStr;

        const filtered = appointments.filter(app => {
            try {
                const eventDate = new Date(app.start);
                const eventDateStr = eventDate.toISOString().split("T")[0];
                return eventDateStr === clickedDateStr;
            } catch (err) {
                console.warn("Invalid date in appointment:", app);
                return false;
            }
        });

        const appointmentMap = {};
        filtered.forEach(app => {
            const appDate = new Date(app.extendedProps.appointment_datetime);
            if (!isNaN(appDate)) {
                appointmentMap[app.id] = {
                    date: appDate.toISOString().slice(0, 10),
                    time: appDate.toISOString().slice(11, 16),
                    status: app.extendedProps.status
                };
            }
        });

        setSelectedDateStr(clickedDateStr);
        setUpdatedAppointments(appointmentMap);
        setSelectedAppointments(filtered.map(app => app.extendedProps));
        setShowModal(true);
    };


    const handleUpdate = (id) => {
        const updated = updatedAppointments[id];
        const originalApp = selectedAppointments.find(app => app._id === id);
    
        if (!originalApp) return;
    
        // Fallback to original values if not changed by user
        const originalDateTime = new Date(originalApp.appointment_datetime);
        const originalDate = originalDateTime.toISOString().slice(0, 10);
        const originalTime = originalDateTime.toTimeString().slice(0, 5); // "HH:mm"
    
        const date = updated?.date || originalDate;
        const time = updated?.time || originalTime;
        const status = updated?.status || originalApp.status;
    
        // Combine as "YYYY-MM-DD HH:mm" and send to backend
        const appointment_datetime = `${date} ${time}`;
    
        axios.put(`${baseurl}/web-api/appointment/update/${id}`, {
            appointment_datetime,
            status
        })
            .then(() => {
                fetchAppointments();
                alert("Appointment updated!");
            })
            .catch(err => console.error(err));
    };    


    const renderEventContent = (eventInfo) => {
        const clientName = eventInfo.event.title || "Client";
        const status = eventInfo.event.extendedProps?.status || "Pending";

        // Define emoji for each status
        const statusEmojis = {
            "Pending": "🕒",
            "Approved": "✅",
            "In Process": "🔧",
            "Rejected": "❌",
            "Cancelled": "🚫",
            "Completed": "🏁"
        };

        const emoji = statusEmojis[status] || "📅";

        return (
            <div className="text-capitalize">
                {emoji} {clientName}
            </div>
        );
    };



    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="content">
                <Container fluid>
                    <Row className="mb-4">
                        <Col><h4>📅 Manage Bookings</h4></Col>
                    </Row>
                    <Row>
                        <Col>
                            <FullCalendar
                                plugins={[dayGridPlugin, interactionPlugin, bootstrap5Plugin]}
                                initialView="dayGridMonth"
                                themeSystem="bootstrap5"
                                events={appointments}
                                timeZone="local"
                                dateClick={handleDateClick}
                                headerToolbar={{
                                    left: "prev,next today",
                                    center: "title",
                                    right: ""
                                }}
                                eventContent={renderEventContent} // ✅ add this line
                            />
                        </Col>
                    </Row>
                </Container>

                {/* Modal */}
                <Modal size="lg" show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Appointments on {selectedDateStr}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedAppointments.length > 0 ? (
                            selectedAppointments.map((app, i) => (
                                <div key={i} className="p-3 mb-3 border rounded appointment-card">
                                    <h5>👤 {app.client?.name}</h5>
                                    <p><strong>Email:</strong> {app.email}</p>
                                    <p><strong>Phone:</strong> {app.phone}</p>
                                    <p><strong>Address:</strong> {app.address}</p>
                                    <p><strong>Fees:</strong> ₹{app.fees}</p>

                                    <Form>
                                        <Row className="mb-2">
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>Reschedule Date</Form.Label>
                                                    <Form.Control type="date"
                                                        value={updatedAppointments[app._id]?.date || ""}
                                                        onChange={(e) =>
                                                            setUpdatedAppointments(prev => ({
                                                                ...prev,
                                                                [app._id]: {
                                                                    ...prev[app._id],
                                                                    date: e.target.value
                                                                }
                                                            }))
                                                        }
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>Reschedule Time</Form.Label>
                                                    <Form.Control type="time"
                                                        value={updatedAppointments[app._id]?.time || ""}
                                                        onChange={(e) =>
                                                            setUpdatedAppointments(prev => ({
                                                                ...prev,
                                                                [app._id]: {
                                                                    ...prev[app._id],
                                                                    time: e.target.value
                                                                }
                                                            }))
                                                        }
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>Status</Form.Label>
                                                    <Form.Select
                                                        value={updatedAppointments[app._id]?.status || ""}
                                                        onChange={(e) =>
                                                            setUpdatedAppointments(prev => ({
                                                                ...prev,
                                                                [app._id]: {
                                                                    ...prev[app._id],
                                                                    status: e.target.value
                                                                }
                                                            }))
                                                        }
                                                    >
                                                        {statusOptions.map(opt => (
                                                            <option key={opt} value={opt}>{opt}</option>
                                                        ))}
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Button variant="primary" onClick={() => handleUpdate(app._id)}>
                                            Update
                                        </Button>
                                    </Form>
                                </div>
                            ))
                        ) : (
                            <p>No appointments on this date.</p>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default ManageBookings;
