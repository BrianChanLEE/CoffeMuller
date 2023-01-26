import React, { useState, useEffect } from "react";
import { Routes, Route, Link, } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";


import Login from "./pages/Auth/login.component";
import Register from "./pages/Auth/register.component";
import Home from "./pages/Auth/home.component";
import Profile from "./pages/Auth/profile.component";
import BoardUser from "./pages/Auth/board-user.component";
import BoardModerator from "./pages/Auth/board-moderator.component";
import BoardAdmin from "./pages/Auth/board-admin.component";
import Notice from "./pages/Notice/notice.component";
import AddNotice from "./pages/Notice/add-notice.component";
// import NoticesList from "./pages/Notice/notices-list.component";
import NoticesTabel from "./pages/Notice/notices-Table.component";




import AuthService from "./services/Auth/auth.service";
import EventBus from "./common/eventBus";



const App = () => {
    // const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [isLoggedIn, setisLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
            // setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
            setisLoggedIn(user)
        }

        EventBus.on("logout", () => {
            logOut();
        });

        return () => {
            EventBus.remove("logout");
        };
    }, []);

    const logOut = () => {
        AuthService.logout()
        // setShowModeratorBoard(false);
        setShowAdminBoard(false);
        setCurrentUser(undefined);
    };

    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to={"/"} className="navbar-brand">
                    CooffeMuller
                </Link>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/home"} className="nav-link">
                            Home
                        </Link>
                    </li>

                    {isLoggedIn &&
                    <>
                    </>
                    }

                    {/*<li className="nav-item">*/}
                    {/*    <Link to={"/Notices"} className="nav-link">*/}
                    {/*        Notice*/}
                    {/*    </Link>*/}
                    {/*</li>*/}

                    {/*{showModeratorBoard && (*/}
                    {/*    <li className="nav-item">*/}
                    {/*        <Link to={"/mod"} className="nav-link">*/}
                    {/*            Moderator Board*/}
                    {/*        </Link>*/}
                    {/*    </li>*/}

                    {/*)}*/}

                    {showAdminBoard && (
                        <li className="nav-item">
                            <Link to={"/admin"} className="nav-link">
                                Admin Board
                            </Link>
                        </li>

                    )&&(
                        <li className="nav-item">
                        <Link to={"/add"} className="nav-link">
                        Add
                        </Link>
                        </li>

                    )}

                    {currentUser && (
                        <li className="nav-item">
                            <Link to={"/user"} className="nav-link">
                                User
                            </Link>
                        </li>

                    )
                    }
                </div>


                {currentUser ? (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/profile"} className="nav-link">
                                {currentUser.Name}
                            </Link>
                        </li>

                        <li className="nav-item">
                            <a href="/login" className="nav-link" onClick={logOut}>
                                LogOut
                            </a>
                        </li>
                    </div>
                ) : (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">


                            <Link to={"/login"} className="nav-link">
                                Login
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/register"} className="nav-link">
                                Sign Up
                            </Link>
                        </li>
                    </div>
                )}
            </nav>

            <div className="container mt-3">
                <Routes >
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    {/*<Route path="/Notices" element={<NoticesList />} />*/}
                    <Route path="/Notices" element={<NoticesTabel />} />
                    <Route path="/add" element={<AddNotice/>} />
                    <Route path="/Notices/:id" element={<Notice />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/user" element={<BoardUser />} />
                    <Route path="/mod" element={<BoardModerator />} />
                    <Route path="/admin" element={<BoardAdmin />} />
                </Routes>
            </div>

        </div>
    );
};

export default App;