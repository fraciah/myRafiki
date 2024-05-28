import { createContext, useState, useEffect } from "react";
import { auth } from "../firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            console.log("USER IS", user)
            setUser(user)
            setLoading(false)
        })
    }, [user])

    return (
        <AuthContext.Provider value={{ user, loggedIn, setLoggedIn }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthContext;