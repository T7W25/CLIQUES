import React from "react";
import { FaSearch, FaShieldAlt, FaUsers, FaStar, FaPhone, FaEnvelope } from "react-icons/fa";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import "../styles/Home.css";
import heroImage from "../assets/images/hero-image.avif";
import plumbingImg from "../assets/images/plumbing.avif";
import electricalImg from "../assets/images/electrical.png";
import paintingImg from "../assets/images/painting.jpg";
import cleaningImg from "../assets/images/cleaning.png";
import tutoringImg from "../assets/images/hvac.png";
import securityImg from "../assets/images/contractor.png";




const Home = () => {
  return (
    <div className="home-container">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Find the Best Services Near You</h1>
          <p className="hero-subtitle">
            Instantly connect with top professionals for any service you need.
          </p>
          <div className="hero-search">
            <input type="text" placeholder="Search for services..." className="hero-search-input" />
            <button className="hero-search-button">Search <FaSearch /></button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us-section common-container">
        <h2 className="section-title">Why Choose Us</h2>
        <div className="why-choose-us-container">
          {[
            { title: "Certified Experts", desc: "All our professionals are certified, trained, and experienced.", icon: <FaShieldAlt /> },
            { title: "Reliable Services", desc: "We ensure timely and top-quality service, every single time.", icon: <FaUsers /> },
            { title: "Customer Satisfaction", desc: "We prioritize our customers by providing the best experience possible.", icon: <FaStar /> }
          ].map((item, index) => (
            <div key={index} className="why-choose-us-item">
              <div className="why-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Services Section */}
        <section className="services-section common-container">
        <h2 className="section-title">Our Services</h2>
        <div className="services-container">
            {[
            { img: plumbingImg, title: "Plumbing", desc: "Expert plumbing solutions for your home or business." },
            { img: electricalImg, title: "Electrical Work", desc: "Professional electrical services you can trust." },
            { img: paintingImg, title: "Painting", desc: "Transform your space with expert painting services." },
            { img: cleaningImg, title: "Cleaning", desc: "Thorough and reliable cleaning services for any need." },
            { img: tutoringImg, title: "Tutoring", desc: "Expert tutors for various subjects and levels." },
            { img: securityImg, title: "Security", desc: "Top-notch security solutions for peace of mind." }
            ].map((service, index) => (
            <div key={index} className="service-card">
                <img src={service.img} alt={service.title} className="service-image" />
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.desc}</p>
                <button className="service-button">Learn More</button>
            </div>
            ))}
        </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials-section">
        <h2 className="section-title">What Our Customers Say</h2>
        <div className="testimonials-container">
            {[
            { name: "Emily R.", review: "Absolutely amazing service! The electrician arrived on time and resolved my issue swiftly. Highly professional and polite." },
            { name: "Michael B.", review: "I had trouble finding a reliable plumber until I found CLIQUES. Their service was excellent, and I was highly satisfied!" },
            { name: "Sophia L.", review: "The cleaning team was fantastic! My home looks spotless and fresh. I’ll definitely use CLIQUES again." }
            ].map((testimonial, index) => (
            <div key={index} className="testimonial-card">
                <div className="stars">{[...Array(5)].map((_, i) => <FaStar key={i} className="testimonial-star" />)}</div>
                <p>"{testimonial.review}"</p>
                <h4>{testimonial.name}</h4>
            </div>
            ))}
        </div>
        </section>
     
       {/* Contact Us Section */}
        <section className="contact-section">
        <h2 className="section-title">Get in Touch</h2>
        <p className="contact-text">
            Need assistance? Contact us today! Whether you have a question or need service recommendations, our team is here to help.
        </p>
        <div className="contact-buttons">
            <button className="contact-button"><FaPhone /> Call Us</button>
            <button className="contact-button"><FaEnvelope /> Email Us</button>
        </div>
        </section>

        {/* <Footer /> */}
    </div>
  );
};

export default Home;
