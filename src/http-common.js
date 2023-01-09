import axios from "axios";

export default axios.create({
    baseURL: "http://coffeemuller.cafe24app.com/api",
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:8001",
        "Access-Control-Allow-Headers": "Content-Type",
    },
});