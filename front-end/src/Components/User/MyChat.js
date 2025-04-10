import React, { useEffect, useRef, useState, useContext } from "react";
import Sidebar from "./Sidebar";
import {
    Col,
    Row,
    Container,
    ListGroup,
    Modal,
    Button,
    Spinner,
} from "react-bootstrap";
import UserContext from "../../Context/User/userContext";
import axios from "axios";
import baseurl from "../../config"; // adjust path as needed

const MyChat = () => {
    const { users } = useContext(UserContext); 

    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [chatInput, setChatInput] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

    const messageEndRef = useRef(null);

    // ✅ Scroll to bottom on new message
    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    // ✅ Fetch clients
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const res = await axios.get(`${baseurl}/chat/clients/${users._id}`);
                setClients(res.data.clients || []);
            } catch (err) {
                console.error("Error fetching clients:", err);
            }
        };

        if (users?._id) {
            fetchClients();
        }
    }, [users]);

    // ✅ Fetch chat messages
    const fetchMessages = async (clientId) => {
        setLoading(true);
        try {
            const res = await axios.get(`${baseurl}/chat/provider-messages/${users._id}/${clientId}`);
            const fetchedMessages = res.data.messages || [];

            // If messages exist, extract latest appointmentId for this chat
            const latestMsg = [...fetchedMessages].reverse().find(m => m.appointmentId);
            setSelectedAppointmentId(latestMsg?.appointmentId || null);

            setMessages(fetchedMessages);
            setShowModal(true);
        } catch (err) {
            console.error("Error fetching messages:", err);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Send a message
    const sendMessage = async () => {
        if (!chatInput.trim() || !selectedClient) return;

        const newMessage = {
            sender: users._id,
            receiver: selectedClient._id,
            message: chatInput.trim(),
            appointmentId: selectedAppointmentId || "dummy-id", // fallback
        };

        try {
            await axios.post(`${baseurl}/chat/send`, newMessage);

            const localMessage = {
                ...newMessage,
                sender: { _id: users._id },
                timestamp: new Date().toISOString(),
            };

            setMessages(prev => [...prev, localMessage]);
            setChatInput(""); // ✅ Clear textbox

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
                        <Col><h4>💬 My Chat</h4></Col>
                    </Row>

                    {clients.length === 0 ? (
                        <p className="text-muted text-center mt-4">No messages from clients yet.</p>
                    ) : (
                        <ListGroup variant="flush">
                            {clients.map((client) => (
                                <ListGroup.Item
                                    key={client._id}
                                    action
                                    onClick={() => {
                                        setSelectedClient(client);
                                        fetchMessages(client._id);
                                    }}
                                    className="d-flex align-items-center gap-3 py-3 px-4 border-bottom"
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div
                                        className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                                        style={{
                                            width: 40,
                                            height: 40,
                                            fontWeight: 'bold',
                                            fontSize: '1rem',
                                            textTransform: 'uppercase',
                                        }}
                                    >
                                        {client.name?.[0]}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 600, textTransform: 'uppercase' }}>{client.name}</div>
                                        <div className="text-muted" style={{ fontSize: '0.875rem' }}>{client.email}</div>
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}


                    {/* Chat Modal */}
                    <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title>Chat with {selectedClient?.name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
                            <div className="chat-box" style={{ padding: '10px' }}>
                                {loading ? (
                                    <Spinner animation="border" />
                                ) : (
                                    messages.map((msg, i) => (
                                        <div
                                            key={i}
                                            className={`d-flex mb-2 ${msg.sender?._id === users._id ? "justify-content-end" : "justify-content-start"}`}
                                        >
                                            <div
                                                className={`p-2 rounded ${msg.sender?._id === users._id ? "bg-primary text-white" : "bg-light text-dark"}`}
                                                style={{ maxWidth: "70%" }}
                                            >
                                                {msg.message || msg.content}
                                                <div style={{ fontSize: "0.75rem", opacity: 0.7, marginTop: "5px" }}>
                                                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                                <div ref={messageEndRef} />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <input
                                className="form-control"
                                placeholder="Type your message..."
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") sendMessage();
                                }}
                            />
                            <Button variant="primary" onClick={sendMessage}>Send</Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
            </div>
        </div>
    );
};

export default MyChat;
