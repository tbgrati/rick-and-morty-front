import "./App.css";
import router from "./modules/core/router/Router.tsx";
import { RouterProvider } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";

function App() {
  return (
    <SkeletonTheme baseColor="#36393e" highlightColor="#424549">
      <RouterProvider router={router} />
    </SkeletonTheme>
  );
}

export default App;
