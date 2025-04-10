import React, { useState } from "react";
import ServiceContext from "./serviceContext"; 
import baseurl from "../../config"; // adjust path as needed

const ServiceState = (props) => {
    const serviceInitial = []
    const [services, serviceData] = useState(serviceInitial);
    const allServiceDataInitial = []
    const [allServices, allServiceData] = useState(allServiceDataInitial)   
  
    // Add Service
    const addService = async (serviceData, setError, navigate) => {
        try {
            const token = localStorage.getItem("token");
            const formData = new FormData();
    
            formData.append("category", serviceData.category);
            formData.append("title", serviceData.title);
            formData.append("price", serviceData.price);
            formData.append("description", serviceData.description);
            formData.append("duties", serviceData.duties);
            formData.append("availability", serviceData.availability);
    
            // Append each image file
            for (let i = 0; i < serviceData.images.length; i++) {
                formData.append("images", serviceData.images[i]);
            }
    
            const response = await fetch(`${baseurl}/api/service/add`, {
                method: "POST",
                headers: {
                    "auth-token": token // Only include auth-token, NOT content-type
                },
                body: formData,
            });
    
            const json = await response.json();
    
            if (json.success) {
                navigate("/manage-services");
            } else {
                setError(json.error || "Failed to add service.");
            }
        } catch (error) {
            console.error("Add service error:", error);
            setError("Something went wrong. Please try again.");
        }
    };    

    // Get all services
    const getAllServices = async () => { 
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${baseurl}/api/service/show`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": token,
                }
            });
    
            const json = await response.json();
    
            // Set only the array of services
            allServiceData(Array.isArray(json.data) ? json.data : []);
        } catch (error) {
            console.log('Server Error : ' + error.message);
            allServiceData([]); // fallback to empty array on error
        }
    };    

    return (
        <ServiceContext.Provider value={{ services, serviceData, allServices, allServiceData, getAllServices, addService }}>
            {props.children}
        </ServiceContext.Provider>
    )
}
export default ServiceState;