import React, { useState} from "react";
import NoticeService from "../../services/Notice/Notice.Service";


const AddNotice = () => {
    const initialNoticeState = {
        id: null,
        Subject: "",
        Contents: "",
        StartDate: "",
        EndDate: "",
        published: false
    };
    const [notice, setNotice] = useState(initialNoticeState);
    const [submitted, setSubmitted] = useState(false);


    const handleInputChange = event => {
        const { name, value } = event.target;
        setNotice({ ...notice, [name]: value });
    };

    const saveNotice = () => {
        let data = {
            Subject: notice.Subject,
            Contents: notice.Contents,
            StartDate: notice.StartDate,
            EndDate: notice.EndDate
        };

        NoticeService.create(data)
            .then(response => {
                setNotice({
                    id: response.data.id,
                    Subject: response.data.Subject,
                    Contents: response.data.Contents,
                    StartDate: response.data.StartDate,
                    EndDate: response.data.EndDate,
                    published: response.data.published
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newNotice = () => {
        setNotice(initialNoticeState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>성공적으로 추가했습니다!</h4>
                    <button className="btn btn-success" onClick={newNotice}>
                        추가
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="Subject">주제</label>
                        <input
                            type="text"
                            className="form-control"
                            id="Subject"
                            required
                            value={notice.Subject}
                            onChange={handleInputChange}
                            name="Subject"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="Contents">컨텐츠</label>
                        <input
                            type="text"
                            className="form-control"
                            id="Contents"
                            required
                            value={notice.Contents}
                            onChange={handleInputChange}
                            name="Contents"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="StartDate">시작일자</label>
                        <input
                            type="datetime-local"
                            className="form-control"
                            id="StartDate"
                            required
                            value={notice.StartDate}
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
                            value={notice.EndDate}
                            onChange={handleInputChange}
                            name="EndDate"
                        />
                    </div>



                    <button onClick={saveNotice} className="btn btn-success">
                        추가하기
                    </button>
                </div>
            )}
        </div>

);
};

export default AddNotice;