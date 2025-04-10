import React, { useEffect, useState } from "react";
import UserContext from "./userContext";
import { useNavigate } from "react-router-dom";
import baseurl from "../../config"; // adjust path as needed

const UserState = (props) => {
    const userInitial = []
    const [users, userData] = useState(userInitial);
    const allUserDataInitial = []
    const [allUsers, allUserData] = useState(allUserDataInitial)
    const [message, setMessage] = useState(""); 
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState(true); // NEW

    // check whether token has been created or not (if not then redirect to login)
    const checkAuthToken = () => {
        if (!token) {
            navigate("/login");
        }
    };

    // Admin Logout
    const logout = () => {
        localStorage.removeItem("token");
        userData(null);
        navigate("/login");
    };

    // Login Module
    const login = async (email, password, setError) => {
        try {
            const response = await fetch(`${baseurl}/auth/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const json = await response.json();

            if (json.success) {
                localStorage.setItem("token", json.authToken);
                navigate("/dashboard");
                window.location.reload(); // To update header with username
            } else {
                setError(json.error); // Set error message in state
            }
        } catch (error) {
            console.log("Something went wrong while logging in! " + error.message);
            setError("Something went wrong. Please try again.");
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await fetch(`${baseurl}/auth/user/getuser`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "auth-token": token,
                        },
                    });
                    const json = await response.json();
                    if (json.success) {
                        userData(json.admin);
                    } else {
                        setMessage(json.error);
                    }
                } catch (error) {
                    setMessage("Error fetching user data.");
                }
            }
            setLoading(false); // ✅ done loading
        };

        fetchUserData();
    }, []);

    // Update Profile
    const updateProfile = async (updatedData, setError) => {
        try {
            const token = localStorage.getItem("token");
            if (!users) return;

            const formData = new FormData();
            formData.append("name", updatedData.name);
            formData.append("phone", updatedData.phone);
            formData.append("address", updatedData.address);
            formData.append("city", updatedData.city);
            if (updatedData.profilePicture) {
                formData.append("profilePicture", updatedData.profilePicture);
            }

            const response = await fetch(`${baseurl}/auth/user/updateinfo/${users._id}`, {
                method: "PUT",
                headers: {
                    "auth-token": token, // No need to set Content-Type for FormData
                },
                body: formData,
            });

            const json = await response.json();
            if (json.success) {
                userData({ ...users, ...updatedData });
                setError("Profile updated successfully!");
            } else {
                setError(json.error);
            }
        } catch (error) {
            setError("Failed to update profile.");
        }
    };

    // Update Other Info (Category, Availability, Experience, Skills) 
    const updateOtherDetails = async (updatedData, setError) => {
        try {
            const token = localStorage.getItem("token");
            if (!users) return;

            const formData = new FormData();
            formData.append("category", updatedData.category);
            formData.append("availability", updatedData.availability);
            formData.append("experience", updatedData.experience);
            formData.append("skills", updatedData.skills);
            formData.append("pricing", updatedData.pricing);

            if (updatedData.identityProof) {
                formData.append("identityProof", updatedData.identityProof);
            }

            const response = await fetch(`${baseurl}/auth/user/updateotherinfo/${users._id}`, {
                method: "PUT",
                headers: {
                    "auth-token": token,
                },
                body: formData,
            });

            const json = await response.json();
            if (json.success) {
                userData({ ...users, ...updatedData });
                setError("Other info updated successfully!");
            } else {
                setError(json.error);
            }
        } catch (error) {
            setError("Failed to update other information.");
        }
    };

    // Change Password
    const changePassword = async (password, newPassword) => {
        try {
            const token = localStorage.getItem("token");
            if (!users) return;

            const response = await fetch(`${baseurl}/auth/user/update/${users._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token,
                },
                body: JSON.stringify({ password, new_password: newPassword }),
            });

            const json = await response.json();
            if (json.success) {
                setMessage("Password changed successfully!");
            } else {
                setMessage(json.error);
            }
        } catch (error) {
            setMessage("Failed to change password.");
        }
    };

    // Register
    const register = async (userData, setError, navigate, isClient = false) => {
        try {
            const response = await fetch(`${baseurl}/auth/user/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const json = await response.json();

            if (json.success) {
                if (isClient) {
                    localStorage.setItem("token", json.authToken);
                    navigate("/dashboard");
                    window.location.reload();
                } else {
                    navigate("/users");
                }
            } else {
                if (Array.isArray(json.error)) {
                    const messages = json.error.map(err => err.msg).join(", ");
                    setError(messages);
                } else {
                    setError(json.error || "Registration failed.");
                }
            }
        } catch (error) {
            console.error("Register error:", error);
            setError("Something went wrong. Please try again.");
        }
    };

    // Get all users
    const getAllUsers = async () => {
        try {
            const response = await fetch(`${baseurl}/auth/user/show/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const json = await response.json()
            allUserData(json)
        } catch (error) {
            console.log('Server Error : ' + error.message);
        }
    }


    return (
        <UserContext.Provider value={{
            users, userData, allUsers, allUserData,
            getAllUsers, login, register, checkAuthToken,
            logout, updateProfile, updateOtherDetails,
            changePassword, message, loading // ✅ add loading here
        }}>
            {props.children}
        </UserContext.Provider>
    )
}
export default UserState;