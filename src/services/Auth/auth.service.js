import TokenService from "../Token/token.service";
import api from "../Token/api";


class AuthService {
    login(Name, Email, Pwd) {
        return api
            .post("/auth/signin", {
                Name,
                Email,
                Pwd,
            })
            .then((response) => {
                if (response.data.accessToken) {
                    TokenService.setUser(response.data);
                }
                return response.data;
            });
    };

    logout() {
        TokenService.removeUser();
    }

    register(Name, Email, Pwd, Longitude, Latitude, Mobile) {
        return api.post("/auth/signup", {
            Name,
            Email,
            Pwd,
            Longitude,
            Latitude,
            Mobile,
        });
    };

    getCurrentUser() {
        return TokenService.getUser();
    };
}


export default AuthService;
