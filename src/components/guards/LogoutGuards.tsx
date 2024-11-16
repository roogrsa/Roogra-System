import { useSelector } from "react-redux";
import { checkIsLoggedin } from "../../store/slices/auth";
import { Navigate } from "react-router-dom";

export default function LogoutGuards({ children }: { children: JSX.Element }) {
    const login = useSelector(checkIsLoggedin)
    if (!login) {
        return children;
    } else {
        return <Navigate to={`/`} />;
    }
}
