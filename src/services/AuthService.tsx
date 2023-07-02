export const IsAuthenticated = () : boolean => {
    var user = localStorage.getItem("appUser");
    if(user && user !== null)
        return true;
    
    return false;
}

export const ClearCookies = () => {
   localStorage.removeItem("appUser");
}