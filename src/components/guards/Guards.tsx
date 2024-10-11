import { Navigate } from "react-router-dom";
import { checkIsLoggedin } from "../../store/slices/auth";
import { useSelector } from "react-redux";

const Guard = ({ children }: { children: JSX.Element }) => {
    const login = useSelector(checkIsLoggedin)
    console.log(login);
    if (login) {
        return children;
    } else {
        return <Navigate to="admin/auth/login" />;
    }
};

export default Guard;