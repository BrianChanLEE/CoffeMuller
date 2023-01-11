import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateNotice, deleteNotice } from "../../actions/notice";
import NoticeDataService from "../../services/Notice/Notice.Service";

const Notice = (props) => {
    const initialNoticeState = {
        id: null,
        Subject: "",
        Contents: "",
        StartDate: "",
        EndDate: "",
        published: false
    };
    const [currentNotice, setCurrentNotice] = useState(initialNoticeState);
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();

    const getNotice = id => {
        NoticeDataService.get(id)
            .then(response => {
                setCurrentNotice(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getNotice(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentNotice({ ...currentNotice, [name]: value });
    };

    const updateStatus = status => {
        const data = {
            id: currentNotice.id,
            Subject: currentNotice.Subject,
            Contents: currentNotice.Contents,
            StartDate: currentNotice.StartDate,
            EndDate: currentNotice.EndDate,
            published: status
        };

        dispatch(updateNotice(currentNotice.id, data))
            .then(response => {
                console.log(response);

                setCurrentNotice({ ...currentNotice, published: status });
                setMessage("The status was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const updateContent = () => {
        dispatch(updateNotice(currentNotice.id, currentNotice))
            .then(response => {
                console.log(response);

                setMessage("The notice was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const removeNotice = () => {
        dispatch(deleteNotice(currentNotice.id))
            .then(() => {
                props.history.push("/Notice");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            {currentNotice ? (
                <div className="edit-form">
                    <h4>Notice</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Subject</label>
                            <input
                                type="text"
                                className="form-control"
                                id="Subject"
                                name="Subject"
                                value={currentNotice.Subject}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Contents">Contents</label>
                            <input
                                type="text"
                                className="form-control"
                                id="Contents"
                                name="Contents"
                                value={currentNotice.Contents}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="StartDate">StartDate</label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                id="StartDate"
                                required
                                value={currentNotice.StartDate}
                                onChange={handleInputChange}
                                name="StartDate"
                            />
                        </div>



                        <div className="form-group">
                            <label htmlFor="EndDate">EndDate</label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                id="EndDate"
                                required
                                value={currentNotice.EndDate}
                                onChange={handleInputChange}
                                name="EndDate"
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <strong>Status:</strong>
                            </label>
                            {currentNotice.published ? "Published" : "Pending"}
                        </div>
                    </form>

                    {currentNotice.published ? (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => updateStatus(false)}
                        >
                            UnPublish
                        </button>
                    ) : (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => updateStatus(true)}
                        >
                            Publish
                        </button>
                    )}

                    <button className="badge badge-danger mr-2" onClick={removeNotice}>
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateContent}
                    >
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a Notice...</p>
                </div>
            )}
        </div>
);
};

export default Notice;
