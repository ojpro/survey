import {createBrowserRouter} from 'react-router-dom'

// import pages
import Login from "../views/Login.jsx";
import Dashboard from "../views/Dashboard.jsx";
import Surveys from "../views/Surveys.jsx";
import Signup from "../views/Signup.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/signup',
    element: <Signup/>
  },
  {
    path: '/surveys',
    element: <Surveys/>
  }
]);

export default router;
