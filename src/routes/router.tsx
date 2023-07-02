import {createBrowserRouter} from "react-router-dom";
import Login from "../pages/Login.tsx";
import Register from "../pages/Register.tsx";
import { PrivateRoute } from "./privateRouter.tsx";
import Home from "../pages/Home.tsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <PrivateRoute>
                <Home />
            </PrivateRoute>
        )
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    }
]);