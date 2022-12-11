import OauthService from "../service/OuthService";
import { useAuth } from "./AuthProvider";

const Profile = () => {
    const [userInfo, setUserInfo,login, logout] = useAuth();
    const refreshTokenClick = () => {
        OauthService.refreshToken(userInfo.tokenDetails.refresh_token).then(resp => {
            if (resp.status === 200) {
                setUserInfo((prevState) => ({
                    ...prevState, tokenDetails: resp.data
                }))
            }
        }).catch(error => {
            console.log('error occured while fetching userinfo: ' + error)
        })
    }

    const onlogoutClick = () => {
            logout();
    }

    return (
        <div>
            <h5>Welcome : {userInfo.userDetails.given_name+' '+userInfo.userDetails.family_name}</h5>
            <button type="button" className="btn btn-primary" onClick={refreshTokenClick}>Refresh Token</button>      
            {/* <br></br> */}
            <button type="button" className="btn btn-primary" onClick={onlogoutClick}>Logout</button>
        </div>
    )
}

export default Profile;