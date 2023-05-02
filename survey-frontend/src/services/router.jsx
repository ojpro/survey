import {createBrowserRouter, Navigate} from 'react-router-dom'

// import pages
import Login from "../views/Login.jsx";
import Surveys from "../views/Surveys.jsx";
import Signup from "../views/Signup.jsx";
import GuestLayout from "../Layouts/GuestLayout.jsx";
import DefaultLayout from "../Layouts/DefaultLayout.jsx";
import Dashboard from "../views/Dashboard.jsx";
import SurveyView from "../views/SurveyView.jsx";
import PublicSurveyView from "../views/PublicSurveyView.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout/>,
    children: [
      {
        path: '/dashboard',
        element: <Navigate to='/'/>
      },
      {
        path: '/',
        element: <Dashboard/>
      },
      {
        path: '/surveys',
        element: <Surveys/>
      },
      {
        path: '/surveys/:id',
        element: <SurveyView/>
      },
      {
        path: '/surveys/create',
        element: <SurveyView/>
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
  {
    path: '/view/surveys/:slug',
    element: <PublicSurveyView/>
  }
]);

export default router;
