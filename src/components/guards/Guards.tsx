import { Navigate, useLocation } from "react-router-dom";
import { checkIsLoggedin } from "../../store/slices/auth";
import { useSelector } from "react-redux";

const Guard = ({ children }: { children: JSX.Element }) => {
    const location=useLocation()
    console.log(location.pathname);
    const login = useSelector(checkIsLoggedin)
    if (login) {
        return children;
    } else {
        return <Navigate to="auth/login" />;
    }
};

export default Guard;