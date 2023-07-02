import { Navigate } from "react-router-dom";
import { IsAuthenticated } from "../services/AuthService";

type PrivateRouteProps = {
    children? : React.ReactNode
}

export const PrivateRoute = ({children}: PrivateRouteProps) => {
    const isLoggedIn = IsAuthenticated();

    return(
        <>
            {isLoggedIn
                ? children
                : <Navigate to="/login" />
            }
        </>
    );
};