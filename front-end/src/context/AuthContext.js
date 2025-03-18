import { createContext, useState, useEffect } from "react";
import { login, signup } from "../services/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogin = async (userData) => {
        const res = await login(userData);
        setUser(res.user);
        localStorage.setItem("user", JSON.stringify(res.user));
    };

    const handleSignup = async (userData) => {
        const res = await signup(userData);
        setUser(res.user);
        localStorage.setItem("user", JSON.stringify(res.user));
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleSignup, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

