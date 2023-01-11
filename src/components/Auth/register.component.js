import React, {useState, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {isEmail} from "validator";

import {register} from "../../actions/auth";
// import axios from "axios";

// let state = {
//     createAuthCode: "",
//     authCodeCheck: false
// }
const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                필수 입력 항목입니다.
            </div>
        );
    }
};


const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                올바른 이메일 형식을 입력해주세요.
            </div>
        );
    }
};

const vName = (value) => {
    if (value.length < 2 || value.length > 4) {
        return (
            <div className="alert alert-danger" role="alert">
                2-4자리의 한글 이름만 입력 가능
            </div>
        );
    }
};

const vPwd = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                비밀번호는 8자리 이상 40자리 이하이어야 합니다.
            </div>
        );
    }
};

const Register = () => {
    const form = useRef();
    const checkBtn = useRef();

    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    // const [AuthCode, setAuthCode] = useState("");
    const [Pwd, setPwd] = useState("");
    const [Mobile, setMobile] = useState("");
    const [Longitude, setLongitude] = useState("");
    const [Latitude, setLatitude] = useState("");
    const [successful, setSuccessful] = useState(false);

    const {message} = useSelector(state => state.message);
    const dispatch = useDispatch();

    const onChangeName = (e) => {
        const Name = e.target.value;
        setName(Name);
        console.log("Name: ", Name)
        console.log("setName: ", setName)
    };

    const onChangeEmail = (e) => {
        const Email = e.target.value;
        setEmail(Email);
    };

    // const onChangeAuthCode = (e) => {
    //     const AuthCode = e.target.value;
    //     setAuthCode(AuthCode);
    // }
    const onChangePwd = (e) => {
        const Pwd = e.target.value;
        setPwd(Pwd);
    };

    const onChangeLongitude = (e) => {
        const Longitude = e.target.value;
        setLongitude(Longitude);
        console.log(Longitude)
    };

    const onChangeLatitude = (e) => {
        const Latitude = e.target.value;
        setLatitude(Latitude);
        console.log(Latitude)
    };


    const onChangeMobile = (e) => {
        const Mobile = e.target.value;
        setMobile(Mobile);
    };

    // const onSendMailHandler = (e) => {
    //     e.preventDefault();
    //     state.createAuthCode = Math.random().toString(36).substr(2, 6);
    //
    //     const daataToSubmit = {
    //         email: Email,
    //         auth: state.createAuthCode
    //     }
    //     console.log('authCode = ' + state.createAuthCode)
    //     axios.post('api/auth/signup/sendEmail', daataToSubmit)
    //         .then(response => {
    //             alert('인증코드가 메일이 발송되었습니다.')
    //         })
    // }
    // const onCheckHandler = (e) => {
    //     e.preventDefault();
    //     console.log(state.createAuthCode + " == " + AuthCode)
    //     if (state.createAuthCode === AuthCode) {
    //         state.authCodeCheck = true;
    //         alert("이메일 인증에 성공하셨습니다.")
    //     } else {
    //         state.authCodeCheck = false;
    //         alert("인증 코드가 일치하지 않습니다.")
    //     }
    // }
    const handleRegister = (e) => {
        e.preventDefault();

        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            dispatch(register(Name, Email, Pwd, Mobile))
                .then(() => {
                    setSuccessful(true);
                })
                .catch(() => {
                    setSuccessful(false);
                });
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
                            {/*<Form form style={{display: 'flex', flexDirection: 'column'}}*/}
                            {/*      onSubmit={onSendMailHandler}  ref={form}>*/}
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
                                    {/*<button type="submit">*/}
                                    {/*    send code*/}
                                    {/*</button>*/}
                                </div>
                            {/*</Form>*/}
                            {/*<Form form style={{display: 'flex', flexDirection: 'column'}}*/}
                            {/*      onSubmit={onCheckHandler} ref={form}>*/}
                            {/*    <div className="form-group">*/}
                            {/*        <label htmlFor="AuthCode">AuthCode</label>*/}
                            {/*        <Input*/}
                            {/*            type="text"*/}
                            {/*            className="form-control"*/}
                            {/*            name="AuthCode"*/}
                            {/*            value={AuthCode}*/}
                            {/*            onChange={onChangeAuthCode}*/}
                            {/*            validations={[required]}*/}
                            {/*        />*/}
                            {/*    </div>*/}
                            {/*</Form>*/}
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
                                    validations={[required]}
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
                                    validations={[required]}
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
                                    validations={[required]}
                                />

                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary btn-block">Sign Up</button>
                            </div>

                        </div>
                    )}

                    {message && (
                        <div className="form-group">
                            <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
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

export default Register;