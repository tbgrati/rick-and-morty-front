import { createBrowserRouter } from 'react-router-dom';
import {HomePage} from "../../../pages/Home/Home.tsx";
import {NotFoundPage} from "../../../pages/NotFound/NotFound.tsx";

const router = createBrowserRouter([
    {
        path:'/',
        element: <HomePage/>
    },
    {
        path:'*',
        element: <NotFoundPage/>
    }
])

export default router;