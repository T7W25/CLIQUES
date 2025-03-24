import React, { useState, useEffect, useContext } from "react";
import { getProfile, updateProfile } from "../../services/api/userApi";
import { AuthContext } from "../../context/AuthContext";

const ClientProfile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({ name: "", email: "" });

  useEffect(() => {
    async function fetchProfile() {
      const res = await getProfile();
      setProfile({ name: res.data.name, email: res.data.email });
    }
    fetchProfile();
  }, []);

  const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateProfile(profile);
    alert("Profile updated successfully!");
    setProfile({ name: res.data.name, email: res.data.email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Client Profile</h2>
      <input name="name" value={profile.name} onChange={handleChange} required />
      <input name="email" value={profile.email} onChange={handleChange} required />
      <button type="submit">Update</button>
    </form>
  );
};

export default ClientProfile;
