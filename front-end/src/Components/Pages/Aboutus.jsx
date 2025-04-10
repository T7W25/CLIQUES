import React from 'react';
import '../../master.css';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Aboutus = () => {
    return (
        <Container>
            <div className="home-container">

                <section className="why-choose-us">
                    <div className="why-choose-img">
                        <img src="/assets/img/about.png" alt="why choose us" />
                    </div>
                    <div className="why-choose-content">
                        <h3>About Cliques</h3>
                        <p className="text-gray-600 mt-4 leading-relaxed">
                            At <span className="font-semibold text-blue-600">CLIQUES</span>, we are dedicated to providing top-notch home and repair services.
                            With a team of experienced professionals, we ensure quality and reliability in every service we offer.
                            Whether you need home cleaning, plumbing, AC repair, or food delivery, we have got you covered.
                            Our goal is to make your life easier with hassle-free, efficient, and trustworthy services.
                        </p>
                        <p className="text-gray-600 mt-4 leading-relaxed">
                            We pride ourselves on our <span className="font-semibold text-blue-600">customer-centric approach</span>, ensuring that every
                            service is tailored to meet your unique needs. Our team consists of highly skilled and verified professionals who bring
                            years of experience to deliver the best solutions. From minor fixes to full-scale installations, we handle every task
                            with precision and dedication.
                        </p>
                        <p className="text-gray-600 mt-4 leading-relaxed">
                            What sets us apart is our commitment to <span className="font-semibold text-blue-600">innovation and convenience</span>.
                            We leverage technology to offer seamless booking, real-time tracking, and a hassle-free experience.
                            With <span className="font-semibold text-blue-600">CLIQUES</span>, you can trust that your home and appliances are in safe hands.
                            Experience quality, reliability, and efficiency—all in one place.
                        </p>
                    </div>
                </section>

                {/* Why Choose us Section */}
                <section className="why-choose-us">
                    <div className="why-choose-content">
                        <h3>Why Choose Us?</h3>
                        <p>We take pride in delivering exceptional services backed by a team of highly skilled professionals dedicated to meeting your needs efficiently and effectively.</p>
                        <p>At CLIQUES, our mission is to offer top-tier home maintenance and repair solutions tailored to your convenience. Whether you require **home cleaning, plumbing, AC repairs, or food delivery**, we ensure prompt, high-quality service you can trust. Our goal is to simplify your life with **hassle-free, dependable, and efficient solutions** that guarantee customer satisfaction.</p>
                        <ul className='mb-5'>
                            <li>✔ Certified & Experienced Professionals – We bring expertise you can trust.</li>
                            <li>✔ Fast & Dependable Service – Quick response times and efficient execution.</li>
                            <li>✔ Transparent & Affordable Pricing – No hidden charges, just fair rates.</li>
                            <li>✔ 24/7 Customer Support – Always available to assist you.</li>
                        </ul>
                        <Link to="/aboutus" className="btn-theme mt-4">Learn More</Link>
                    </div>
                    <div className="why-choose-img">
                        <img src="/assets/img/why.png" alt="Reliable and Affordable Home Services" />
                    </div>
                </section>


            </div>
        </Container>
    );
}

export default Aboutus;
