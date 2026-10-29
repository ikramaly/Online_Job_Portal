import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const ProtectedRoute = ({children}) =>{
    const {user} = useSelector(store => store.user);
    if (!user || user.role !== "recruiter") return <Navigate to="/" replace />;
    return children;
}

export default ProtectedRoute;
