import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>,
        children: [
            {
                path : '/',
                element : <Home/>
            },
            {
                path : '/rank',
                element : <Home/>
            },
            {
                path : '/compare',
                element : <Home/>
            },
            {
                path : '/news',
                element : <Home/>
            }
        ]
    }
]);

export default router;