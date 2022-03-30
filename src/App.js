import React, { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from ".";
import Loader from "./components/Loader/Loader";
import AppRouter from "./components/Routes/AppRoutes";

function App() {
  const { auth } = useContext(Context);
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return <Loader />;
  }
  return <AppRouter />;
}

export default App;
