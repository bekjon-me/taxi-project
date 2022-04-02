import React, { useContext, useEffect, useState, useRef } from "react";
import "./MainPage.scss";
import bg from "../../assets/images/header_main.jpg";
import { Context } from "../..";
import { useAuthState } from "react-firebase-hooks/auth";
import Footer from "../../components/Footer/Footer";
import FlipMove from "react-flip-move";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Loader from "../../components/Loader/Loader";
import { BiPhoneCall, BiCar } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from "react-icons/ai";

const MainPage = () => {
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);
  const [driversList, loading] = useCollectionData(
    firestore.collection("driversList").orderBy("cost")
  );
  const [data, setData] = useState(null);

  const setAllDatas = () => {
    setData(driversList);
  };
  useEffect(() => {
    setAllDatas();
  }, []);

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
    setData([...driversList]);
  };

  if (loading) {
    return <Loader />;
  }

  return driversList ? (
    <div className="header">
      <img src={bg} alt="Taxi header jpg" />
      <div className="overlay-best-driver">
        <div className="container">
          <div className="card mb-3" style={{ maxWidth: "940px" }}>
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
          {driversList?.map(
            ({
              carName,
              cost,
              email,
              photoURL,
              name,
              phoneNumber,
              carPhoto,
              id,
              likes,
            }) => {
              return (
                <div key={id}>
                  <div className="col">
                    <div className="card bg-light shadow m-1">
                      <div className="d-flex">
                        <div
                          className={
                            "w-100 mx-0 d-flex justify-content-center align-items-center"
                          }
                        >
                          <img
                            src={photoURL}
                            className="card-img-top p-0"
                            alt="userImg"
                            style={{
                              borderRadius: "10px",
                              maxWidth: "90%",
                              position: "relative",
                              height: "auto",
                              boxShadow: "0 10px 10px -5px",
                              margin: "10px auto",
                            }}
                          />
                        </div>
                        <div
                          className={
                            "w-100 d-flex justify-content-center align-items-center"
                          }
                        >
                          <img
                            src={carPhoto}
                            className="card-img-top p-0"
                            alt="carImg"
                            style={{
                              borderRadius: "10px",
                              maxWidth: "90%",
                              position: "relative",
                              height: "auto",
                              margin: "10px auto",
                              boxShadow: "0 10px 10px -5px",
                            }}
                          />
                        </div>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title text-center">{name}</h5>
                        <p className="card-text">
                          This is a longer card with supporting text below as a
                          natural lead-in to additional content. This content is
                          a little bit longer
                        </p>
                        <div
                          className="bg-primary text-white rounded p-2"
                          style={{
                            minHeight: "10rem",
                          }}
                        >
                          <div className="w-100 my-2">
                            <span className="card-text mx-2">{cost}</span>{" "}
                            <span
                              className="position-absolute"
                              style={{ right: "30px" }}
                            >
                              <div className="text-white p-1">
                                <span className="mx-1">{likes}</span>
                                {/* <AiFillLike
                                  className="mx-1"
                                  role={"button"}
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title="Like"
                                /> */}
                                <AiOutlineLike
                                  className="mx-1"
                                  role={"button"}
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title="Like"
                                />
                                {/* <AiFillDislike
                                  role={"button"}
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title="Dislike"
                                /> */}
                                <AiOutlineDislike
                                  role={"button"}
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title="Dislike"
                                />
                              </div>
                            </span>
                          </div>
                          <div className="w-100 my-1">
                            <span className="card-text mx-2">
                              {phoneNumber}
                            </span>{" "}
                            <span
                              className="position-absolute"
                              style={{ right: "30px" }}
                            >
                              <a
                                href={`tel: ${phoneNumber}`}
                                className="text-white bg-info p-1 rounded"
                              >
                                <BiPhoneCall />
                              </a>
                            </span>
                          </div>
                          <div className="w-100 my-1">
                            <span className="card-text mx-2">{carName}</span>{" "}
                            <span
                              className="position-absolute"
                              style={{ right: "30px" }}
                            >
                              <a className="text-white bg-info p-1 rounded">
                                <BiCar />
                              </a>
                            </span>
                          </div>
                          <div className="w-100 my-1">
                            <span className="card-text mx-2">{email}</span>{" "}
                            <span
                              className="position-absolute"
                              style={{ right: "30px" }}
                            >
                              <a
                                href={`mailto: ${email}`}
                                className="text-white bg-info p-1 rounded"
                              >
                                <MdEmail />
                              </a>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </FlipMove>
      </div>
      <hr style={{ border: "2px solid #000" }} />
      <Footer />
    </div>
  ) : (
    <Loader />
  );
};
export default MainPage;
