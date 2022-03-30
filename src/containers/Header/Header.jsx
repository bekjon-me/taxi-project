import React, {useEffect, useState} from "react";
import "./Header.scss";
import bgHeader from "../../assets/images/taxi_header.gif";
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";

const Header = () => {
    let isLogin = true;

    let [text, setText] = useState("");
    let i = 0;
    let txt = "Lorem ipsum typing effect!"; /* The text */
    let speed = 100; /* The speed/duration of the effect in milliseconds */

    function typeWriter() {
        if (i < txt.length) {
            setText((text += txt.charAt(i)));
            i++;
            setTimeout(typeWriter, speed);
        }
    }

    useEffect(() => {
        const timer = setTimeout(typeWriter, speed);
        return () => clearTimeout(timer)
    }, []);

    return (
        <header>
            <img className="header_img" src={bgHeader} alt=""/>
            <div className="sidebar-right">
                <h2 data-text="MyTaxi..">MyTaxi...</h2>
                <p>{text}</p>
                <div className="line"></div>
                <h1>Quyidagilardan birini tanlang: 👇</h1>
                <div className="isDriver">
                    {isLogin ? (
                        <Link to="ha" className="btn-link">
                            <Button
                                variant="outlined"
                                style={{backgroundColor: "rgb(41, 207, 41, 0.2)"}}
                            >
                                Haydovchiman
                            </Button>
                        </Link>
                    ) : (
                        <Link to="login" className="btn-link">
                            <Button
                                variant="outlined"
                                style={{backgroundColor: "rgb(41, 207, 41, 0.2)"}}
                            >
                                Haydovchiman
                            </Button>
                        </Link>
                    )}
                    {isLogin ? (
                        <Link to="ha" className="btn-link">
                            <Button
                                variant="outlined"
                                style={{backgroundColor: "rgba(255, 0, 0, 0.623)"}}
                            >
                                Yo'lovchiman
                            </Button>
                        </Link>
                    ) : (
                        <Link to="login" className="btn-link">
                            <Button
                                variant="outlined"
                                style={{backgroundColor: "rgba(255, 0, 0, 0.623)"}}
                            >
                                Yo'lovchiman
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
