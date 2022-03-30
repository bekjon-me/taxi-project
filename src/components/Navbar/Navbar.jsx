import React, {useEffect, useState, useContext} from "react";
import "./Navbar.scss";
import background from "../../assets/images/icons/taxi.ico";
import avatar from "../../assets/images/icons/avatar.png";
import {Link, Navigate} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {signOut} from "firebase/auth";
import {Context} from "../../index";
import {toast, ToastContainer} from "react-toastify";
import {GiHamburgerMenu} from "react-icons/gi";
import {MdCancelPresentation} from "react-icons/md";

const Navbar = () => {
    const [navbar, setNavbar] = useState(false);
    const {auth} = useContext(Context);
    const [user] = useAuthState(auth);
    const [toggle, setToggle] = useState(false);

    const changeBackground = () => {
        if (window.scrollY >= 66) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    };
    useEffect(() => {
        changeBackground();
        window.addEventListener("scroll", changeBackground);
    });

    const toggleNavbar = () => {
        setToggle(!toggle)
    };

    const signOutUser = () => {
        signOut(auth)
            .then(() => {
                toast.success("Logged out successfully");
            })
            .catch((error) => {
                toast.error("Opps, something went wrong, please try again");
            });
    };
    return (
        <nav
            className={toggle ? "navbar navbar-expand-lg fixed-top bg-dark" : "navbar navbar-expand-lg fixed-top toggle"}
        >
            <ToastContainer/>
            <div className="container-fluid">
                <button
                    className="navbar-toggler text-white"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarTogglerDemo01"
                    aria-controls="navbarTogglerDemo01"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    onClick={() => toggleNavbar()}
                >
                    <GiHamburgerMenu/>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <a className="navbar-brand" href="#">
                        <img src={background} alt="Taxi logo" width="40px"/>
                    </a>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            {user ? (
                                <a className="nav-link" onClick={signOutUser}>
                                    Chiqish
                                </a>
                            ) : (
                                <Link className="nav-link" to="login">
                                    Kirish / Ro'yxatdan o'tish
                                </Link>
                            )}
                        </li>
                        <li className="nav-item">
                            <Link
                                to="profile"
                                className={user ? "nav-link" : "nav-link disabled"}
                                href="#"
                                tabIndex="-1"
                                aria-disabled="true"
                            >
                                {user ? "Profile" : "Disabled"}
                            </Link>
                        </li>
                    </ul>

                    <div className="profile">
                        <Link to="profile">
                            <img
                                src={user?.photoURL ? user.photoURL : avatar}
                                alt="avatar"
                                style={{
                                    position: "absolute",
                                    right: "20px",
                                    top: "10px",
                                    width: "40px",
                                    background: "#fff",
                                    border: "2px solid #fff",
                                    borderRadius: "50%",
                                    margin: "0 10px",
                                }}
                            />
                        </Link>
                        <span className="tooltiptext">Account</span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
