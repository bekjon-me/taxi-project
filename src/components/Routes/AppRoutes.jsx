import React, { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Context } from "../..";
import Header from "../../containers/Header/Header";
import Navbar from "../Navbar/Navbar";
import { privateRoutes, publicRoutes } from "./routes";

const AppRouter = () => {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);
  return (
    <>
      {user ? ( 
        <Router>
          <Navbar />
          <Routes>
            {privateRoutes.map(({ id, path, element }) => (
              <Route path={path} element={element} key={id} />
            ))}
            <Route path="" element={<Header />} />
            <Route path="*" element={<Navigate to="main" />} />
          </Routes>
        </Router>
      ) : (
        <Router>
          <Navbar />
          <Routes>
            {publicRoutes.map(({ id, path, element }) => (
              <Route path={path} element={element} key={id} />
            ))}
            <Route path="" element={<Header />} />
            <Route path="*" element={<Navigate to="login" />} />
          </Routes>
        </Router>
      )}
    </>
  );
};

export default AppRouter;
