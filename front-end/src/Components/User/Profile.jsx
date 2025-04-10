import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../Context/User/userContext";
import Sidebar from "./Sidebar";
import baseurl from "../../config"; // adjust path as needed

const Profile = () => {
    const { users, updateProfile, updateOtherDetails } = useContext(UserContext);
    const [errorMessage, setErrorMessage] = useState("");
    const [previewImage, setPreviewImage] = useState(users?.profilePicture || "/assets/img/default-user.png");
    const [previewIDImage, setPreviewIDImage] = useState(users?.identityProof || "/assets/img/default-user.png");
    const [categories, setCategories] = useState([]);

    // Profile Form Data
    const [profileFormData, setProfileFormData] = useState({
        name: users?.name || "",
        phone: users?.phone || "",
        address: users?.address || "",
        city: users?.city || "",
        profilePicture: users?.profilePicture || ""
    });

    // Other Details Form Data
    const [otherFormData, setOtherFormData] = useState({
        category: users?.category || "",
        availability: users?.availability || "",
        experience: users?.experience || "",
        skills: users?.skills || "",
        pricing: users?.pricing || "",
        identityProof: users?.identityProof || ""
    });

    useEffect(() => {
        setProfileFormData({
            name: users?.name || "",
            phone: users?.phone || "",
            address: users?.address || "",
            city: users?.city || "",
            profilePicture: users?.profilePicture || ""
        });

        setOtherFormData({
            category: users?.category || "",
            availability: users?.availability || "",
            experience: users?.experience || "",
            skills: users?.skills || "",
            pricing: users?.pricing || "",
            identityProof: users?.identityProof || ""
        });

        setPreviewImage(users?.profilePicture || "/assets/img/default-user.png");
        setPreviewIDImage(users?.identityProof || "/assets/img/default-user.png");
    }, [users]);

    // Fetch categories
    useEffect(() => {
        fetch(`${baseurl}/api/category/show`)
            .then((res) => res.json())
            .then((data) => setCategories(data.data || []))
            .catch((err) => console.error("Error fetching categories:", err));
    }, []);

    // Profile Handlers
    const handleProfileChange = (e) => {
        setProfileFormData({ ...profileFormData, [e.target.name]: e.target.value });
    };

    const handleProfileFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileFormData({ ...profileFormData, profilePicture: file });
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    // Other Details Handlers
    const handleOtherChange = (e) => {
        setOtherFormData({ ...otherFormData, [e.target.name]: e.target.value });
    };

    const handleOtherFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setOtherFormData({ ...otherFormData, identityProof: file });
            setPreviewIDImage(URL.createObjectURL(file));
        }
    };

    // Submit Handlers
    const handleProfileSubmit = (e) => {
        e.preventDefault();
        setErrorMessage("");
        updateProfile(profileFormData, setErrorMessage);
    };

    const handleOtherSubmit = (e) => {
        e.preventDefault();
        setErrorMessage("");
        updateOtherDetails(otherFormData, setErrorMessage);
    };

    return (

        <div className="dashboard-container">
            <Sidebar />
            <div className="content">
                <div className="row">
                    <div className="col-6">
                        <h4 className="mb-4">Profile</h4>
                        {errorMessage && <div className="alert alert-info">{errorMessage}</div>}

                        {/* Profile Form */}
                        <form onSubmit={handleProfileSubmit} encType="multipart/form-data">
                            <div className="mb-3">
                                <label htmlFor="profilePicture">
                                    <img
                                        src={previewImage || "/assets/img/default-user.png"}
                                        alt="Profile"
                                        className="img-thumbnail rounded-circle"
                                        style={{ width: "70px", height: "70px", objectFit: "cover" }}
                                    />
                                </label>
                                <div className="text-left mt-2">
                                    <label>Profile Image:</label>
                                    <input
                                        type="file"
                                        id="profilePicture"
                                        name="profilePicture"
                                        accept="image/*"
                                        className="form-control mt-2"
                                        onChange={handleProfileFileChange}
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label>Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={profileFormData.name}
                                    onChange={handleProfileChange}
                                    className="form-control"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label>Phone:</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={profileFormData.phone}
                                    onChange={handleProfileChange}
                                    className="form-control"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label>Address:</label>
                                <textarea
                                    name="address"
                                    value={profileFormData.address}
                                    onChange={handleProfileChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label>City (Ontario):</label>
                                <select
                                    name="city"
                                    value={profileFormData.city}
                                    onChange={handleProfileChange}
                                    className="form-control"
                                    required
                                >
                                    <option value="">Select City</option>
                                    <option value="Toronto">Toronto</option>
                                    <option value="Ottawa">Ottawa</option>
                                    <option value="Mississauga">Mississauga</option>
                                    <option value="Brampton">Brampton</option>
                                    <option value="Hamilton">Hamilton</option>
                                    <option value="London">London</option>
                                    <option value="Markham">Markham</option>
                                    <option value="Vaughan">Vaughan</option>
                                    <option value="Kitchener">Kitchener</option>
                                    <option value="Windsor">Windsor</option>
                                    <option value="Richmond Hill">Richmond Hill</option>
                                    <option value="Oakville">Oakville</option>
                                    <option value="Burlington">Burlington</option>
                                    <option value="Sudbury">Sudbury</option>
                                    <option value="Barrie">Barrie</option>
                                    <option value="Kingston">Kingston</option>
                                    <option value="Guelph">Guelph</option>
                                    <option value="Thunder Bay">Thunder Bay</option>
                                </select>
                            </div>

                            <button type="submit" className="btn btn-primary">Update Profile</button>
                        </form>
                    </div>

                    {/* Show this only if Service Provider */}
                    {users?.role === "Service Provider" && (
                        <>
                            <div className="col-6">
                                <h4 className="mb-4">Other Details</h4>

                                {/* Other Details Form */}
                                <form onSubmit={handleOtherSubmit} encType="multipart/form-data">
                                    <div className="mb-3">
                                        <label htmlFor="identityProof">
                                            <img
                                                src={previewIDImage || "/assets/img/default-user.png"}
                                                alt="ID Proof"
                                                className="img-thumbnail rounded-circle"
                                                style={{ width: "70px", height: "70px", objectFit: "cover" }}
                                            />
                                        </label>
                                        <div className="text-left mt-2">
                                            <label>ID Proof:</label>
                                            <input
                                                type="file"
                                                id="identityProof"
                                                name="identityProof"
                                                accept="image/*"
                                                className="form-control mt-2"
                                                onChange={handleOtherFileChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label>Category:</label>
                                        <select
                                            name="category"
                                            value={otherFormData.category}
                                            onChange={handleOtherChange}
                                            className="form-control"
                                            required
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map((cat) => (
                                                <option key={cat._id} value={cat._id}>
                                                    {cat.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label d-block">Availability:</label>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="availability"
                                                id="availableYes"
                                                value="Yes"
                                                checked={otherFormData.availability === "Yes"}
                                                onChange={handleOtherChange}
                                                required
                                            />
                                            <label className="form-check-label" htmlFor="availableYes">Yes</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="availability"
                                                id="availableNo"
                                                value="No"
                                                checked={otherFormData.availability === "No"}
                                                onChange={handleOtherChange}
                                            />
                                            <label className="form-check-label" htmlFor="availableNo">No</label>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label>Experience:</label>
                                        <input
                                            type="text"
                                            name="experience"
                                            value={otherFormData.experience}
                                            onChange={handleOtherChange}
                                            className="form-control"
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label>Skills:</label>
                                        <textarea
                                            name="skills"
                                            value={otherFormData.skills}
                                            onChange={handleOtherChange}
                                            className="form-control"
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label>Pricing Hourly($):</label>
                                        <input
                                            type="text"
                                            name="pricing"
                                            value={otherFormData.pricing}
                                            onChange={handleOtherChange}
                                            className="form-control"
                                            required
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-success">Update Other Details</button>
                                </form>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
