import Home from "../pages/Home";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Register from "../pages/Register";
import Quiz from "../pages/Quiz";
import Result from "../pages/Result";
import Answers from "../pages/Answers";
import Topic from "../pages/Topic";
import PrivateRoute from "../components/PrivateRoute";
export const routes = [
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/logout",
    element: <Logout />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/quiz",
        element: <Quiz />
      },
      {
        path: "/answers",
        element: <Answers />
      },
      {
        path: "/result",
        element: <Result />
      },
      {
        path: "/topic",
        element: <Topic />
      },
    ]
  },
]