import {createBrowserRouter} from 'react-router-dom'

// import pages
import App from '../App.jsx'
import Login from "../pages/Login.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>
  },
  {
    path: '/login',
    element: <Login/>
  }
]);

export default router;
