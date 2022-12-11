import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import OauthService from "../service/OuthService";
import { useAuth } from "./AuthProvider";

const Login = () => {
    const [searchParams] = useSearchParams();
    const [userInfo, setUserInfo, login] = useAuth();
    const navigate = useNavigate()
    useEffect(() => {

        let code = searchParams.get('code');
        if (code !== null && code !== '' & code !== undefined) {
            getToken(code)
            
        }

    })

    const getToken = (code) => {
        OauthService.getToken(code).then(resp => {
            if (resp.status === 200) {
                let tokens = resp.data
                OauthService.userInfo(resp.data.access_token).then(userRes => {
                    if (resp.status === 200) {
                        let user = userRes.data;
                        setUserInfo({
                            userDetails:user,                                                                                   
                            tokenDetails: tokens
                        })
                        navigate('/profile')
                    }
                }).catch(error => {
                    console.log('error occured while fetching userinfo: ' + error)
                })
            }
            console.log('routing to profile : ' + JSON.stringify(userInfo))

        }).catch(error => {
            console.log('error occured while fetching token info : ' + error)
        })
      
    }

    const onLoignClick = () => {
        login();
    }

    return (
        <div>
            <h5>Login page</h5>
            <button type="button" className="btn btn-primary" onClick={onLoignClick}>Login</button>
        </div>
    )
}


export default Login