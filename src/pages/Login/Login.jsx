import React, {useContext, useEffect, useState} from "react";
import {Context} from "../..";
import "./Login.scss";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from "react-router-dom";
import {doc, setDoc} from "firebase/firestore"
import uuid from "react-uuid"
import {getDownloadURL, ref} from "firebase/storage"
import {
    createUserWithEmailAndPassword,
    FacebookAuthProvider,
    GoogleAuthProvider,
    RecaptchaVerifier,
    signInWithPhoneNumber,
    signInWithPopup,
} from "firebase/auth";

const Login = () => {
    const {auth, firestore, storage} = useContext(Context);
    const [phoneEmail, setPhoneEmail] = useState("");
    const [recaptcha, setRecaptcha] = useState(false);
    const [code, setCode] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [loginMethod, setLoginMethod] = useState("email");
    const [carPhotoURL, setCarPhotoURL] = useState(null)
    let navigate = useNavigate();

    const setMethod = () => {
        if (loginMethod === "email") {
            setLoginMethod("number");
        } else {
            setLoginMethod("email");
        }
    };

    const db = firestore;

    const LoginWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                toast.success("Logged in successfully");

                const docData = {
                    id: uuid(),
                    cost: 10000,
                    phoneNumber: user?.phoneNumber ? user?.phoneNumber : "kiritilmagan",
                    carName: "kiritilmagan",
                    name: user?.displayName,
                    email: user?.email,
                    photoURL: user.photoURL ? user.photoURL : "https://firebasestorage.googleapis.com/v0/b/taxi-project-bekjon.appspot.com/o/avatars%2Favatar.webp?alt=media&token=ce091c4d-9267-4f85-b8ab-9d39579959e7",
                    carPhoto: "https://firebasestorage.googleapis.com/v0/b/taxi-project-bekjon.appspot.com/o/carPhotos%2Ftaxi.webp?alt=media&token=dbee42d6-9cd5-41b6-9ada-90687639a77f",
                }

                const sendData = async () => {
                    await setDoc(doc(db, "driversList", user?.uid), docData)
                    console.log("success")
                }
                sendData();


                navigate("/main");
                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                toast.error("Opps, something is went wrong, please try again")
                // ...
            });
    };

    const generateRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            {
                size: "invisible",
                callback: (response) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                },
            },
            auth
        );
    };

    const confirmCode = (e) => {
        e.preventDefault();
        window.confirmationResult
            .confirm(code)
            .then((result) => {
                // User signed in successfully.
                const user = result.user;
                alert("success");
            })
            .catch((error) => {
                // User couldn't sign in (bad verification code?)
                console.log(error);
            });
    };

    const LoginWithPhoneOrEmail = (e) => {
        e.preventDefault();
        if (loginMethod === "number") {
            if (rePassword !== password) {
                toast.error("Passwords are not compatible");
            } else {
                let phoneNumber = "+998908702909";
                generateRecaptcha();
                let appVerifier = window.recaptchaVerifier;
                signInWithPhoneNumber(auth, phoneNumber, appVerifier)
                    .then((confirmationResult) => {
                        // SMS sent. Prompt user to type the code from the message, then sign the
                        // user in with confirmationResult.confirm(code).
                        window.confirmationResult = confirmationResult;
                        console.log("sms sent");
                        setRecaptcha(true);
                        // ...
                    })
                    .catch((error) => {
                        // Error; SMS not sent
                        console.log(error);
                    });
            }
        } else {
            if (rePassword !== password) {
                toast.error("Passwords are not compatible");
            } else {
                console.log(auth, email, password);
                createUserWithEmailAndPassword(auth, phoneEmail, password)
                    .then((userCredential) => {
                        // Signed in
                        const user = userCredential.user;
                        alert("success");
                        // ...
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(error.message);
                        // ..
                    });
            }
        }
    };

    const LoginWithFacebook = (e) => {
        e.preventDefault();
        const provider = new FacebookAuthProvider();
        provider.addScope("user_birthday");
        auth.languageCode = "it";
        signInWithPopup(auth, provider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;

                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;
                console.log(user);
                alert("success");
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = FacebookAuthProvider.credentialFromError(error);
                console.log(error.message);
            });
    };

    return (
        <div id="login">
            <form id="login-box" onSubmit={(e) => LoginWithPhoneOrEmail(e)}>
                <div className="left">
                    <h1>Sign up</h1>

                    <input
                        required
                        type="text"
                        name="username"
                        placeholder="Your name"
                        disabled={recaptcha ? true : false}
                    />
                    <input
                        required
                        disabled={recaptcha ? true : false}
                        type="text"
                        name={loginMethod}
                        placeholder={loginMethod}
                        onChange={(e) =>
                            loginMethod === "email"
                                ? setPhoneEmail(e.target.value)
                                : setPhoneEmail(e.target.value)
                        }
                        value={phoneEmail}
                    />
                    <input
                        required
                        type="password"
                        name="password"
                        placeholder="Password"
                        disabled={recaptcha ? true : false}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        required
                        disabled={recaptcha ? true : false}
                        type="password"
                        name="password2"
                        placeholder="Retype password"
                        value={rePassword}
                        onChange={(e) => setRePassword(e.target.value)}
                    />

                    <button
                        disabled={recaptcha ? true : false}
                        id="sign-in-button"
                        type="submit"
                        name="signup_submit"
                    >
                        Sign up
                    </button>
                    <div style={{display: recaptcha ? "block" : "none"}}>
                        <label htmlFor="confirm_code">
                            {phoneEmail} raqamiga yuborilgan 6 xonali kodni kiriting
                        </label>
                        <input
                            type="password"
                            name="confirm_code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                        <button type="button" onClick={(e) => confirmCode(e)}>
                            Tasdiqlash
                        </button>
                    </div>
                </div>

                <div className="right">
          <span className="loginwith">
            Sign in with
            <br/>
            social network
          </span>

                    <button
                        className="social-signin facebook"
                        onClick={(e) => LoginWithFacebook(e)}
                    >
                        Log in with facebook
                    </button>
                    <button className="social-signin twitter" onClick={setMethod}>
                        Login with {loginMethod === "email" ? "number" : "email"}
                    </button>
                    <button className="social-signin google" onClick={LoginWithGoogle}>
                        Log in with Google+
                    </button>
                </div>
                <div className="or">OR</div>
            </form>
            <div id="recaptcha-container"></div>
            <ToastContainer/>
        </div>
    );
};

export default Login;
