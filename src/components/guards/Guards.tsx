import { Navigate } from "react-router-dom";

const Guard = ({ children }: { children: JSX.Element }) => {
    let login = localStorage.getItem('login');
    if (login) {
        return children;
    } else {
        return <Navigate to="/" />;
    }
};

export default Guard;