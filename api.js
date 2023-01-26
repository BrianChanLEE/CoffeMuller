import axios from "axios";
import TokenService from "./token.service";


const instance = axios.create({
    baseURL: "http://coffeemuller.cafe24app.com/api",
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:8001",
        "Access-Control-Allow-Headers": "Content-Type",
    },
});

instance.interceptors.request.use(
    (config) => {
        const token = TokenService.getLocalAccessToken();
        if (token) {
            config.headers["CoffeeMuller-secret-key"] = token;

        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
Remote_CofeeMuller
instance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;

        if (originalConfig.url !== "/auth/signin" && err.response) {
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    const rs = await instance.post("/auth/refreshtoken", {
                        refreshToken: TokenService.getLocalRefreshToken(),
                    });

                    const {accessToken} = rs.data;
                    TokenService.updateLocalAccessToken(accessToken);
                    return instance(orginalConfig);
                } catch (_error) {
                    return Promise.reject(_error);

                }
            }
        }
        return Promise.reject(err);
    }
);
export default instance;