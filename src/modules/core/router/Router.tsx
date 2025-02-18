import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../../../pages/Home/Home";
import { NotFoundPage } from "../../../pages/NotFound/NotFound";
import { CharacterDetailPage } from "../../../pages/CharacterDetail/CharacterDetail";
import { EpisodeDetailPage } from "../../../pages/EpisodeDetail/EpisodeDetail";
import { LocationDetailPage } from "../../../pages/LocationDetail/LocationDetail";
import { AnimationWrapper } from "../layout/AnimationWrapper.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AnimationWrapper />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/character/:id", element: <CharacterDetailPage /> },
      { path: "/episode/:id", element: <EpisodeDetailPage /> },
      { path: "/location/:id", element: <LocationDetailPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default router;
