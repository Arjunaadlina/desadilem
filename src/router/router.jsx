import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Admin from "../pages/Admin";
import Login from "../pages/Login";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path : '/login',
    element : <Login />
  },
  {
    path:'/admin',
    element : <Admin />
  }
]);

export default router;
