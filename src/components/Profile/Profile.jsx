import React, {useContext, useEffect, useRef, useState} from "react";
import "./Profile.scss";
import {Context} from "../..";
import {useAuthState} from "react-firebase-hooks/auth";
import "firebase/compat/database";
import {BsPencilSquare} from "react-icons/bs";
import avatar from "../../assets/images/icons/avatar.png";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage"
import Loader from "../Loader/Loader";
import LoaderSmall from "../Loader/LoaderSmall";

const Profile = () => {
    const {auth, storage, firestore} = useContext(Context);
    const [user] = useAuthState(auth);
    const [modal, setModal] = useState(false);
    const [carPhoto, setCarPhoto] = useState(null)
    const [url, setUrl] = useState(null)
    const [loading, setLoading] = useState(false)
    const [inputTypeFile, setInputTypeFile] = useState(false)
    const [list, setList] = useState(null);
    const [whichPhoto, setWhichPhoto] = useState("")
    const [avatar, setAvatar] = useState(null);
    const [avatarURL, setAvatarURL] = useState(null);
    const [objKey, setObjKey] = useState(null)

    const inputRef = useRef(null)

    useEffect(() => {
        if (localStorage.getItem("carPhoto")) {
            setUrl(JSON.parse(localStorage.getItem("carPhoto")))
        }
        if (localStorage.getItem("avatar")) {
            setAvatarURL(JSON.parse(localStorage.getItem("avatar")))
        }
        firestore.collection('driversList').doc('' + user?.uid).get().then(function (doc) {
            setList(doc.data())
        });
    }, [firestore, list])


    const changeDates = async (e) => {
        if (e.target.files && whichPhoto === "carPhoto") {
            setCarPhoto(e.target.files[0])
        } else if (e.target.files && whichPhoto === "avatar") {
            setAvatar(e.target.files[0])
        }
    }


    const sendData = async (e) => {
        e.preventDefault()
        if (inputTypeFile) {
            if (carPhoto) {
                setLoading(true)
                const imageRef = ref(storage, `carPhotos/${user.uid}`);
                uploadBytes(imageRef, carPhoto)
                    .then(() => {
                        getDownloadURL(imageRef)
                            .then(url => {
                                setUrl(url)
                                const userData = firestore.collection("driversList").doc(user?.uid)
                                userData.update({carPhoto: url})
                                localStorage.setItem("carPhoto", JSON.stringify(url))
                                setLoading(false)
                                console.log("success")
                            })
                            .catch(error => {
                                console.log(error.message, "error getting the image url")
                            })
                    })
                    .catch(error => {
                        console.log(error.message, "error getting the image url")
                    })
            } else {
                setLoading(true)
                const imageRef = ref(storage, `avatars/${user.uid}`);
                uploadBytes(imageRef, avatar)
                    .then(() => {
                        getDownloadURL(imageRef)
                            .then(url => {
                                setAvatarURL(url)
                                const userData = firestore.collection("driversList").doc(user?.uid)
                                userData.update({photoURL: url})
                                localStorage.setItem("avatar", JSON.stringify(url))
                                setLoading(false)
                                console.log("success")
                            })
                            .catch(error => {
                                console.log(error.message, "error getting the image url")
                            })
                    })
                    .catch(error => {
                        console.log(error.message, "error getting the image url")
                    })
            }
        } else {
            const userData = firestore.collection("driversList").doc(user?.uid)
            userData.update({[objKey]: inputRef.current.value})
            console.log("success")
        }
    }

    const setPhoto = (e) => {
        if (e === "avatar") {
            setWhichPhoto("avatar");
            setModal(true)
            setInputTypeFile(true)
        } else {
            setWhichPhoto("carPhoto");
            setModal(true)
            setInputTypeFile(true)
        }
    };
    const setDates = (e, key) => {
        setModal(true)
        setInputTypeFile(false)
        console.log(e)
        inputRef.current.value = e;
        setObjKey(key)
    }

    if (loading) {
        return <Loader/>
    }


    return (list ? (<>
        <div
            id="profile"
            className="container d-flex justify-content-center align-items-center"
        >
            <div className="card mb-3 w-100" style={{height: "75%"}}>
                <div className="row g-0">
                    <div className="col-md-4" id="profile_img">
                        <img
                            src={avatarURL}
                            className="img-fluid rounded-start"
                            alt="Avatar"
                        />
                        <BsPencilSquare
                            id="changeBtn"
                            onClick={() => setPhoto("avatar")}
                            style={{
                                position: "absolute", left: "1%", top: "3.5%", fontSize: "40px",
                            }}
                        />
                    </div>
                    <div className="col-md-4 bg-light">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <h5 className="card-title ">Name:</h5>
                                <span
                                    className="card-text mx-2"
                                    style={{transform: "translate(0, -10%)"}}
                                >
                    {list.name}
                                    <BsPencilSquare
                                        id="changeBtn"
                                        className="mx-2"
                                        onClick={() => setDates(list.name, "name")}
                                    />
                  </span>
                            </div>
                            <div className="d-flex align-items-center">
                                <h5 className="card-title ">Email:</h5>
                                <span
                                    className="card-text mx-2"
                                    style={{transform: "translate(0, -10%)"}}
                                >
                    {list.email}
                                    <BsPencilSquare
                                        id="changeBtn"
                                        className="mx-2"
                                        onClick={() => setDates(list?.email, "email")}
                                    />
                  </span>
                            </div>
                            <div className="d-flex align-items-center">
                                <h5 className="card-title ">Number:</h5>
                                <span
                                    className="card-text mx-2"
                                    style={{transform: "translate(0, -10%)"}}
                                >
                    {list.phoneNumber}
                                    <BsPencilSquare
                                        id="changeBtn"
                                        className="mx-2"
                                        onClick={() => setDates(list.phoneNumber, "phoneNumber")}
                                    />
                  </span>
                            </div>
                            <div className="d-flex align-items-center">
                                <h5 className="card-title ">Car name:</h5>
                                <span
                                    className="card-text mx-2"
                                    style={{transform: "translate(0, -10%)"}}
                                >
                    {list.carName}
                                    <BsPencilSquare
                                        id="changeBtn"
                                        className="mx-2"
                                        onClick={() => setDates(list.carName, "carName")}
                                    />
                  </span>
                            </div>

                            <p className="card-text">
                                <small className="text-muted">
                                    Profil ma'lumolari (qalamchani bosish orqali o'zgartirish
                                    mumkin)
                                </small>
                            </p>
                        </div>
                    </div>
                    <div className="col-md-4 justify-content-center">
                        {url ? <img
                            id="carPhoto"
                            src={url}
                            alt="userPhoto"
                        /> : <LoaderSmall/>}
                        <BsPencilSquare
                            style={{
                                fontSize: "40px", position: "absolute", top: "4%", right: "1%", cursor: "pointer",
                            }}
                            onClick={() => setPhoto("carPhoto")}
                        />
                    </div>
                </div>
            </div>
        </div>

        <div className={modal ? "modal d-block" : "modal"} tabIndex="-1">
            <div className="modal-dialog">
                <form className="modal-content" onSubmit={sendData}>
                    <div className="modal-header">
                        <h5 className="modal-title">
                            Ma'lumotlarni o'zgartirmoqchimisiz
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={() => setModal(false)}
                        ></button>
                    </div>

                    <div className="modal-body">
                        <input
                            type={inputTypeFile ? "file" : "text"}
                            onChange={(e) => changeDates(e)}
                            ref={inputRef}
                        />
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                            onClick={() => setModal(false)}
                        >
                            Close
                        </button>
                        <button type="submit" className="btn btn-primary" onClick={() => setModal(false)}>
                            Save changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>) : (<Loader/>))
};

export default Profile;
