import {createBrowserRouter} from 'react-router-dom'

// import pages
import Login from "../views/Login.jsx";
import Surveys from "../views/Surveys.jsx";
import Signup from "../views/Signup.jsx";
import GuestLayout from "../Layouts/GuestLayout.jsx";
import DefaultLayout from "../Layouts/DefaultLayout.jsx";
import Dashboard from "../views/Dashboard.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout/>,
    children: [
      {
        path: '/',
        element: <Dashboard/>
      },
      {
        path: '/surveys',
        element: <Surveys/>
      }
    ]
  },
  {
    path: '/',
    element: <GuestLayout/>,
    children: [
      {
        path: 'login',
        element: <Login/>
      },
      {
        path: 'signup',
        element: <Signup/>
      },
    ]
  },
]);

export default router;
