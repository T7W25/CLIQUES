import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../Context/User/userContext";

const ProtectedRoute = ({ allowedRoles }) => {
    const { users, loading } = useContext(UserContext); // ✅ get loading too

    if (loading) {
        return <div className="text-center p-5">Checking authentication...</div>; // or spinner
    }

    if (!users) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(users.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
