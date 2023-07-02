import { useContext } from "react";
import { AppUserContext } from "../providers/AppUserProvider";

const Home = () => {
    const {user} = useContext(AppUserContext);
    console.log(user);
    return(
        <h1>Home Welcome {user?.displayName}</h1>
    );
};

export default Home;