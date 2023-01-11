import http from "../http-common";

const getAll = () => {
    return http.get("/Notices");
};

const get = id => {
    return http.get(`/Notices/${id}`);
};

const create = data => {
    return http.post("/Notices", data);
};

const update = (id, data) => {
    return http.put(`/Notices/${id}`, data);
};

const remove = id => {
    return http.delete(`/Notices/${id}`);
};

const removeAll = () => {
    return http.delete(`/Notices`);
};

const findBySubject = Subject => {
    return http.get(`/Notices?Subject=${Subject}`);
};

const TutorialService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findBySubject
};

export default TutorialService;