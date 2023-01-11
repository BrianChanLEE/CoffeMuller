import {
    CREATE_NOTICE,
    RETRIEVE_NOTICES,
    UPDATE_NOTICE,
    DELETE_NOTICE,
    DELETE_ALL_NOTICES
} from './types'

import NoticeService from "../services/Notice/Notice.Service";

export const createNotice = (Subject, Contents, StartDate, EndDate) => async (dispatch) => {
    try {
        const res = await NoticeService.create({Subject, Contents, StartDate, EndDate});

        dispatch({
            type: CREATE_NOTICE,
            payload: res.data,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const retrieveNotices = () => async (dispatch) => {
    try {
        const res = await NoticeService.getAll();
        dispatch({
            type:  RETRIEVE_NOTICES,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const updateNotice = (id,data) => async (dispatch) => {
    try {
        const res = await NoticeService.update(id,data);
        dispatch({
            type:  UPDATE_NOTICE,
            payload: res.data,
        });
        return Promise.resolve(res.data);
    }catch(err) {
        return Promise.reject(err);
    }
};

export const deleteNotice = (id) => async (dispatch) => {
    try {
        await NoticeService.remove(id);

        dispatch({
            type:  DELETE_NOTICE,
            payload: { id },
        });
    } catch (err) {
        console.log(err);
    }
};

export const deleteAllNotices = () => async (dispatch) => {
    try {
        const res = await NoticeService.removeAll();

        dispatch({
            type: DELETE_ALL_NOTICES,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const findNoticesBySubject = (Subject) => async (dispatch) => {
    try {
        const res = await NoticeService.findBySubject(Subject);

        dispatch({
            type:  RETRIEVE_NOTICES,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};