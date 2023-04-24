import {createBrowserRouter} from 'react-router-dom'

// import pages
import App from '../App.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>
  },
]);

export default router;
