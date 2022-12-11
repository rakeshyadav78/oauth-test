import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import OauthService from "../service/OuthService";


const AuthContext = React.createContext();


const AuthProvider = ({ children }) => {

    const [userInfo, setUserInfo] = useState();
    const navigate = useNavigate();

    const login = () => {
        window.location = OauthService.getAuthUrl();
    }

    const logout = () => {
        console.log('logging out current user ');
        OauthService.logout(userInfo.tokenDetails.access_token, userInfo.tokenDetails.refresh_token).then(resp => {
            if (resp.status === 304) {
                setUserInfo({});
                navigate('/home', { replace: true })
            }
        })
    }

    const value = [userInfo, setUserInfo, login, logout]

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}

export default AuthProvider;