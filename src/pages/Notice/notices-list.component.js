import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    retrieveNotices,
    findNoticesBySubject,
    deleteAllNotices,
} from "../../actions/notice";
import {Link} from "react-router-dom";


const NoticesList = () => {
    const [currentNotice, setCurrentNotice] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchSubject, setSearchSubject] = useState("");

    const notices = useSelector(state => state.notices);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(retrieveNotices);
    }, []);

    const onChangeSearchSubject = e => {
        const searchSubject = e.target.value;
        setSearchSubject(searchSubject);

    };
    console.log(onChangeSearchSubject)

    const refreshData = () => {
        setCurrentNotice(null);
        setCurrentIndex(-1);
    };

    const setActiveNotice = (notice, index) => {
        setCurrentNotice(notice);
        setCurrentIndex(index);
    };

    const removeAllNotices = () => {
        dispatch(deleteAllNotices())
            .then(response => {
                console.log(response);
                refreshData();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findBySubject = () => {
        refreshData();
        dispatch(findNoticesBySubject(searchSubject));
    };

    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Subject"
                        value={searchSubject}
                        onChange={onChangeSearchSubject}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findBySubject}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <h4>Notice List</h4>

                <ul className="list-group">
                    {notices &&
                        notices.map((notice, index) => (
                            <li
                                className={
                                    "list-group-item " + (index === currentIndex ? "active" : "")
                                }
                                onClick={() => setActiveNotice(notice, index)}
                                key={index}
                            >
                                {notice.Subject}
                            </li>
                        ))}
                </ul>

                <button
                    className="m-3 btn btn-sm btn-danger"
                    onClick={removeAllNotices}
                >
                    Remove All
                </button>
            </div>
            <div className="col-md-6">
                {currentNotice ? (
                    <div>
                        <h4>Notice</h4>
                        <div>
                            <label>
                                <strong>Subject:</strong>
                            </label>{" "}
                            {currentNotice.Subject}
                        </div>
                        <div>
                            <label>
                                <strong>Contents:</strong>
                            </label>{" "}
                            {currentNotice.Contents}
                        </div>
                        <div>
                            <label>
                                <strong>Status:</strong>
                            </label>{" "}
                            {currentNotice.published ? "Published" : "Pending"}
                        </div>

                        <Link
                            to={"/Notices/" + currentNotice.id}
                            className="badge badge-warning"
                        >
                            Edit
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br/>
                        <p>Please click on a Notice...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NoticesList;