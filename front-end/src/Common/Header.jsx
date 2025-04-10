import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../Context/User/userContext";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Header() {
    const { users } = useContext(UserContext);

    return (
        <Navbar bg="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand>
                    <Link className="nav-link" to="/">
                        <img src="/assets/img/logo.png" alt="Logo" width={150} />
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="gap-4">
                        <Link className="nav-link" to="/">Home</Link>
                        <Link className="nav-link" to="/aboutus">About Us</Link> 
                        <Link className="nav-link" to="/explore-services">Explore Services</Link>
                        <Link className="nav-link" to="/contact">Contact Us</Link>

                        {localStorage.getItem("token") ? (
                            <>
                                <Link className="btn-theme text-capitalize" to="/dashboard">
                                    Hello, {users?.name || "User"}
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link className="btn-theme" to="/login">Login</Link>
                                <Link className="btn-theme bg-success" to="/register">Register</Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
