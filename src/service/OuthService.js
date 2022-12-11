import axios from "axios";
const axiosClient = axios.create({
    timeout: 1000,
});

axiosClient.interceptors.request.use(function (config) {
    console.log('[REQUEST-INTERCEPTOR] ----> : ' + JSON.stringify(config))
    return config;
}, function (error) {
    return Promise.reject(error);
});

const oauthConfig = {
    authUrl: 'http://localhost:8050/auth/realms/playground/protocol/openid-connect/auth',
    clientId: 'sandbox',
    clientSecret: '7S4WvHDrcXr3kiDWCSlxaDN1AK8w5viX',
    redirectUri: 'http://localhost:3000/login',
    tokenUri: 'http://localhost:8050/auth/realms/playground/protocol/openid-connect/token',
    userInfoUri: 'http://localhost:8050/auth/realms/playground/protocol/openid-connect/userinfo',
    logoutUri:'http://localhost:8050/auth/realms/playground/protocol/openid-connect/logout'
}

class OauthService {

    static getAuthUrl = () => {
        return `${oauthConfig.authUrl}?response_type=code&scope=openid&client_id=${oauthConfig.clientId}&redirect_uri=${oauthConfig.redirectUri}`
    }

    static getToken = (code) => {

        const params = new URLSearchParams();
        params.append('grant_type', 'authorization_code');
        params.append('code', `${code}`);
        params.append('redirect_uri', `${oauthConfig.redirectUri}`);
        params.append('client_id', 'sandbox');
        params.append('client_secret', `${oauthConfig.clientSecret}`);
        let config = { headers: { 'content-type': 'application/x-www-form-urlencoded' } }
        return axiosClient.post(oauthConfig.tokenUri, params, config)
    }

    static refreshToken = (refreshToken) => {
        console.log('Refreshing token ')
        const params = new URLSearchParams();
        params.append('grant_type', 'refresh_token');
        params.append('refresh_token', `${refreshToken}`);
        params.append('client_id', 'sandbox');
        params.append('client_secret', `${oauthConfig.clientSecret}`);
        let config = { headers: { 'content-type': 'application/x-www-form-urlencoded' } }
        return axiosClient.post(oauthConfig.tokenUri, params, config)
    }

    static userInfo = (accessToken) => {
        console.log('Fetching user info ' + accessToken)
        let config = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${accessToken}`
            }
        }
        return axiosClient.get(oauthConfig.userInfoUri, config)
    }

    static logout = (accessToken, refreshToken) => {
        const params = new URLSearchParams();
        params.append('refresh_token', `${refreshToken}`);
        params.append('client_id', 'sandbox');
        let config = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${accessToken}`,
                // 'Origin':`${oauthConfig.redirectUri}`
            }
        }
        return axiosClient.post(oauthConfig.logoutUri, params, config)
    }
}

export default OauthService;