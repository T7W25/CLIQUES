import React, { useState } from "react";
import CategoryContext from "./categoryContext";
import baseurl from "../../config"; // adjust path as needed

const CategoryState = (props) => {
    const categoryInitial = []
    const [categorys, categoryData] = useState(categoryInitial);
    const [allCategorys, allCategoryData] = useState(categoryInitial) 

    // Add Category 
    const addCategory = async (categoryData, setError, navigate) => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`${baseurl}/api/category/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token
                },
                body: JSON.stringify(categoryData),
            });

            const json = await response.json();

            if (json.success) {
                navigate("/categories");
            } else {
                setError(json.error || "Failed to add category.");
            }
        } catch (error) {
            console.error("Add category error:", error);
            setError("Something went wrong. Please try again.");
        }
    };

    // Get all categorys
    const getAllCategorys = async () => {
        try {
            // const token = localStorage.getItem("token");
            const response = await fetch(`${baseurl}/api/category/show`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // "auth-token": token,
                }
            });

            const json = await response.json();

            // Set only the array of categorys
            allCategoryData(Array.isArray(json.data) ? json.data : []);
        } catch (error) {
            console.log('Server Error : ' + error.message);
            allCategoryData([]); // fallback to empty array on error
        }
    };

    return (
        <CategoryContext.Provider value={{ categorys, categoryData, allCategorys, allCategoryData, getAllCategorys, addCategory }}>
            {props.children}
        </CategoryContext.Provider>
    )
}
export default CategoryState;