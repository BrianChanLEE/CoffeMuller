import axios from "axios";

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

const logout = () => {
    localStorage.removeItem("user");
};

const auths = {
    register,
    login,
    logout
}

export default auths