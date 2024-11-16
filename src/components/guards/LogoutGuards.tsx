import { useSelector } from "react-redux";
import { checkIsLoggedin } from "../../store/slices/auth";
import { Navigate, useLocation } from "react-router-dom";

export default function LogoutGuards({ children }: { children: JSX.Element }) {
    const location = useLocation()
    console.log(location.search);
    const login = useSelector(checkIsLoggedin)
    if (!login) {
        return children;
    } else {
        return <Navigate to={`/`} />;
    }
}
