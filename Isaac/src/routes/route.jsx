import { lazy } from "react";

const Home = lazy(() => import("../pages/home"));
const Error = lazy(() => import("../components/error-page"));
const AllReports = lazy(() => import("../pages/all-reports"));
const Reports = lazy(() => import("../pages/report"));
const About = lazy(() => import("../pages/about"));

export { Home, Error, AllReports, Reports, About };
