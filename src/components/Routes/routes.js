import {
  LOGIN_ROUTE,
  PRIVATE_MAIN_ROUTE,
  PROFILE_ROUTE,
} from "../../utils/consts";
import uuid from "react-uuid";
import Login from "../../pages/Login/Login";
import MainPage from "../../pages/MainPage/MainPage";
import Profile from "../Profile/Profile";

export const publicRoutes = [
  {
    id: uuid(),
    path: LOGIN_ROUTE,
    element: <Login />,
  },
];

export const privateRoutes = [
  {
    id: uuid(),
    path: PRIVATE_MAIN_ROUTE,
    element: <MainPage />,
  },
  {
    id: uuid(),
    path: PROFILE_ROUTE,
    element: <Profile />,
  },
];
