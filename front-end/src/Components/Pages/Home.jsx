import React from 'react';
import { Container } from 'react-bootstrap';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { FaHome, FaUtensils, FaTv, FaQuoteLeft, FaWrench, FaSnowflake, FaTools, FaUserTie, FaShieldAlt, FaDollarSign, FaSmile, FaClock, FaUsers } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = () => {
    const sliderSettings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4000,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <Container fluid className="home-container px-0">
            {/* Hero Slider */}
            <Slider {...sliderSettings} className="hero-slider mb-5">
                <div className="slider-slide d-flex flex-column flex-lg-row align-items-center">
                    <div className="w-100 w-lg-50">
                        <img src="/assets/img/slider1.jpg" alt="Home Repair" className="img-fluid" />
                    </div>
                    <div className="w-100 w-lg-50 p-4 p-lg-5 d-flex flex-column justify-content-center text-center text-lg-start">
                        <h1>Trusted Home & Repair Services</h1>
                        <p>Your comfort is our priority. We bring quick, professional, and affordable solutions to your doorstep.</p>
                        <Link to="/explore-services" className="btn-theme mt-3">Book a Service</Link>
                    </div>
                </div>

                <div className="slider-slide d-flex flex-column flex-lg-row align-items-center">
                    <div className="w-100 w-lg-50">
                        <img src="/assets/img/slider2.jpg" alt="Professional Support" className="img-fluid" />
                    </div>
                    <div className="w-100 w-lg-50 p-4 p-lg-5 d-flex flex-column justify-content-center text-center text-lg-start">
                        <h1>All-in-One Professional Support</h1>
                        <p>From home cleaning to electronic repair, we handle everything with care and precision.</p>
                        <Link to="/explore-services" className="btn-theme mt-3">Explore Services</Link>
                    </div>
                </div>
            </Slider>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1>The best solution for every house problem.</h1>
                    <p>Our open, positive, and proactive approach helps us find ways to align your work environment with the culture.</p>
                    <p>We pride ourselves on our customer-centric approach, ensuring that every service is tailored to meet your unique needs. Our team consists of highly skilled and verified professionals who bring years of experience to deliver the best solutions.</p>
                    <Link to="/services" className="btn btn-dark">Explore Services</Link>
                </div>
                <img src="/assets/img/thumb.png" alt="why choose us" className="hero-img" />
            </section>


            {/* Why Choose us Section */}
            <section className="why-choose-us">
                <div className="why-choose-img">
                    <img src="/assets/img/why.png" alt="why choose us" />
                </div>
                <div className="why-choose-content">
                    <h3>Why Choose Us?</h3>
                    <p>We are committed to providing top-notch services with expert professionals to handle all your needs efficiently.</p>
                    <p>At CLIQUES, we are dedicated to providing top-notch home and repair services. With a team of experienced professionals, we ensure quality and reliability in every service we offer. Whether you need home cleaning, plumbing, AC repair, or food delivery, we have got you covered. Our goal is to make your life easier with hassle-free, efficient, and trustworthy services.</p>
                    <ul className='mb-5'>
                        <li>✔ Experienced and Skilled Professionals</li>
                        <li>✔ Quick and Reliable Service</li>
                        <li>✔ Affordable and Transparent Pricing</li>
                        <li>✔ 24/7 Customer Support</li>
                    </ul>
                    <Link to="/aboutus" className="btn-theme mt-4">Learn More</Link>
                </div>
            </section>

            {/* Service Highlights */}
            <section className="highlights">
                <div className="highlight-box">
                    <FaUserTie className="highlight-icon" />
                    <h3>Professional Expertise</h3>
                    <p>Skilled professionals delivering top-quality services for all your needs.</p>
                </div>

                <div className="highlight-box">
                    <FaShieldAlt className="highlight-icon" />
                    <h3>Reliable Service</h3>
                    <p>Timely, trustworthy, and efficient services you can count on.</p>
                </div>

                <div className="highlight-box">
                    <FaDollarSign className="highlight-icon" />
                    <h3>Affordable Rates</h3>
                    <p>High-quality services at prices that fit your budget.</p>
                </div>
            </section>


            {/* Services Section */}
            <section className="services">
                <h2>Explore our comprehensive range of <br /> professional services</h2>
                <div className="services-grid">
                    <div className="service-card">
                        <FaHome className="service-icon" />
                        <h3>Home Service</h3>
                        <p>Expert home maintenance, cleaning, and repair solutions to keep your house in perfect shape.</p>
                    </div>

                    <div className="service-card">
                        <FaUtensils className="service-icon" />
                        <h3>Food Service</h3>
                        <p>Delicious meals delivered to your doorstep, prepared by top chefs with fresh ingredients.</p>
                    </div>

                    <div className="service-card">
                        <FaTv className="service-icon" />
                        <h3>Electronic Service</h3>
                        <p>Repair and maintenance for all your electronic appliances, from TVs to home theater systems.</p>
                    </div>

                    <div className="service-card">
                        <FaWrench className="service-icon" />
                        <h3>Plumber Service</h3>
                        <p>Professional plumbing solutions including leak repairs, installations, and maintenance.</p>
                    </div>

                    <div className="service-card">
                        <FaSnowflake className="service-icon" />
                        <h3>AC Repair</h3>
                        <p>Cooling system repairs, maintenance, and installation to keep your home comfortable year-round.</p>
                    </div>

                    <div className="service-card">
                        <FaTools className="service-icon" />
                        <h3>All Kind of Services</h3>
                        <p>From handyman services to deep cleaning, we provide everything to meet your needs.</p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section py-5 text-white" style={{ background: '#343a40' }}>
                <Container className="text-center d-flex justify-content-around flex-wrap gap-4">
                    <div><FaUsers size={32} /><h4>10,000+ Clients</h4></div>
                    <div><FaSmile size={32} /><h4>98% Satisfaction</h4></div>
                    <div><FaClock size={32} /><h4>24/7 Support</h4></div>
                    <div><FaTools size={32} /><h4>500+ Services</h4></div>
                </Container>
            </section>

            {/* Testimonials */}
            <section className="testimonials py-5">
                <Container>
                    <h2 className="text-center mb-4">What Our Customers Say</h2>
                    <div className="slides d-flex justify-content-around flex-wrap gap-4">
                        {[
                            { name: "Aaron Hently", quote: "Their expertise and efficiency in fixing my electrical issues were impressive." },
                            { name: "Jessica Williams", quote: "Professional team fixed plumbing quickly. Highly recommend." },
                            { name: "Michael Roberts", quote: "Got my AC repaired fast. Friendly and skilled team." }
                        ].map(({ name, quote }, i) => (
                            <div key={i} className="testimonial-card p-4 shadow-sm rounded-4 bg-white text-center">
                                <FaQuoteLeft size={24} className="text-primary mb-2" />
                                <p>"{quote}"</p>
                                <h5 className="mt-2">- {name}</h5>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>
        </Container>
    );
};

export default Home;
