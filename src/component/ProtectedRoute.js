import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const ProtectedRoute = ({ children }) => {
    // const navigate=useNavigate();
    const [userInfo] = useAuth();
    const locations = useLocation()
    if (!userInfo) {
        return <Navigate to="/login" replace={true} state={{ path: locations.pathname }} />
    }

    return children;
}

export default ProtectedRoute;