import React, { useState} from "react";
import { useDispatch } from "react-redux";
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
    const [Notice, setNotice] = useState(initialNoticeState);
    const [submitted, setSubmitted] = useState(false);

    const dispatch = useDispatch();

    const handleInputChange = event => {
        const { name, value } = event.target;
        setNotice({ ...Notice, [name]: value });
    };

    const saveNotice = () => {
        const { Subject, Contents, StartDate, EndDate} = Notice;

        NoticeService.createNotice(Subject, Contents, StartDate, EndDate)
            .then(data => {
                setNotice({
                    id: data.id,
                    Subject: data.Subject,
                    Contents: data.Contents,
                    StartDate: data.StartDate,
                    EndDate: data.EndDate,
                    published: data.published
                });
                setSubmitted(true);

                console.log(data);
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
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newNotice}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="Subject">Subject</label>
                        <input
                            type="text"
                            className="form-control"
                            id="Subject"
                            required
                            value={Notice.Subject}
                            onChange={handleInputChange}
                            name="Subject"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="Contents">Contents</label>
                        <input
                            type="text"
                            className="form-control"
                            id="Contents"
                            required
                            value={Notice.Contents}
                            onChange={handleInputChange}
                            name="Contents"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="StartDate">StartDate</label>
                        <input
                            type="datetime-local"
                            className="form-control"
                            id="StartDate"
                            required
                            value={Notice.StartDate}
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
                            value={Notice.EndDate}
                            onChange={handleInputChange}
                            name="EndDate"
                        />
                    </div>



                    <button onClick={saveNotice} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>

);
};

export default AddNotice;