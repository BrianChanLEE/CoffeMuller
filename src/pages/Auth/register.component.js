import React, {useState, useRef} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {isEmail} from "validator";


import AuthService from "../../services/Auth/auth.service";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                필수 입력 항목입니다!
            </div>
        );
    }
};

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                유효한 이메일이 아닙니다.
            </div>
        );
    }
};

const vName = (value) => {
    if (value.length < 2 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                사용자 이름은 3~20자 사이여야 합니다.
            </div>
        );
    }
};

const vPwd = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                비밀번호는 6~40자리 사이여야 합니다.
            </div>
        );
    }
};

const vLongitude = (value) => {
    if (value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                필수 입력 항목입니다!
            </div>
        );
    }
};

const vLatitude = (value) => {
    if (value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                필수 입력 항목입니다!
            </div>
        );
    }
};

const vMobile = (value) => {
    if (value.length > 11) {
        return (
            <div className="alert alert-danger" role="alert">
                -를 빼고 11자리수 여야 합니다.
            </div>
        );
    }
};


const Register = (props) => {
    const form = useRef();
    const checkBtn = useRef();

    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Message, setMessage] = useState("");
    const [Pwd, setPwd] = useState("");
    const [Mobile, setMobile] = useState("");
    const [Longitude, setLongitude] = useState("");
    const [Latitude, setLatitude] = useState("");
    const [successful, setSuccessful] = useState(false);

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
    };

    const onChangeLongitude = (e) => {
        const Longitude = e.target.value;
        setLongitude(Longitude);
    };

    const onChangeLatitude = (e) => {
        const Latitude = e.target.value;
        setLatitude(Latitude);
    };

    const onChangeMobile = (e) => {
        const Mobile = e.target.value;
        setMobile(Mobile);
    };


    const handleRegister = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            AuthService.register(Name, Email, Pwd, Mobile)
                .then((response) => {
                        setMessage(response.data.message);
                        setSuccessful(true);
                    },
                    (error) => {
                        const resMessage =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString();

                        setMessage(resMessage);
                        setSuccessful(false);
                    }
                );
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

                <Form onSubmit={handleRegister} ref={form}>
                    {!successful && (
                        <div>
                            <div className="form-group">
                                <label htmlFor="Name">Name</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="Name"
                                    value={Name}
                                    onChange={onChangeName}
                                    validations={[required, vName]}
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
                                    validations={[required, validEmail]}
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
                                    validations={[required, vPwd]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="Mobile">Mobile</label>
                                <Input
                                    type="tel"
                                    className="form-control"
                                    name="Mobile"
                                    value={Mobile}
                                    onChange={onChangeMobile}
                                    validations={[required,vMobile]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="Latitude">Latitude</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="Latitude"
                                    value={Latitude}
                                    onChange={onChangeLatitude}
                                    validations={[required,vLatitude]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="Longitude">Longitude</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="Longitude"
                                    value={Longitude}
                                    onChange={onChangeLongitude}
                                    validations={[required,vLongitude]}
                                />

                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary btn-block">Sign Up</button>
                            </div>

                        </div>
                    )}

                    {Message && (
                        <div className="form-group">
                            <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                                {Message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{display: "none"}} ref={checkBtn}/>
                </Form>
            </div>
        </div>
    );
};

export default Register;