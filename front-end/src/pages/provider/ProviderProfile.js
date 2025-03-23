import React, { useState, useEffect, useContext } from "react";
import { getProfile, updateProfile } from "../../services/api/userApi";
import { AuthContext } from "../../context/AuthContext";

const ProviderProfile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({ name: "", email: "", availability: "", skills: "" });

  useEffect(() => {
    async function fetchProfile() {
      const res = await getProfile();
      setProfile({
        name: res.data.name,
        email: res.data.email,
        availability: res.data.availability || "",
        skills: res.data.skills?.join(", ") || "",
      });
    }
    fetchProfile();
  }, []);

  const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateData = {
      ...profile,
      skills: profile.skills.split(",").map((s) => s.trim()),
    };
    const res = await updateProfile(updateData);
    alert("Profile updated successfully!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Provider Profile</h2>
      <input name="name" value={profile.name} onChange={handleChange} required />
      <input name="email" value={profile.email} onChange={handleChange} required />
      <input name="availability" value={profile.availability} onChange={handleChange} placeholder="Availability" />
      <textarea name="skills" value={profile.skills} onChange={handleChange} placeholder="Skills (comma separated)" />
      <button type="submit">Update</button>
    </form>
  );
};

export default ProviderProfile;
 
