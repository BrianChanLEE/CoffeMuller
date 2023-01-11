import {
    CREATE_NOTICE,
    RETRIEVE_NOTICES,
    UPDATE_NOTICE,
    DELETE_NOTICE,
    DELETE_ALL_NOTICES
} from "../actions/types"

const initialState = [];

function noticeReducer(Notices = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case CREATE_NOTICE:
            return [...Notices, payload];

        case RETRIEVE_NOTICES:
            return payload;

        case UPDATE_NOTICE:
            return Notices.map((notice) => {
                if (notice.id === payload.id) {
                    return {
                        ...notice,
                        ...payload,
                    };
                } else {
                    return notice;
                }
            });

        case DELETE_NOTICE:
            return Notices.filter(({id}) => id !== payload.id);

        case DELETE_ALL_NOTICES:
            return [];

        default:
            return Notices;
    }
};

export default noticeReducer;
