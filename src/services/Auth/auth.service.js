

const API_URL = "http://coffeemuller.cafe24app.com/api/auth/";

const register = (Name, Email, Pwd, Longitude, Latitude, Mobile) => {
    return axios.post(API_URL + "signup", {
        Name,
        Email,
        Pwd,
        Longitude,
        Latitude,
        Mobile,
    });
};

const login = (Name, Email, Pwd) => {
    return axios
        .post(API_URL + "signin", {
            Name,
            Email,
            Pwd,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const logOut = () => {
    localStorage.removeItem("user");
    return axios.post(API_URL + "signout").then((response) => {
        return response.data;
    });
};


const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};


const AuthService = {
    register,
    login,
    logOut,
    getCurrentUser,
}

export default AuthService;
