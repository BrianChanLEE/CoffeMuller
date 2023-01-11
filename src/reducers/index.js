import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import notice from "./notice";

export default combineReducers({
    auth,
    message,
    notice
});
