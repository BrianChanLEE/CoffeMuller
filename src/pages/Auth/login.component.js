import React, {useState, useRef} from "react";
import {useNavigate} from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../../services/Auth/auth.service";


const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                필수 입력 항목입니다.
            </div>
        );
    }
};

const Login = () => {
    const form = useRef();
    const checkBtn = useRef();

    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Pwd, setPwd] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);


    const navigate = useNavigate();


    const onChangeName = (e) => {
        const Name = e.target.value;
        setName(Name);
    };

    const onChangeEmail = (e) => {
        const Email = e.target.value;
        setEmail(Email);
    }

    const onChangePwd = (e) => {
        const Pwd = e.target.value;
        setPwd(Pwd);
    }

    const handleLogin = (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            AuthService.login(Name, Email, Pwd)
                .then(() => {
                        navigate("/profile");
                        window.location.reload();
                    },
                    (error) => {
                        const resMessage =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString();

                        setLoading(false);
                        setMessage(resMessage);
                    }
                );
        } else {
            setLoading(false);
        }
    };


    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />

                <Form onSubmit={handleLogin} ref={form}>
                    <div className="form-group">
                        <label htmlFor="Name">Name</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="Name"
                            value={Name}
                            onChange={onChangeName}
                            validations={[required]}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="Email">Email</label>
                        <Input
                            type="email"
                            className="form-control"
                            name="Email"
                            value={Email}
                            onChange={onChangeEmail}
                            validations={[required]}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="Pwd">Pwd</label>
                        <Input
                            type="password"
                            className="form-control"
                            name="Pwd"
                            value={Pwd}
                            onChange={onChangePwd}
                            validations={[required]}
                        />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary btn-block" disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Login</span>
                        </button>
                    </div>

                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{display: "none"}} ref={checkBtn}/>
                </Form>
            </div>
        </div>
    );
};

export default Login;