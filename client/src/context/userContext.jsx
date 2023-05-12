import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (user) {
            axios.get("/api/auth/profile").then((response) => {
                setUser(response.data);
                setReady(true);
            })
        }
    }, [])
    return (
        <UserContext.Provider value={{user, setUser, ready}}>
            {children}
        </UserContext.Provider>
    )
}