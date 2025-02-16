import { createBrowserRouter } from 'react-router-dom';
import {HomePage} from "../../../pages/Home/Home.tsx";
import {NotFoundPage} from "../../../pages/NotFound/NotFound.tsx";
import {CharacterDetailPage} from "../../../pages/CharacterDetail/CharacterDetail.tsx";
import {EpisodeDetailPage} from "../../../pages/EpisodeDetail/EpisodeDetail.tsx";

const router = createBrowserRouter([
    {
        path:'/',
        element: <HomePage/>
    },
    {
        path:'/character/:id',
        element: <CharacterDetailPage/>
    },
    {
        path:'/episode/:id',
        element: <EpisodeDetailPage/>
    },
    {
        path:'*',
        element: <NotFoundPage/>
    }
])

export default router;