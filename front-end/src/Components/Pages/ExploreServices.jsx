import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import baseurl from "../../config"; // adjust path as needed

const ExploreServices = () => { 
    const filterUrl = `${baseurl}/web-api/service-provider/filters`;
    const serviceUrl = `${baseurl}/web-api/service-provider/filter`;
    const [categories, setCategories] = useState([]);

    const [providers, setProviders] = useState([]);
    const [filters, setFilters] = useState({
        city: '',
        pricing: '',
        availability: '',
        experience: ''
    });
    const [dropdowns, setDropdowns] = useState({
        cities: [],
        pricing: [],
        availability: [],
        experience: []
    });

    // ✅ Fetch available filter options from the API
    const fetchFilters = async () => {
        try {
            const res = await axios.get(filterUrl);
            setDropdowns({
                cities: res.data.cities || [],
                pricing: (res.data.pricing || []).filter(p => p !== null),
                availability: (res.data.availability || []).filter(p => p !== null),
                experience: (res.data.experience || []).filter(p => p !== null),
            });
        } catch (err) {
            console.error("Error fetching filters:", err);
        }
    };

    // Fetch categories
    useEffect(() => {
        fetch("http://localhost:3100/api/category/show")
            .then((res) => res.json())
            .then((data) => setCategories(data.data || []))
            .catch((err) => console.error("Error fetching categories:", err));
    }, []);


    const fetchProviders = async () => {
        try {
            const res = await axios.get(serviceUrl, { params: filters });
            setProviders(res.data.data);
        } catch (err) {
            console.error("Error fetching providers:", err);
        }
    };

    useEffect(() => {
        fetchFilters();
        fetchProviders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleApplyFilters = () => {
        fetchProviders();
    };

    return (
        <Container className="py-5 main-section">
            <h3 className="mb-4 text-center">Explore Our Services</h3>

            <Row className="mb-4">
                <Col md={2}>
                    <Form.Select name="category" onChange={handleFilterChange}>
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                                {cat.name}
                            </option>
                        ))}
                    </Form.Select>
                </Col>
                <Col md={2}>
                    <Form.Select name="city" value={filters.city} onChange={handleFilterChange}>
                        <option value="">Select City</option>
                        {dropdowns.cities.map((city, index) => (
                            <option key={index} value={city}>{city}</option>
                        ))}
                    </Form.Select>
                </Col>
                <Col md={2}>
                    <Form.Select name="pricing" value={filters.pricing} onChange={handleFilterChange}>
                        <option value="">Select Pricing</option>
                        {dropdowns.pricing.map((price, index) => (
                            <option key={index} value={price}>${price}</option>
                        ))}
                    </Form.Select>
                </Col>
                <Col md={2}>
                    <Form.Select name="availability" value={filters.availability} onChange={handleFilterChange}>
                        <option value="">Select Availability</option>
                        {dropdowns.availability.map((val, index) => (
                            <option key={index} value={val}>{val}</option>
                        ))}
                    </Form.Select>
                </Col>
                <Col md={2}>
                    <Form.Select name="experience" value={filters.experience} onChange={handleFilterChange}>
                        <option value="">Select Experience</option>
                        {dropdowns.experience.map((exp, index) => (
                            <option key={index} value={exp}>{exp} years</option>
                        ))}
                    </Form.Select>
                </Col>
                <Col md={2} className="text-end">
                    <Button variant="primary" onClick={handleApplyFilters}>Apply Filters</Button>
                </Col>
            </Row>

            <Row>
                {providers.length === 0 && <p className="text-center">No service providers found.</p>}
                {providers.map((provider) => (
                    <Col md={4} key={provider._id} className="mb-4">
                        <Card className="h-100 shadow-sm border-0 rounded-4">
                            <Link to={`/service/${provider._id}`}>
                                <Card.Img
                                    variant="top"
                                    src={provider.profilePicture || "/assets/img/default-user.png"}
                                    className="rounded-top"
                                    style={{ height: "250px", objectFit: "cover" }}
                                />
                            </Link>
                            <Card.Body>
                                <Card.Title className='text-capitalize'>{provider.name}</Card.Title>
                                <Card.Text>
                                    <strong>City:</strong> {provider.city}<br />
                                    <strong>Pricing:</strong> ${provider.pricing}
                                </Card.Text>
                                <Link to={`/service/${provider._id}`}>
                                    <Button variant="outline-primary" className="w-100">View Profile</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ExploreServices;
