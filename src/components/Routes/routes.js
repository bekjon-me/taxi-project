import {
  LOGIN_ROUTE,
  PRIVATE_MAIN_ROUTE,
  PROFILE_ROUTE,
} from "../../utils/consts";
import uuid from "react-uuid";
import SignUp from "../../pages/SignUp/SignUp";
import MainPage from "../../pages/MainPage/MainPage";
import Profile from "../Profile/Profile";

export const publicRoutes = [
  {
    id: uuid(),
    path: LOGIN_ROUTE,
    element: <SignUp />,
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
