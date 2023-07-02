import { UserInfo } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

interface IAppUser {
    user: UserInfo | null;
    updateUser? : (user: UserInfo | null) => void
};

const defaultAppUser : IAppUser = {
    user: null,
};

export const AppUserContext = createContext<IAppUser>(defaultAppUser);


type AppUserProviderProps = {
    children?: React.ReactNode
};

const AppUserProvider = ({children} : AppUserProviderProps) => {
    const [user, setUser] = useState<UserInfo | null>(defaultAppUser.user);

    const updateUser = (user: UserInfo | null) => {
        localStorage.setItem("appUser", JSON.stringify(user));
        setUser(user);
    }

    useEffect(() => {
        const userData = localStorage.getItem("appUser");
        if(userData)
            setUser(JSON.parse(userData))
    }, []);

    return(
        <AppUserContext.Provider value={{user, updateUser}}>
            {children}
        </AppUserContext.Provider>
    )
};

export default AppUserProvider;