import React, { useState } from "react";
import { registerUser } from "../../services/api/authApi";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "client" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(formData);
      alert("Registration successful!");
    } catch (err) {
      alert("Error: " + err.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input name="name" onChange={handleChange} placeholder="Name" required />
      <input name="email" type="email" onChange={handleChange} placeholder="Email" required />
      <input name="password" type="password" onChange={handleChange} placeholder="Password" required />
      <select name="role" onChange={handleChange}>
        <option value="client">Client</option>
        <option value="provider">Service Provider</option>
      </select>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Register; 
