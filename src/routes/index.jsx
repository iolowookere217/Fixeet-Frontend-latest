import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { Home, Error } from "./route";
import LoadingSpinner from "../components/loading";
import AllReports from "../pages/all-reports";
import Report from "../pages/report";
import About from "../pages/about";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Home />
      </Suspense>
    ),
    errorElement: <Error />,
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Home />
      </Suspense>
    ),
    errorElement: <Error />,
  },

  {
    path: "/all-reports",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <AllReports />
      </Suspense>
    ),
    errorElement: <Error />,
  },
  {
    path: "/report/:id",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Report />
      </Suspense>
    ),
    errorElement: <Error />,
  },

  {
    path: "/about",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <About />
      </Suspense>
    ),
    errorElement: <Error />,
  },
]);

export default router;
