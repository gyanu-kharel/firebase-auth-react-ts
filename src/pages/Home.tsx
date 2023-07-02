import { useContext } from "react";
import { AppUserContext } from "../providers/AppUserProvider";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { ClearCookies } from "../services/AuthService";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const {user, updateUser} = useContext(AppUserContext);
    const toast = useToast();
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut(auth);
        ClearCookies();
        updateUser ? updateUser(null) : null;
        navigate("/login");
        toast({
            title: 'Signed out',
            description: 'You have been signed out',
            status: 'info'
        });
    };

    return(
        <>
            <h1>Home Welcome {user?.displayName}</h1>
            <button type="submit" onClick={handleSignOut}>Sign Out</button>
        </>
    );
};

export default Home;