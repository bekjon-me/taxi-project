import React, {useContext, useEffect, useState} from "react";
import "./MainPage.scss";
import bg from "../../assets/images/header_main.jpg";
import {Context} from "../..";
import {useAuthState} from "react-firebase-hooks/auth";
import Footer from "../../components/Footer/Footer";
import FlipMove from "react-flip-move";
import {useCollectionData} from "react-firebase-hooks/firestore";
import Loader from "../../components/Loader/Loader";
import uuid from "react-uuid";

const MainPage = () => {
        const {auth, firestore} = useContext(Context);
        const [user] = useAuthState(auth);
        const [driversList, loading] = useCollectionData(
            firestore.collection("driversList").orderBy("cost")
        )
        const [data, setData] = useState(null);
        const setAllDatas = () => {
            setData(driversList)
        }
        useEffect(() => {
            setAllDatas()
        }, [])


        const sortByName = (e) => {
            if (e === "byCost") {
                driversList.sort(function (a, b) {
                    return a.cost - b.cost;
                });
            } else if (e === "byName") {
                driversList.sort(function (a, b) {
                    return a.name.localeCompare(b.name);
                });
            } else {
                driversList.sort(function (a, b) {
                    return a.carName.localeCompare(b.carName);
                });
            }
            setData([...driversList])
        };


        if (loading) {
            return <Loader/>
            document.body.style.opacity = "0.1";
        }

        return (
            driversList ? (<div className="header">
                <img src={bg} alt="Taxi header jpg"/>
                <div className="overlay-best-driver">
                    <div className="container">
                        <div className="card mb-3" style={{maxWidth: "940px"}}>
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img
                                        src={data}
                                        className="img-fluid rounded-start"
                                        alt="userImg"
                                    />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">Card title</h5>
                                        <p className="card-text">
                                            This is a wider card with supporting text below as a natural
                                            lead-in to additional content. This content is a little bit
                                            longer.
                                        </p>
                                        <p className="card-text">
                                            <small className="text-muted">
                                                Last updated 3 mins ago
                                            </small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="drivers">
                    <h1 className="text-center mt-3">Mavjud haydovchilar ro'yxati</h1>
                    <div className="w-50 mx-auto">
                        <select
                            id="select_drivers"
                            className="form-select w-70 mb-5"
                            onChange={(e) => sortByName(e.target.value)}
                            defaultValue={"byCost"}
                        >
                            <option value="byCost">Sort by cost (cheap to expensive)</option>
                            <option value="byName">
                                Sort by diver's name (alphabetically)
                            </option>
                            <option value="byCarName">Sort by car name (alphabetically)</option>
                        </select>
                    </div>
                    <FlipMove className="row row-cols-1 row-cols-md-3 g-4" id="driversCard">
                        {driversList?.map(({carName, cost, email, photoURL, name, phoneNumber, carPhoto}) => {
                            return (
                                <div key={uuid()}>
                                    <div className="col">
                                        <div className="card">
                                            <div className="d-flex">
                                                <div
                                                    className={"w-100 mx-0 d-flex justify-content-center align-items-center"}>
                                                    <img src={photoURL} className="card-img-top p-0"
                                                         alt="userImg" style={{
                                                        borderRadius: "10px",
                                                        maxWidth: "90%",
                                                        position: "relative",
                                                        height: "auto",
                                                        boxShadow: "0 10px 10px -5px",
                                                        margin: "10px auto"
                                                    }}
                                                    />
                                                </div>
                                                <div className={"w-100 d-flex justify-content-center align-items-center"}>
                                                    <img src={carPhoto} className="card-img-top p-0" alt="carImg"
                                                         style={{
                                                             borderRadius: "10px",
                                                             maxWidth: "90%",
                                                             position: "relative",
                                                             height: "auto",
                                                             margin: "10px auto",
                                                             boxShadow: "0 10px 10px -5px"
                                                         }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <h5 className="card-title text-center">{name}</h5>
                                                <p className="card-text">
                                                    This is a longer card with supporting text below as a
                                                    natural lead-in to additional content. This content is a
                                                    little bit longer.{" "}
                                                    {email + phoneNumber + " " + cost + " " + carName}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </FlipMove>
                </div>
                <hr style={{border: "2px solid #000"}}/>
                <Footer/>
            </div>) : (<Loader/>)
        );
    }
;

export default MainPage;
