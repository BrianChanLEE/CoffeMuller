
import NoticeDataService from "../../services/Notice/Notice.Service";
import {useEffect, useState} from "react";

const Notice = props => {
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

    const updatePublished = status => {
        const data = {
            id: currentNotice.id,
            Subject: currentNotice.Subject,
            Contents: currentNotice.Contents,
            StartDate: currentNotice.StartDate,
            EndDate: currentNotice.EndDate,
            published: status
        };

        NoticeDataService.update(currentNotice.id, data)
            .then(response => {
                setCurrentNotice({ ...currentNotice, published: status });
                console.log(response.data);
                setMessage("성공적으로 업데이트되었습니다!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const updateNotiece = () => {
        NoticeDataService.update(currentNotice.id, currentNotice)
            .then(response => {
                console.log(response);

                setMessage("공지사항이 성공적으로 업데이트되었습니다!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const removeNotice = () => {
        NoticeDataService.remove(currentNotice.id)
            .then(response => {
                console.log(response.data);
                props.history.push("/Notices");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            {currentNotice ? (
                <div className="edit-form">
                    <h4>공지사항</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">주제</label>
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
                            <label htmlFor="Contents">컨텐츠</label>
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
                            <label htmlFor="StartDate">시작일자</label>
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
                            <label htmlFor="EndDate">종료일자</label>
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
                                <strong>상태:</strong>
                            </label>
                            {currentNotice.published ? "Published" : "Pending"}
                        </div>
                    </form>

                    {currentNotice.published ? (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => updatePublished(false)}
                        >
                            비공개
                        </button>
                    ) : (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => updatePublished(true)}
                        >
                            공개
                        </button>
                    )}

                    <button className="badge badge-danger mr-2" onClick={removeNotice}>
                        삭제
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateNotiece}
                    >
                        업데이트
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>공지사항을 클릭해주세요</p>
                </div>
            )}
        </div>
);
};

export default Notice;
